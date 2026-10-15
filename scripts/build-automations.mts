/*
 * Builds src/data/automations.ts: n8n workflows laid out for WorkflowCanvas.
 *
 *   node --experimental-strip-types --no-warnings scripts/build-automations.mts \
 *     <stakra-raw.json> <penguin-ops-export-dir>
 *
 * Inputs stay outside the repo (they come straight from the n8n instances).
 * Only structure is used: node names, types, positions and connections. Names
 * are cleaned up and anything that identifies a client is renamed below.
 *
 * Layout: each main-path node sits one column after the node that feeds it
 * (breadth-first from the triggers); nodes sharing a column keep their order
 * from the n8n canvas. An AI agent's sub-nodes (model, memory, tools) sit in a
 * lane beneath it and are attached to it, like n8n draws them.
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type Kind = "trigger" | "code" | "http" | "if" | "slack" | "ai" | "noop" | "ads" | "form" | "data" | "mail" | "chat";
type RawNode = { name: string; type: string; x: number; y: number; disabled: boolean };
type Raw = { nodes: RawNode[]; main: [number, number][]; sub: [number, number, string][] };

const [stakraFile, penguinDir] = process.argv.slice(2);
if (!stakraFile || !penguinDir) throw new Error("usage: build-automations.mts <stakra-raw.json> <penguin-ops-dir>");

function kindOf(type: string): Kind {
  const t = type.split(".").pop()!.toLowerCase();
  if (/trigger$|^webhook$/.test(t)) return "trigger";
  if (t === "respondtowebhook") return "http";
  if (/^(agent|agenttool|openai|chainllm)$|^lmchat|^embeddings|^outputparser|^tool(vectorstore|workflow|calculator|wikipedia)$/.test(t)) return "ai";
  if (/^httprequest/.test(t)) return "http";
  if (/^(if|switch|filter)$/.test(t)) return "if";
  if (/slack/.test(t)) return "slack";
  if (/noop|stopanderror/.test(t)) return "noop";
  if (/googleads/.test(t)) return "ads";
  if (/^form$/.test(t)) return "form";
  if (/gmail|email|imap|smtp/.test(t)) return "mail";
  if (/telegram|greenapi|whatsapp/.test(t)) return "chat";
  if (/sheets|airtable|notion|supabase|postgres|datatable|vectorstore|memory|googledrive|googledocs|googlecalendar|clickup|shopify|n8n$/.test(t)) return "data";
  return "code";
}

/* Tool names for the card, from node types. */
const TOOL_NAMES: [RegExp, string][] = [
  [/clickup/i, "ClickUp"], [/slack/i, "Slack"], [/typeform/i, "Typeform"], [/shopify/i, "Shopify"], [/googleads/i, "Google Ads"],
  [/notion/i, "Notion"], [/airtable/i, "Airtable"], [/gmail/i, "Gmail"], [/telegram/i, "Telegram"], [/googlesheets/i, "Google Sheets"],
  [/googlecalendar/i, "Google Calendar"], [/pinecone/i, "Pinecone"], [/lmchatopenai|embeddingsopenai|\.openai$/i, "OpenAI"],
  [/gemini/i, "Gemini"], [/anthropic|claude/i, "Claude"],
];

/* Sub-node priority under an agent: tools first, then memory, then the model. */
const SUB_ORDER = ["tool", "memory", "languageModel", "outputParser"];
const MAX_SUB = 3;

function cleanName(name: string, renames: Record<string, string>) {
  if (renames[name]) return renames[name];
  return name
    .replace(/^\d+[A-Z]? - /, "") // "07 - Validate" → "Validate"
    .replace(/(\D)\d$/, "$1") // "Scrape1" → "Scrape"
    .replace(/#oak-ops/g, "#ops")
    .trim();
}

type OutNode = { id: string; name: string; kind: Kind; col: number; lane: number; skip: boolean; attach?: string };

function layout(raw: Raw, renames: Record<string, string>) {
  const inMain = new Set(raw.main.flat());
  const incoming = new Map<number, number[]>();
  raw.main.forEach(([a, b]) => incoming.set(b, [...(incoming.get(b) ?? []), a]));
  const mainIdx = raw.nodes.map((_, i) => i).filter((i) => inMain.has(i) || (kindOf(raw.nodes[i].type) === "trigger" && !raw.sub.some(([c]) => c === i)));

  // Columns: the longest path from a root (no incoming main connection), so every node
  // sits after everything that feeds it. Loop-back edges (batch loops) are left out.
  const roots = mainIdx.filter((i) => !(incoming.get(i)?.length)).sort((a, b) => raw.nodes[a].x - raw.nodes[b].x);
  const back = new Set<string>();
  const state = new Map<number, 1 | 2>(); // 1 = on the DFS stack, 2 = done
  const visit = (i: number) => {
    state.set(i, 1);
    for (const [a, b] of raw.main) {
      if (a !== i) continue;
      if (state.get(b) === 1) back.add(`${a}>${b}`);
      else if (!state.has(b)) visit(b);
    }
    state.set(i, 2);
  };
  roots.forEach((r) => !state.has(r) && visit(r));
  mainIdx.forEach((i) => !state.has(i) && visit(i));
  const forward = raw.main.filter(([a, b]) => !back.has(`${a}>${b}`));
  const col = new Map<number, number>(mainIdx.map((i) => [i, 0]));
  for (let pass = 0; pass < mainIdx.length; pass++) {
    let changed = false;
    for (const [a, b] of forward) {
      if ((col.get(b) ?? 0) < (col.get(a) ?? 0) + 1) {
        col.set(b, (col.get(a) ?? 0) + 1);
        changed = true;
      }
    }
    if (!changed) break;
  }

  // Lanes: within a column, keep the canvas order, at most three nodes high so rows stay short;
  // a wider fan-out spills into the next columns. The node nearest the trigger's height is lane 0.
  const baseY = raw.nodes[roots[0] ?? mainIdx[0]].y;
  const lane = new Map<number, number>();
  const byCol = new Map<number, number[]>();
  mainIdx.forEach((i) => byCol.set(col.get(i)!, [...(byCol.get(col.get(i)!) ?? []), i]));
  const packed = new Map<number, number>();
  let next = 0;
  for (const c of [...byCol.keys()].sort((a, b) => a - b)) {
    const ids = byCol.get(c)!.sort((a, b) => raw.nodes[a].y - raw.nodes[b].y);
    for (let k = 0; k < ids.length; k += 3) {
      const chunk = ids.slice(k, k + 3);
      const zero = chunk.reduce((best, i) => (Math.abs(raw.nodes[i].y - baseY) < Math.abs(raw.nodes[best].y - baseY) ? i : best), chunk[0]);
      const z = chunk.length === 3 ? 1 : chunk.indexOf(zero);
      chunk.forEach((i, j) => {
        packed.set(i, next);
        lane.set(i, j - z);
      });
      next++;
    }
  }
  packed.forEach((c, i) => col.set(i, c));

  const out: OutNode[] = mainIdx.map((i) => ({
    id: `n${i}`,
    name: cleanName(raw.nodes[i].name, renames),
    kind: kindOf(raw.nodes[i].type),
    col: col.get(i)!,
    lane: lane.get(i)!,
    skip: raw.nodes[i].disabled,
  }));

  // Sub-nodes: up to three per agent, in a lane beneath it, spread across its column and the next.
  const taken = new Set(out.map((n) => `${n.col}:${n.lane}`));
  const parents = [...new Set(raw.sub.map(([, p]) => p))].filter((p) => mainIdx.includes(p));
  for (const p of parents) {
    const children = raw.sub
      .filter(([, parent]) => parent === p)
      .sort((a, b) => SUB_ORDER.indexOf(a[2]) - SUB_ORDER.indexOf(b[2]))
      .slice(0, MAX_SUB);
    const pc = col.get(p)!;
    const below = Math.max(...out.filter((n) => Math.abs(n.col - pc) <= 1).map((n) => n.lane)) + 1;
    children.forEach(([c], k) => {
      const cc = pc + [0, 1, -1][k];
      let l = below;
      while (taken.has(`${Math.max(0, cc)}:${l}`)) l++;
      taken.add(`${Math.max(0, cc)}:${l}`);
      out.push({ id: `n${c}`, name: cleanName(raw.nodes[c].name, renames), kind: kindOf(raw.nodes[c].type), col: Math.max(0, cc), lane: l, skip: raw.nodes[c].disabled, attach: `n${p}` });
    });
  }

  const ids = new Set(out.map((n) => n.id));
  const edges = [...new Set(raw.main.map(([a, b]) => `n${a}>n${b}`))]
    .map((e) => e.split(">") as [string, string])
    .filter(([a, b]) => ids.has(a) && ids.has(b) && a !== b);
  const types = [...new Set([...mainIdx, ...raw.sub.map(([c]) => c)].map((i) => raw.nodes[i].type))];
  const tools = TOOL_NAMES.filter(([re]) => types.some((t) => re.test(t))).map(([, name]) => name);
  const trigger = raw.nodes[roots[0] ?? mainIdx[0]];
  return { nodes: out, edges, tools, trigger: cleanName(trigger.name, renames), count: raw.nodes.length };
}

/* ── Sources ── */

const stakra: Record<string, { n: [string, string, number, number, number][]; main: [number, number][]; sub: [number, number, string][] }> =
  JSON.parse(readFileSync(stakraFile, "utf8"));
const fromStakra = (id: string): Raw => ({
  nodes: stakra[id].n.map(([name, type, x, y, d]) => ({ name, type, x, y, disabled: !!d })),
  main: stakra[id].main,
  sub: stakra[id].sub,
});

function fromExport(file: string): Raw {
  const wf = JSON.parse(readFileSync(join(penguinDir, file), "utf8"));
  const nodes = wf.nodes.filter((n: { type: string }) => n.type !== "n8n-nodes-base.stickyNote");
  const idx = new Map<string, number>(nodes.map((n: { name: string }, i: number) => [n.name, i]));
  const main: [number, number][] = [];
  const sub: [number, number, string][] = [];
  for (const [from, conns] of Object.entries(wf.connections as Record<string, Record<string, { node: string }[][]>>)) {
    for (const [type, outs] of Object.entries(conns)) {
      for (const o of outs ?? []) for (const c of o ?? []) {
        if (!idx.has(from) || !idx.has(c.node)) continue;
        if (type === "main") main.push([idx.get(from)!, idx.get(c.node)!]);
        else sub.push([idx.get(from)!, idx.get(c.node)!, type.replace("ai_", "")]);
      }
    }
  }
  return {
    nodes: nodes.map((n: { name: string; type: string; position: [number, number]; disabled?: boolean }) => ({
      name: n.name, type: n.type, x: n.position[0], y: n.position[1], disabled: !!n.disabled,
    })),
    main,
    sub,
  };
}

/* ── What goes on the page ── */

type Entry = {
  id: string;
  group: string;
  title: string;
  caption: string;
  live?: boolean;
  raw: () => Raw;
  renames?: Record<string, string>;
  /* For workflows that reach their services through HTTP nodes, where types don't say. */
  tools?: string[];
};

const GROUP_OPS = "Client operations for a Google Ads agency";
const GROUP_AI = "AI agents and assistants";
const GROUP_PIPE = "Pipelines, intake and alerts";

const ENTRIES: Entry[] = [
  {
    id: "client-onboarding", group: GROUP_OPS, tools: ["Typeform", "ClickUp", "Slack"], title: "New client onboarding",
    caption: "One form submission runs every step: ClickUp client, store and onboarding tasks, a checklist and client doc, two Slack channels, a Slack Connect invite and a pinned welcome.",
    raw: () => fromExport("oak-new-client-onboarding.json"),
  },
  {
    id: "weekly-pulse", group: GROUP_OPS, tools: ["ClickUp", "Slack", "Claude"], title: "Weekly client pulse",
    caption: "Every Monday it reads each client channel, has Claude review the week, and posts one digest with the clients at risk first.",
    raw: () => fromExport("oak-slack-pulse.json"),
  },
  {
    id: "spend-roas", group: GROUP_OPS, tools: ["Google Ads", "Shopify", "ClickUp", "Slack"], title: "Daily spend, ROAS and fee",
    caption: "Google Ads spend through the manager account, converted to EUR at ECB rates and written into ClickUp. Problems go to the ops channel.",
    raw: () => fromExport("oak-spend.json"),
  },
  {
    id: "store-onboarding", group: GROUP_OPS, tools: ["Typeform", "ClickUp", "Slack"], title: "New store onboarding",
    caption: "A new-store form finds the client, skips stores that already exist, creates the store and onboarding tasks with a checklist, adds the store to the client doc, invites the media buyer to both Slack channels and announces it.",
    raw: () => fromExport("oak-new-store-onboarding.json"),
  },
  {
    id: "buyer-assigned", group: GROUP_OPS, tools: ["ClickUp", "Slack"], title: "Media buyer assignment",
    caption: "When an onboarding task's assignee changes in ClickUp, the new media buyer is matched, invited to the client's Slack channels and assigned to each of the client's stores.",
    raw: () => fromExport("oak-buyer-assigned.json"),
  },
  {
    id: "funnel-brief", group: GROUP_OPS, tools: ["Typeform", "ClickUp"], title: "Funnel brief to ClickUp",
    caption: "A funnel brief from Typeform becomes a ClickUp task for the right buyer and store, with its fields filled, a checklist of build steps, and a comment on any field that failed to set.",
    raw: () => fromExport("oak-funnel-brief.json"),
  },
  {
    id: "shopify-daily", group: GROUP_OPS, tools: ["Shopify", "Slack"], title: "Daily Shopify revenue",
    caption: "Every morning it pulls each connected store's orders, saves the day's revenue, notes any store that failed, and posts a summary to the ops channel. A form backfills past days.",
    raw: () => fromExport("oak-shopify-daily.json"),
  },
  {
    id: "shopify-connect", group: GROUP_OPS, tools: ["Shopify", "Slack"], title: "Connect a Shopify store",
    caption: "A form and an OAuth flow connect a client's Shopify store: the install link, the redirect back, the saved token, and a Slack note once it's connected.",
    raw: () => fromExport("oak-shopify-connect.json"),
  },
  {
    id: "broadcast", group: GROUP_OPS, tools: ["Slack"], title: "Broadcast to client channels",
    caption: "One message to many client Slack channels: pick the channels in a form, preview, send one post per channel, then log what went out.",
    raw: () => fromExport("oak-broadcast.json"),
  },
  {
    id: "onboarding-error", group: GROUP_OPS, tools: ["Slack"], title: "Onboarding error alert",
    caption: "If an onboarding run fails, the failed execution is fetched and a formatted alert lands in Slack.",
    raw: () => fromExport("oak-onboarding-error-alert.json"),
  },
  {
    id: "portfolio-chatbot", group: GROUP_AI, title: "The chatbot on this site", live: true,
    caption: "The bot in the corner of this page. The site's API calls a webhook; an AI agent with per-visitor memory searches the portfolio in Pinecone and replies, with a separate error reply.",
    raw: () => fromStakra("bCl8qIOeX7xyz3MT"),
  },
  {
    id: "executive-assistant", group: GROUP_AI, title: "Executive assistant on Telegram", live: true,
    caption: "Voice notes are transcribed, then an executive agent hands work to calendar, email and contact agents that create and update events, draft Gmail replies in my writing style and report progress back on Telegram.",
    raw: () => fromStakra("eAK7Ylod4yAwpy98"),
    renames: { "Get a file": "Get voice note" },
  },
  {
    id: "support-triage", group: GROUP_AI, title: "AI support triage",
    caption: "Support emails are de-duplicated, classified through an API, saved to Airtable and given a tone-aware AI draft in Gmail. Anything that needs a person is flagged in Slack and logged.",
    raw: () => fromStakra("RkhtB3RDtpUyNzrP"),
    renames: { "06 - Jev Classify": "Classify (API)" },
  },
  {
    id: "hotel-booking", group: GROUP_AI, title: "Hotel booking agent",
    caption: "A Telegram agent answers guests from the FAQ and room sheets, confirms a booking, parses it into a row in Google Sheets and sends the confirmation.",
    raw: () => fromStakra("s5APMCYS1jqV1dDp"),
    renames: {
      "AI Agent": "Booking agent", "AI Agent Tool": "FAQ and rooms agent", "Google Gemini Chat Model": "Gemini",
      "Edit Fields": "Shape booking", "AI Agent1": "Confirmation agent", "Google Gemini Chat Model2": "Gemini",
    },
  },
  {
    id: "email-rag", group: GROUP_AI, title: "Email RAG assistant", live: true,
    caption: "Chat with an inbox: an agent searches past emails stored in Pinecone, remembers the conversation, and can call a separate workflow to send an email.",
    raw: () => fromStakra("MPkNRpohvgCvwPkp"),
    renames: { "When chat message received": "Chat message", "AI Agent": "Inbox agent", "Answer questions with a vector store": "Search emails", "Call 'Send Email'": "Send email (workflow)" },
  },
  {
    id: "job-matching", group: GROUP_PIPE, title: "AI job matching pipeline", live: true,
    caption: "On a schedule it scrapes job listings, cleans and parses them, de-duplicates against the sheet, classifies and filters them, fetches full descriptions, then an AI agent scores each one against my CV in Pinecone and posts matches to Slack.",
    raw: () => fromStakra("KSqsdlgpoCdAfeMD"),
    renames: {
      "Cron Scraper1": "Schedule", "No Operation, do nothing1": "Nothing queued", "AI Agent1": "Score against CV",
      "OpenAI Chat Model2": "OpenAI", "Answer questions with a vector store1": "Search the CV", "Structured Output Parser1": "Structured output",
      "Notify slack1": "Notify Slack", "match?": "Match?",
    },
  },
  {
    id: "lead-diagnostic", group: GROUP_PIPE, title: "Lead diagnostic intake", live: true,
    caption: "Partial and complete Typeform diagnostics are validated and written to Notion lead and response records; completed ones get a results email assembled from Notion content and sent through Gmail.",
    raw: () => fromStakra("uGelWaEqUMbtWqVR"),
    renames: {
      "Typeform Resopnse": "Typeform response", "If partial": "Partial?", "has email": "Has email?", "No Operation, do nothing": "No email",
      "Get many database pages": "Find lead in Notion", "lead exists?": "Lead exists?", "is complete response": "Complete response?",
      "No Operation, do nothing1": "Not complete", "No Operation, do nothing2": "Lead not found", "lacking content": "Lacking content",
      "Send notif to slack": "Stop: send failed",
    },
  },
  {
    id: "job-alerts", group: GROUP_PIPE, title: "Hourly job post alerts", live: true,
    caption: "Every hour it searches two job feeds, extracts the links, keeps only posts it hasn't seen and alerts Slack. Its own error trigger posts any failure.",
    raw: () => fromStakra("SJsr3oKDd5uHa4Kn"),
    renames: {
      "Search OLJ - GoHighLevel": "Search: GoHighLevel jobs", "Search OLJ - Automation": "Search: automation jobs",
      "Extract Job Links - GHL": "Extract links", "Extract Job Links - Automation": "Extract links", "Edit Fields": "Shape error",
    },
  },
  {
    id: "error-alerts", group: GROUP_PIPE, title: "Error alerts to Slack", live: true,
    caption: "The error workflow for the whole instance: any failed run builds a message and posts it to Slack, with the details in a thread.",
    raw: () => fromStakra("vj8zfRrq3sU5C10a"),
  },
  {
    id: "slack-cleanup", group: GROUP_PIPE, title: "Delete on a ❌ reaction", live: true,
    caption: "React with ❌ to a bot message in Slack and it deletes the message, or the whole thread it started.",
    raw: () => fromStakra("Bk6d7vmoDkGEaxr1"),
  },
];

const built = ENTRIES.map((e) => {
  const { nodes, edges, tools, trigger, count } = layout(e.raw(), e.renames ?? {});
  return { id: e.id, group: e.group, title: e.title, caption: e.caption, live: !!e.live, trigger, tools: e.tools ?? tools, count, nodes, edges };
});

const header = `/* n8n workflows for the Automations page, generated by scripts/build-automations.mts
   from the workflow exports. Structure only; client details are renamed out. */

import type { Workflow } from "./workflows";

export type Automation = Workflow & {
  group: string;
  /** Running in production on the n8n instance. */
  live: boolean;
  trigger: string;
  tools: string[];
  /** Nodes in the original workflow (sub-nodes past the first three per agent aren't drawn). */
  count: number;
};

export const AUTOMATION_GROUPS = ${JSON.stringify([GROUP_OPS, GROUP_AI, GROUP_PIPE])} as const;

export const automations: Automation[] = `;
writeFileSync("src/data/automations.ts", header + JSON.stringify(built, null, 2) + ";\n");
console.log(built.map((b) => `${b.id}: ${b.nodes.length} drawn of ${b.count}, cols ${Math.max(...b.nodes.map((n) => n.col)) + 1}, lanes ${Math.min(...b.nodes.map((n) => n.lane))}..${Math.max(...b.nodes.map((n) => n.lane))}`).join("\n"));
