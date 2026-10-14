"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/*
 * How a system moves work from one step to the next. Steps light up in order
 * when the diagram scrolls into view; after that a packet relays along the
 * chain, continuously on a case study page, or while its card is hovered.
 */
export function FlowDiagram({
  steps,
  layout = "responsive",
  active,
  loop = false,
  className,
}: {
  steps: string[];
  /** responsive = vertical on phones, horizontal from md. vertical = always stacked. */
  layout?: "responsive" | "vertical";
  /** Plays the relay while true (e.g. a hovered card). */
  active?: boolean;
  /** Keeps the relay running while the diagram is on screen. */
  loop?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLOListElement>(null);
  const relay = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || prefersReducedMotion()) return;
      const markers = root.querySelectorAll<HTMLElement>("[data-flow-marker]");
      const fills = root.querySelectorAll<HTMLElement>("[data-flow-fill]");
      const labels = root.querySelectorAll<HTMLElement>("[data-flow-label]");
      const packets = root.querySelectorAll<HTMLElement>("[data-flow-packet]");

      const intro = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
        onComplete: () => {
          markers.forEach((m) => m.classList.add("is-lit"));
          if (loop) relay.current?.play();
        },
      });
      intro
        .fromTo(markers, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.45, stagger: 0.12 })
        .fromTo(labels, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.12 }, 0.05)
        .fromTo(fills, { "--fill": 0 }, { "--fill": 1, duration: 0.5, stagger: 0.12, ease: "power2.inOut" }, 0.15);

      const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.4 });
      packets.forEach((packet, i) => {
        tl.set(packet, { autoAlpha: 1, "--p": 0 })
          .to(packet, { "--p": 1, duration: 0.55, ease: "power1.inOut" })
          .set(packet, { autoAlpha: 0 })
          .fromTo(
            markers[i + 1],
            { scale: 1.22 },
            { scale: 1, duration: 0.4, ease: "power2.out", immediateRender: false },
          );
      });
      relay.current = tl;

      ScrollTrigger.create({
        trigger: root,
        start: "top 88%",
        end: "bottom top",
        once: !loop,
        onEnter: () => intro.play(),
        onLeave: () => loop && tl.pause(),
        onEnterBack: () => loop && intro.progress() === 1 && tl.play(),
        onLeaveBack: () => loop && tl.pause(),
      });
    },
    { scope: ref, dependencies: [loop] },
  );

  useEffect(() => {
    const tl = relay.current;
    if (!tl || loop) return;
    if (active) tl.restart();
    else tl.pause(0);
  }, [active, loop]);

  return (
    <ol
      ref={ref}
      className={cn("flow", layout === "vertical" ? "flow-vertical" : "flow-responsive", className)}
    >
      {steps.map((step, i) => (
        <li key={step} className="flow-step">
          <span data-flow-marker className="flow-marker" aria-hidden="true">
            {i + 1}
          </span>
          <span data-flow-label className="flow-label">
            {step}
          </span>
          {i < steps.length - 1 && (
            <span className="flow-link" aria-hidden="true">
              <span data-flow-fill className="flow-fill" />
              <span data-flow-packet className="flow-packet" />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
