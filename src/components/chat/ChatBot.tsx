"use client";

import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowUp, MessageCircle, X } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { endIntro, introPlanned, releaseIntro, startIntro } from "@/lib/intro";
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

const PHI = (1 + Math.sqrt(5)) / 2;
const SPIRAL_QUARTER_TURNS = 6;

type Point = { x: number; y: number };

/* Chooses a golden spiral from `start` that stays on screen: its pole sits 1/φ
   of the way to the docked corner (closer in on small screens), turning
   whichever way keeps the bot in view. */
function goldenSpiral(start: Point, end: Point, W: number, H: number, bodyPx: number, kClose: number) {
  type Spiral = { pole: Point; radius: number; angle: number; dir: number; overflow: number };
  let best: Spiral | null = null;
  for (const share of [1 / PHI, 0.5, 0.38]) {
    const pole = { x: start.x + (end.x - start.x) * share, y: start.y + (end.y - start.y) * share };
    const radius = Math.hypot(start.x - pole.x, start.y - pole.y);
    const angle = Math.atan2(start.y - pole.y, start.x - pole.x);
    for (const dir of [1, -1]) {
      let overflow = 0;
      for (let i = 1; i <= 60; i++) {
        const u = (SPIRAL_QUARTER_TURNS * i) / 60;
        const shrink = PHI ** -u;
        const a = angle + dir * u * (Math.PI / 2);
        const x = pole.x + radius * shrink * Math.cos(a);
        const y = pole.y + radius * shrink * Math.sin(a);
        const half = bodyPx * (1 + (kClose - 1) * shrink) * 0.4;
        overflow = Math.max(overflow, half - x, x + half - W, half - y, y + half - H);
      }
      if (!best || overflow < best.overflow) best = { pole, radius, angle, dir, overflow };
      if (overflow <= 0) return best;
    }
  }
  return best!;
}

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
  const stageRef = useRef<HTMLCanvasElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
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

  /* ── Load the 3D bot. On a first visit it opens the show: a close-up on a
        full-screen stage, then a golden-spiral flight down to the corner. ── */
  useEffect(() => {
    const el = launcherRef.current;
    const stageCanvas = stageRef.current;
    const spot = spotRef.current;
    if (!el || !stageCanvas || !spot) return;
    const reduced = prefersReducedMotion();
    const intro = introPlanned() && !reduced;
    let cancelled = false;
    let scene: BotScene | null = null;
    let stage: BotScene | null = null;
    let startCall: gsap.core.Tween | null = null;
    let moodCall: gsap.core.Tween | null = null;
    let pointerFrame = 0;

    const show = () => gsap.set(el, { autoAlpha: 1 });
    const letGo = () => {
      endIntro();
      releaseIntro();
    };

    function greet(bot: BotScene) {
      bot.setMood("happy");
      bot.pop();
      bot.wave();
      setBubble(true);
      moodCall = gsap.delayedCall(1.8, () => bot.setMood("idle"));
    }

    // Any click, key, scroll or touch fast-forwards the intro.
    function skip() {
      releaseIntro();
      flightRef.current?.timeScale(4);
    }
    const SKIP_EVENTS = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
    const listenForSkip = (on: boolean) =>
      SKIP_EVENTS.forEach((type) =>
        on ? window.addEventListener(type, skip, { passive: true }) : window.removeEventListener(type, skip),
      );

    function finishIntro(dock: BotScene) {
      listenForSkip(false);
      flightRef.current = null;
      gsap.set([stageCanvas, spot], { autoAlpha: 0 });
      stage?.dispose();
      stage = null;
      letGo();
      show();
      greet(dock);
    }

    function playIntro(dock: BotScene, star: BotScene) {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const rect = el!.getBoundingClientRect();
      const end = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      const bodyPx = rect.width * 0.7;
      const kClose = Math.max(2.4, (0.42 * Math.min(W, H)) / bodyPx);
      const start = { x: W / 2, y: H * 0.48 };
      const spiral = goldenSpiral(start, end, W, H, bodyPx, kClose);

      const pos = { x: start.x, y: start.y, k: 0.001 };
      let prev = { ...start };
      const apply = () => {
        star.place(pos.x, pos.y, pos.k);
        star.setVelocity((pos.x - prev.x) / 22, (pos.y - prev.y) / 22);
        prev = { x: pos.x, y: pos.y };
      };
      const turn = { u: 0 };
      const along = () => {
        const shrink = PHI ** -turn.u;
        const angle = spiral.angle + spiral.dir * turn.u * (Math.PI / 2);
        pos.x = spiral.pole.x + spiral.radius * shrink * Math.cos(angle);
        pos.y = spiral.pole.y + spiral.radius * shrink * Math.sin(angle);
        pos.k = 1 + (kClose - 1) * shrink;
        apply();
      };

      apply();
      gsap.set(stageCanvas, { autoAlpha: 1 });
      star.setMood("happy");
      listenForSkip(true);

      flightRef.current = gsap
        .timeline({ onComplete: () => finishIntro(dock) })
        .to(spot, { autoAlpha: 1, duration: 0.45, ease: "power1.out" }, 0)
        // Up close: bursts out of the glow right in front of the visitor, spins, hops and waves.
        .to(spot!.querySelector("[data-glow]"), { scale: 2.6, autoAlpha: 0, duration: 0.6, ease: "power2.out" }, 0.05)
        .to(pos, { k: kClose, duration: 0.9, ease: "back.out(1.7)", onUpdate: apply }, 0.1)
        .add(() => star.spin(), 0.2)
        .add(() => star.hop(), 1.2)
        .add(() => star.wave(), 1.65)
        .add(() => star.setMood("flying"), 2.35)
        .add(releaseIntro, 2.4)
        .to(spot, { autoAlpha: 0, duration: 1, ease: "power1.inOut" }, 2.4)
        // A golden spiral: each quarter turn is 1/φ the size of the one before.
        .to(turn, { u: SPIRAL_QUARTER_TURNS, duration: 3, ease: "sine.inOut", onUpdate: along }, 2.45)
        .to(pos, { x: end.x, y: end.y, k: 1, duration: 0.6, ease: "power2.inOut", onUpdate: apply })
        .add(() => star.setVelocity(0, 0));
    }

    function arrive() {
      gsap.fromTo(el, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: reduced ? 0 : 0.5, ease: "back.out(2)" });
    }

    function giveUp() {
      setFallback(true);
      letGo();
      show();
    }

    function load() {
      import("./botScene")
        .then(async ({ createBotScene, pxPerUnit }) => {
          const dockCanvas = canvasRef.current;
          if (cancelled || !dockCanvas) return;
          scene = createBotScene(dockCanvas, { reducedMotion: reduced });
          if (!scene) return giveUp();
          sceneRef.current = scene;
          if (intro) {
            try {
              sessionStorage.setItem(FLOWN_KEY, "1");
            } catch {}
            stage = createBotScene(stageCanvas!, { reducedMotion: false, stage: { dockPxPerUnit: pxPerUnit(dockCanvas.clientHeight) } });
            if (stage) {
              await Promise.all([scene.ready(), stage.ready()]);
              if (cancelled) return;
              if (startIntro()) return playIntro(scene, stage);
              stage.dispose();
              stage = null;
            }
            // Ready too late for the close-up (or no second WebGL canvas):
            // let the page go and just pop in and say hi.
            letGo();
            const bot = scene;
            startCall = gsap.delayedCall(0.4, () => {
              arrive();
              moodCall = gsap.delayedCall(0.5, () => greet(bot));
            });
            return;
          }
          startCall = gsap.delayedCall(1.2, arrive);
        })
        .catch(() => {
          if (!cancelled) giveUp();
        });
    }

    // The intro can't wait for idle time; a returning visitor's bot can.
    const canIdle = !intro && typeof window.requestIdleCallback === "function";
    const idle = canIdle ? window.requestIdleCallback(load, { timeout: 2000 }) : window.setTimeout(load, intro ? 0 : 800);

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

    const themeObserver = new MutationObserver(() => {
      scene?.refreshColors();
      stage?.refreshColors();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelled = true;
      if (canIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      startCall?.kill();
      moodCall?.kill();
      flightRef.current?.kill();
      flightRef.current = null;
      listenForSkip(false);
      cancelAnimationFrame(pointerFrame);
      window.removeEventListener("pointermove", onPointer);
      themeObserver.disconnect();
      stage?.dispose();
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
    // The greeting steps aside after ten seconds, or as soon as the visitor scrolls on.
    const timer = window.setTimeout(() => setBubble(false), 10000);
    const startY = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > 120) setBubble(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [bubble]);

  useLayoutEffect(() => {
    if (!bubble || !bubbleRef.current || prefersReducedMotion()) return;
    gsap
      .timeline()
      .from(bubbleRef.current, { autoAlpha: 0, x: 24, scale: 0.3, rotation: -8, transformOrigin: "100% 70%", duration: 0.55, ease: "back.out(2.2)" })
      .to(bubbleRef.current, { keyframes: { rotation: [0, -3, 2.5, -1, 0] }, duration: 0.6, ease: "sine.inOut" });
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

      {/* Intro stage: a spotlight and a full-screen canvas for the close-up. */}
      <div ref={spotRef} aria-hidden className="bot-spotlight pointer-events-none invisible fixed inset-0 z-[78]">
        <span data-glow className="bot-glow" />
      </div>
      <canvas ref={stageRef} aria-hidden className="pointer-events-none invisible fixed inset-0 z-[79] h-full w-full" />

      <div className="fixed right-3 bottom-3 z-[70] flex items-center gap-1 sm:right-5 sm:bottom-5">
        {bubble && !open && (
          <button
            ref={bubbleRef}
            type="button"
            onClick={openChat}
            className="bot-bubble focusable mr-2 rounded-2xl border border-border bg-popover px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-popover-foreground shadow-[var(--shadow-soft)]"
          >
            Hi! Ask me anything about Kelvin.
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
