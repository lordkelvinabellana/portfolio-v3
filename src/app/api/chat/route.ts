import { SeverityNumber } from "@opentelemetry/api-logs";
import { after, NextResponse } from "next/server";
import { PostHog } from "posthog-node";
import { posthogLogProvider } from "../../../../instrumentation";

/*
 * Proxy between the site's chat bot and the n8n workflow, so the webhook URL
 * and its key never reach the browser. n8n keeps the conversation memory per
 * sessionId; this route only checks input and limits how fast one visitor
 * can send.
 */

export const maxDuration = 60;

const MAX_MESSAGE = 600;
const SESSION_ID = /^[A-Za-z0-9-]{8,64}$/;
const DISTINCT_ID = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
const WINDOW_MS = 10 * 60 * 1000;
const PER_WINDOW = 15;
const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;
const privacyMode = process.env.POSTHOG_AI_PRIVACY_MODE === "true";

if ((!projectToken || !apiHost) && process.env.NODE_ENV === "development") {
  const missingVariable = !projectToken ? "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN" : "NEXT_PUBLIC_POSTHOG_HOST";
  throw new Error(
    `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`,
  );
}

const posthog = projectToken && apiHost
  ? new PostHog(projectToken, {
      host: apiHost,
      flushAt: 1,
      flushInterval: 0,
      enableExceptionAutocapture: true,
      privacyMode,
    })
  : null;

type ChatTurn = {
  distinctId: string;
  sessionId: string;
  traceId: string;
  message: string;
  reply?: string;
  status: number;
  startedAt: number;
  error?: string;
};

async function captureChatTurn({ distinctId, sessionId, traceId, message, reply, status, startedAt, error }: ChatTurn) {
  if (!posthog) return;

  const content = privacyMode
    ? {}
    : {
        $ai_input_state: [{ role: "user", content: message }],
        ...(reply ? { $ai_output_state: [{ role: "assistant", content: reply }] } : {}),
        $ai_input: [{ role: "user", content: message }],
        ...(reply ? { $ai_output_choices: [{ role: "assistant", content: reply }] } : {}),
      };
  const metadata = {
    $ai_trace_id: traceId,
    $ai_session_id: sessionId,
    $ai_latency: (Date.now() - startedAt) / 1000,
    $ai_http_status: status,
    $ai_is_error: Boolean(error),
    ...(error && !privacyMode ? { $ai_error: error } : {}),
  };

  try {
    posthog.capture({
      distinctId,
      event: "$ai_trace",
      properties: { ...metadata, ...content, $ai_span_name: "portfolio_chat_turn" },
    });
    posthog.capture({
      distinctId,
      event: "$ai_generation",
      properties: { ...metadata, ...content, $ai_span_name: "portfolio_chat_generation" },
    });
    await posthog.flush();
  } catch {
    // Observability must not affect the chat response when ingestion is unavailable.
  }
}

// Best effort: each server instance keeps its own counts.
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  const over = recent.length >= PER_WINDOW;
  if (!over) recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return over;
}

const fail = (error: string, status: number) => NextResponse.json({ error }, { status });
const chatLog = posthogLogProvider?.getLogger("posthog.chat.route");

type ChatLogOutcome = "succeeded" | "upstream_response_failed" | "empty_upstream_reply" | "upstream_request_failed";

function logChatOutcome(outcome: ChatLogOutcome, status: number, startedAt: number) {
  if (!chatLog || !posthogLogProvider) return;
  const logProvider = posthogLogProvider;

  chatLog.emit({
    body: "portfolio chat webhook completed",
    severityNumber: outcome === "succeeded" ? SeverityNumber.INFO : SeverityNumber.ERROR,
    attributes: {
      route: "/api/chat",
      outcome,
      upstream_status: status,
      duration_ms: Date.now() - startedAt,
    },
  });
  after(async () => {
    try {
      await logProvider.forceFlush();
    } catch {
      // Logging must not affect the chat response when ingestion is unavailable.
    }
  });
}

export async function POST(request: Request) {
  const url = process.env.N8N_CHAT_URL;
  if (!url) return fail("The chat isn't set up yet.", 503);

  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host")) {
    return fail("Not allowed.", 403);
  }

  let body: { message?: unknown; sessionId?: unknown; distinctId?: unknown };
  try {
    body = await request.json();
  } catch {
    return fail("Send the message as JSON.", 400);
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  const sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
  const distinctId = typeof body.distinctId === "string" && DISTINCT_ID.test(body.distinctId) ? body.distinctId : null;
  if (!message) return fail("Type a question first.", 400);
  if (message.length > MAX_MESSAGE) return fail(`Keep questions under ${MAX_MESSAGE} characters.`, 400);
  if (!SESSION_ID.test(sessionId)) return fail("Reload the page to start a new chat.", 400);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) return fail("That's a lot of questions at once. Try again in a few minutes.", 429);

  const key = process.env.N8N_CHAT_KEY;
  const traceId = crypto.randomUUID();
  const startedAt = Date.now();
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", ...(key ? { "x-portfolio-key": key } : {}) },
      body: JSON.stringify({ message, sessionId }),
      signal: AbortSignal.timeout(55_000),
      cache: "no-store",
    });
    if (!res.ok) {
      if (distinctId) {
        await captureChatTurn({ distinctId, sessionId, traceId, message, status: res.status, startedAt, error: "upstream_response_failed" });
      }
      logChatOutcome("upstream_response_failed", res.status, startedAt);
      return fail("The assistant couldn't answer just now.", 502);
    }
    const data = (await res.json()) as { reply?: unknown };
    const reply = typeof data.reply === "string" ? data.reply.trim() : "";
    if (!reply) {
      if (distinctId) {
        await captureChatTurn({ distinctId, sessionId, traceId, message, status: res.status, startedAt, error: "empty_upstream_reply" });
      }
      logChatOutcome("empty_upstream_reply", res.status, startedAt);
      return fail("The assistant couldn't answer just now.", 502);
    }
    // The site never uses em dashes; the model sometimes does.
    const normalizedReply = reply.replace(/\s*—\s*/g, ", ");
    if (distinctId) {
      await captureChatTurn({ distinctId, sessionId, traceId, message, reply: normalizedReply, status: res.status, startedAt });
    }
    logChatOutcome("succeeded", res.status, startedAt);
    return NextResponse.json({ reply: normalizedReply });
  } catch {
    if (distinctId) {
      await captureChatTurn({ distinctId, sessionId, traceId, message, status: 504, startedAt, error: "upstream_request_failed" });
    }
    logChatOutcome("upstream_request_failed", 504, startedAt);
    return fail("The assistant took too long to answer.", 504);
  }
}
