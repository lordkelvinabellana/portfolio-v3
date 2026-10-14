"use client";

import { useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";
import { prefersReducedMotion } from "@/lib/gsap";
import type { BotScene } from "./botScene";

/* The chat bot, big, on the contact page: it watches the pointer, waves when you come near, and opens the chat. */
export function BotInvite() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<BotScene | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    let scene: BotScene | null = null;
    let frame = 0;
    import("./botScene")
      .then(({ createBotScene }) => {
        if (cancelled) return;
        scene = createBotScene(canvas, { reducedMotion: prefersReducedMotion() });
        sceneRef.current = scene;
      })
      .catch(() => {});
    const onPointer = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = canvas.getBoundingClientRect();
        scene?.lookAt(
          (e.clientX - (rect.left + rect.width / 2)) / (window.innerWidth * 0.5),
          (e.clientY - (rect.top + rect.height / 2)) / (window.innerHeight * 0.5),
        );
      });
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    const themeObserver = new MutationObserver(() => scene?.refreshColors());
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointer);
      themeObserver.disconnect();
      scene?.dispose();
      sceneRef.current = null;
    };
  }, []);

  const ask = () => {
    sceneRef.current?.pop();
    window.dispatchEvent(new Event("chat:open"));
  };

  return (
    <div
      className="panel flex flex-col items-center gap-6 rounded-xl p-6 sm:flex-row md:p-8"
      onPointerEnter={() => {
        sceneRef.current?.setMood("happy");
        sceneRef.current?.wave();
      }}
      onPointerLeave={() => sceneRef.current?.setMood("idle")}
    >
      <div className="relative size-36 shrink-0 sm:size-40" aria-hidden="true">
        <canvas ref={canvasRef} className="pointer-events-none absolute -inset-[20%] size-[140%]" />
      </div>
      <div className="flex-1 text-center sm:text-left">
        <h2 className="text-xl font-semibold">Ask the bot first</h2>
        <p className="quiet-text mt-2 text-sm leading-6">
          A quick question about my work, past roles or availability? The bot answers from this portfolio, any time of day.
        </p>
        <button
          type="button"
          onClick={ask}
          className="focusable mt-4 inline-flex min-h-11 items-center gap-2 rounded-md border border-primary bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <MessageCircle className="h-4 w-4" /> Ask the bot
        </button>
      </div>
    </div>
  );
}
