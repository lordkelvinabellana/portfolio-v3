import { NextResponse } from "next/server";

/*
 * Proxy between the site's chat bot and the n8n workflow, so the webhook URL
 * and its key never reach the browser. n8n keeps the conversation memory per
 * sessionId; this route only checks input and limits how fast one visitor
 * can send.
 */

export const maxDuration = 60;

const MAX_MESSAGE = 600;
const SESSION_ID = /^[A-Za-z0-9-]{8,64}$/;
const WINDOW_MS = 10 * 60 * 1000;
const PER_WINDOW = 15;

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

export async function POST(request: Request) {
  const url = process.env.N8N_CHAT_URL;
  if (!url) return fail("The chat isn't set up yet.", 503);

  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host")) {
    return fail("Not allowed.", 403);
  }

  let body: { message?: unknown; sessionId?: unknown };
  try {
    body = await request.json();
  } catch {
    return fail("Send the message as JSON.", 400);
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  const sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
  if (!message) return fail("Type a question first.", 400);
  if (message.length > MAX_MESSAGE) return fail(`Keep questions under ${MAX_MESSAGE} characters.`, 400);
  if (!SESSION_ID.test(sessionId)) return fail("Reload the page to start a new chat.", 400);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) return fail("That's a lot of questions at once. Try again in a few minutes.", 429);

  const key = process.env.N8N_CHAT_KEY;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", ...(key ? { "x-portfolio-key": key } : {}) },
      body: JSON.stringify({ message, sessionId }),
      signal: AbortSignal.timeout(55_000),
      cache: "no-store",
    });
    if (!res.ok) return fail("The assistant couldn't answer just now.", 502);
    const data = (await res.json()) as { reply?: unknown };
    const reply = typeof data.reply === "string" ? data.reply.trim() : "";
    if (!reply) return fail("The assistant couldn't answer just now.", 502);
    // The site never uses em dashes; the model sometimes does.
    return NextResponse.json({ reply: reply.replace(/\s*—\s*/g, ", ") });
  } catch {
    return fail("The assistant took too long to answer.", 504);
  }
}
