"use client";

import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowUp, MessageCircle, X } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { BotScene } from "./botScene";

type Message = { role: "user" | "bot"; text: string; error?: boolean };
type Stored = { sessionId: string; messages: Message[] };

const STORE_KEY = "kelvin-chat";
const FLOWN_KEY = "kelvin-bot-flown";
const SITE = "https://portfolio-v3-roan-omega.vercel.app";

const GREETING: Message = {
  role: "bot",
  text: "Hi! I can tell you about Kelvin's systems, automation and video work, past roles, and how to hire Kelvin. What would you like to know?",
};
const SUGGESTIONS = [
  "What does Kelvin build?",
  "Show me the video work",
  "Is Kelvin open to full-time roles?",
  "How do I start a project?",
];

function newSessionId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `s-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/* The conversation survives reloads within the tab, like the n8n memory it mirrors. */
function loadStored(): Stored {
  if (typeof window === "undefined") return { sessionId: "", messages: [GREETING] };
  try {
    const parsed = JSON.parse(sessionStorage.getItem(STORE_KEY) ?? "null") as Stored | null;
    if (parsed?.sessionId && Array.isArray(parsed.messages) && parsed.messages.length) return parsed;
  } catch {}
  return { sessionId: newSessionId(), messages: [GREETING] };
}

export function ChatBot() {
  const [stored, setStored] = useState<Stored>(loadStored);
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [input, setInput] = useState("");
  const [bubble, setBubble] = useState(false);
  const [fallback, setFallback] = useState(false);

  const launcherRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const bubbleRef = useRef<HTMLButtonElement>(null);
  const sceneRef = useRef<BotScene | null>(null);
  const flightRef = useRef<gsap.core.Timeline | null>(null);
  const openRef = useRef(false);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify(stored));
    } catch {}
  }, [stored]);

  /* ── Load the 3D bot once the page is idle, then fly it in ── */
  useEffect(() => {
    const el = launcherRef.current;
    if (!el) return;
    const reduced = prefersReducedMotion();
    let cancelled = false;
    let scene: BotScene | null = null;
    let startCall: gsap.core.Tween | null = null;
    let moodCall: gsap.core.Tween | null = null;
    let pointerFrame = 0;

    const show = () => gsap.set(el, { autoAlpha: 1 });

    function greet() {
      scene?.setMood("happy");
      scene?.pop();
      scene?.wave();
      setBubble(true);
      moodCall = gsap.delayedCall(1.8, () => scene?.setMood("idle"));
    }

    function fly(bot: BotScene) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const rect = el!.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const at = (x: number, y: number) => ({ x: x - cx, y: y - cy });
      const small = vw < 640;
      const loop = { x: vw * (small ? 0.5 : 0.6), y: vh * (small ? 0.4 : 0.36) };
      const r = Math.min(vw, vh) * (small ? 0.16 : 0.13);

      // In from the side, one loop-the-loop over the page, then down to the corner.
      const start = small ? at(vw + 90, vh * 0.16) : at(-140, vh * 0.3);
      const path = small
        ? [at(vw * 0.62, vh * 0.12), at(loop.x - r, loop.y), at(loop.x, loop.y + r), at(loop.x + r, loop.y),
           at(loop.x, loop.y - r), at(vw * 0.25, vh * 0.52), at(vw * 0.6, vh * 0.8), { x: 0, y: 0 }]
        : [at(vw * 0.22, vh * 0.16), at(vw * 0.42, vh * 0.44), at(loop.x + r, loop.y), at(loop.x, loop.y - r),
           at(loop.x - r, loop.y), at(loop.x, loop.y + r), at(loop.x + r * 1.8, loop.y + r * 0.5),
           at(vw * 0.86, vh * 0.6), { x: 0, y: 0 }];

      let prev = { ...start };
      gsap.set(el, { x: start.x, y: start.y, scale: small ? 1.1 : 1.3, autoAlpha: 1 });
      bot.setMood("flying");
      flightRef.current = gsap
        .timeline({
          onComplete() {
            flightRef.current = null;
            bot.setVelocity(0, 0);
            greet();
          },
        })
        .to(el, {
          duration: small ? 3.4 : 4.8,
          ease: "sine.inOut",
          motionPath: { path, curviness: 1.25 },
          onUpdate() {
            const x = gsap.getProperty(el, "x") as number;
            const y = gsap.getProperty(el, "y") as number;
            bot.setVelocity((x - prev.x) / 20, (y - prev.y) / 20);
            prev = { x, y };
          },
        })
        .to(el, { scale: 1, duration: 0.7, ease: "power2.out" }, "-=0.7");
    }

    function arrive() {
      if (cancelled || !scene) return;
      let firstVisit = false;
      try {
        firstVisit = !sessionStorage.getItem(FLOWN_KEY);
        sessionStorage.setItem(FLOWN_KEY, "1");
      } catch {}
      if (firstVisit && !reduced) {
        fly(scene);
      } else {
        gsap.fromTo(el, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: reduced ? 0 : 0.5, ease: "back.out(2)" });
      }
    }

    function whenVisible() {
      if (!document.hidden) return arrive();
      const onVisible = () => {
        document.removeEventListener("visibilitychange", onVisible);
        arrive();
      };
      document.addEventListener("visibilitychange", onVisible);
    }

    function load() {
      import("./botScene")
        .then(({ createBotScene }) => {
          if (cancelled || !canvasRef.current) return;
          scene = createBotScene(canvasRef.current, { reducedMotion: reduced });
          if (!scene) {
            setFallback(true);
            return show();
          }
          sceneRef.current = scene;
          // Let the hero finish its entrance before the bot takes the stage.
          startCall = gsap.delayedCall(Math.max(0, 2.4 - performance.now() / 1000), whenVisible);
        })
        .catch(() => {
          if (cancelled) return;
          setFallback(true);
          show();
        });
    }

    const canIdle = typeof window.requestIdleCallback === "function";
    const idle = canIdle ? window.requestIdleCallback(load, { timeout: 2000 }) : window.setTimeout(load, 800);

    function onPointer(e: PointerEvent) {
      if (!scene || openRef.current || flightRef.current) return;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        const rect = el!.getBoundingClientRect();
        scene?.lookAt(
          (e.clientX - (rect.left + rect.width / 2)) / (window.innerWidth * 0.5),
          (e.clientY - (rect.top + rect.height / 2)) / (window.innerHeight * 0.5),
        );
      });
    }
    window.addEventListener("pointermove", onPointer, { passive: true });

    const themeObserver = new MutationObserver(() => scene?.refreshColors());
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelled = true;
      if (canIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      startCall?.kill();
      moodCall?.kill();
      flightRef.current?.kill();
      flightRef.current = null;
      cancelAnimationFrame(pointerFrame);
      window.removeEventListener("pointermove", onPointer);
      themeObserver.disconnect();
      scene?.dispose();
      sceneRef.current = null;
    };
  }, []);

  /* ── The bot reacts to the conversation ── */
  useEffect(() => {
    sceneRef.current?.setMood(pending ? "thinking" : "idle");
  }, [pending]);

  useEffect(() => {
    // Glance up at the panel while it's open.
    if (open) sceneRef.current?.lookAt(-0.55, -0.85);
  }, [open]);

  useEffect(() => {
    if (!bubble) return;
    const timer = window.setTimeout(() => setBubble(false), 7000);
    return () => window.clearTimeout(timer);
  }, [bubble]);

  useLayoutEffect(() => {
    if (!bubble || !bubbleRef.current || prefersReducedMotion()) return;
    gsap.from(bubbleRef.current, { autoAlpha: 0, x: 14, scale: 0.85, transformOrigin: "100% 50%", duration: 0.4, ease: "back.out(2)" });
  }, [bubble]);

  useLayoutEffect(() => {
    if (!open || !panelRef.current) return;
    if (!prefersReducedMotion()) {
      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: 18, scale: 0.95 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.34, ease: "power3.out" },
      );
    }
    inputRef.current?.focus();
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [open]);

  const count = stored.messages.length;
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    list.scrollTo({ top: list.scrollHeight, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    const messages = list.querySelectorAll("[data-message]");
    const latest = messages[messages.length - 1];
    if (latest && count > 1 && !prefersReducedMotion()) {
      gsap.from(latest, { autoAlpha: 0, y: 8, duration: 0.25, ease: "power2.out" });
    }
  }, [count, pending]);

  const openChat = useCallback(() => {
    // Clicking the bot mid-flight lands it straight away.
    flightRef.current?.progress(1);
    setBubble(false);
    setOpen(true);
    sceneRef.current?.pop();
  }, []);

  const closeChat = useCallback(() => {
    const panel = panelRef.current;
    launcherRef.current?.focus();
    if (!panel || prefersReducedMotion()) return setOpen(false);
    gsap.to(panel, { autoAlpha: 0, y: 12, scale: 0.97, duration: 0.18, ease: "power2.in", onComplete: () => setOpen(false) });
  }, []);

  const onNavigate = useCallback(() => {
    if (window.innerWidth < 640) setOpen(false);
  }, []);

  async function send(text: string) {
    const question = text.trim();
    if (!question || pending) return;
    setInput("");
    setStored((s) => ({ ...s, messages: [...s.messages, { role: "user", text: question }] }));
    setPending(true);

    let reply: Message;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: question, sessionId: stored.sessionId }),
      });
      const data = (await res.json().catch(() => ({}))) as { reply?: string; error?: string };
      reply = res.ok && data.reply
        ? { role: "bot", text: data.reply }
        : { role: "bot", text: data.error ?? "The assistant couldn't answer just now.", error: true };
    } catch {
      reply = { role: "bot", text: "I couldn't reach the assistant. Check your connection and try again.", error: true };
    }
    setStored((s) => ({ ...s, messages: [...s.messages, reply].slice(-40) }));
    setPending(false);
    if (!reply.error) sceneRef.current?.pop();
  }

  return (
    <>
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Chat about Kelvin's work"
          onKeyDown={(e) => e.key === "Escape" && closeChat()}
          className="fixed right-3 bottom-[6.25rem] z-[70] flex h-[min(34rem,calc(100dvh-8.5rem))] w-[min(24rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-[var(--shadow-soft)] sm:right-5 sm:bottom-[7.5rem]"
        >
          <header className="flex items-start gap-3 border-b border-border px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Ask about Kelvin&apos;s work</p>
              <p className="text-xs text-muted-foreground">Answers come from this portfolio.</p>
            </div>
            <button
              type="button"
              onClick={closeChat}
              aria-label="Close chat"
              className="focusable -mr-1 inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4" aria-live="polite">
            {stored.messages.map((message, i) => (
              <MessageBubble key={i} message={message} onNavigate={onNavigate} />
            ))}
            {pending && (
              <div className="flex justify-start" data-message>
                <div className="chat-dots rounded-2xl rounded-bl-md bg-secondary px-4 py-3.5" role="status" aria-label="Writing a reply">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
            {count === 1 && !pending && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="focusable rounded-full border border-border px-3 py-1.5 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-end gap-2 border-t border-border p-3"
          >
            <label htmlFor="chat-input" className="sr-only">
              Your question
            </label>
            <textarea
              id="chat-input"
              ref={inputRef}
              rows={1}
              value={input}
              maxLength={600}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Ask a question"
              className="max-h-28 min-h-10 flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm leading-6 outline-none [field-sizing:content] focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button
              type="submit"
              disabled={!input.trim() || pending}
              aria-label="Send"
              className="focusable inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
            >
              <ArrowUp className="size-4" />
            </button>
          </form>
        </div>
      )}

      <div className="fixed right-3 bottom-3 z-[70] flex items-center gap-1 sm:right-5 sm:bottom-5">
        {bubble && !open && (
          <button
            ref={bubbleRef}
            type="button"
            onClick={openChat}
            className="focusable rounded-2xl rounded-br-md border border-border bg-popover px-4 py-2.5 text-sm font-medium whitespace-nowrap text-popover-foreground shadow-[var(--shadow-soft)]"
          >
            Hi! Ask me about Kelvin&apos;s work.
          </button>
        )}
        <button
          ref={launcherRef}
          type="button"
          onClick={open ? closeChat : openChat}
          onPointerEnter={() => !open && !pending && sceneRef.current?.setMood("happy")}
          onPointerLeave={() => !pending && sceneRef.current?.setMood("idle")}
          aria-expanded={open}
          aria-label={open ? "Close chat" : "Open chat: ask about Kelvin's work"}
          className="chat-launcher focusable invisible relative block size-[76px] rounded-full sm:size-[88px]"
        >
          <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute -inset-[30%] size-[160%]" />
          {fallback && (
            <span className="absolute inset-2 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
              <MessageCircle className="size-7" />
            </span>
          )}
        </button>
      </div>
    </>
  );
}

function MessageBubble({ message, onNavigate }: { message: Message; onNavigate: () => void }) {
  const user = message.role === "user";
  return (
    <div className={cn("flex", user ? "justify-end" : "justify-start")} data-message>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-6",
          user ? "rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md bg-secondary text-secondary-foreground",
        )}
      >
        {user ? <p className="whitespace-pre-wrap">{message.text}</p> : <RichText text={message.text} onNavigate={onNavigate} />}
        {message.error && (
          <p className="mt-1">
            You can also reach Kelvin through the{" "}
            <Link href="/contact" onClick={onNavigate} className="font-medium text-primary underline underline-offset-2">
              contact page
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
}

/* Replies use a little markdown: paragraphs, lists, **bold** and links. */
function RichText({ text, onNavigate }: { text: string; onNavigate: () => void }) {
  type List = { ordered: boolean; items: string[] };
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let list = null as List | null;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push(
      <p key={blocks.length}>
        {paragraph.map((line, i) => (
          <Fragment key={i}>
            {i > 0 && <br />}
            <Inline text={line} onNavigate={onNavigate} />
          </Fragment>
        ))}
      </p>,
    );
    paragraph = [];
  };
  const flushList = () => {
    if (!list) return;
    const Tag = list.ordered ? "ol" : "ul";
    blocks.push(
      <Tag key={blocks.length} className={cn("space-y-1 pl-5", list.ordered ? "list-decimal" : "list-disc")}>
        {list.items.map((item, i) => (
          <li key={i}>
            <Inline text={item} onNavigate={onNavigate} />
          </li>
        ))}
      </Tag>,
    );
    list = null;
  };

  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }
    const bullet = line.match(/^(?:[-*•]|(\d+)[.)])\s+(.*)$/);
    if (bullet) {
      flushParagraph();
      const ordered = Boolean(bullet[1]);
      if (list && list.ordered !== ordered) flushList();
      list ??= { ordered, items: [] };
      list.items.push(bullet[2]);
      continue;
    }
    flushList();
    paragraph.push(line.replace(/^#{1,6}\s+/, ""));
  }
  flushParagraph();
  flushList();

  return <div className="space-y-2">{blocks}</div>;
}

const INLINE = /\[([^\]]+)\]\(((?:https?:\/\/|\/)[^\s)]+)\)|(https?:\/\/[^\s<>()]+)|([\w.+-]+@[\w-]+\.[\w.-]+)|\*\*([^*]+)\*\*/g;

function Inline({ text, onNavigate }: { text: string; onNavigate: () => void }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(INLINE)) {
    const index = match.index ?? 0;
    if (index > last) parts.push(text.slice(last, index));
    const [whole, label, linked, bare, email, bold] = match;
    if (bold) {
      parts.push(<strong key={index}>{bold}</strong>);
    } else if (email) {
      const address = email.replace(/[.]+$/, "");
      parts.push(<ChatLink key={index} href={`mailto:${address}`}>{address}</ChatLink>);
      if (address.length < email.length) parts.push(email.slice(address.length));
    } else {
      let href = linked ?? bare;
      let trail = "";
      if (bare) {
        trail = href.match(/[.,;:!?]+$/)?.[0] ?? "";
        href = href.slice(0, href.length - trail.length);
      }
      parts.push(
        <ChatLink key={index} href={href} onNavigate={onNavigate}>
          {label ?? shortUrl(href)}
        </ChatLink>,
      );
      if (trail) parts.push(trail);
    }
    last = index + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

function internalPath(href: string) {
  for (const origin of [SITE, window.location.origin]) {
    if (href.startsWith(origin)) return href.slice(origin.length) || "/";
  }
  return href.startsWith("/") ? href : null;
}

function shortUrl(href: string) {
  const path = internalPath(href);
  if (path) return path === "/" ? "the portfolio" : path;
  return href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

function ChatLink({ href, children, onNavigate }: { href: string; children: ReactNode; onNavigate?: () => void }) {
  const className = "font-medium text-primary underline underline-offset-2 break-words";
  const path = internalPath(href);
  if (path) {
    return (
      <Link href={path} onClick={onNavigate} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
