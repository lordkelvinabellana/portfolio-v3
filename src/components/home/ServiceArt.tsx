"use client";

import { useRef } from "react";
import type { ServiceKey } from "@/data/services";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/* A 3D spark built from crossed rays in two planes, turning on its axis. */
export function AiSpark({ size = 28 }: { size?: number }) {
  return (
    <span className="ai-spark" style={{ ["--spark" as string]: `${size}px` }} aria-hidden="true">
      <span className="ai-spark-body" data-spark-body>
        {[0, 45, 90, 135].map((a) => (
          <i key={`z${a}`} style={{ transform: `rotateZ(${a}deg)` }} />
        ))}
        {[0, 90].map((a) => (
          <i key={`y${a}`} style={{ transform: `rotateY(90deg) rotateZ(${a}deg)` }} />
        ))}
      </span>
    </span>
  );
}

/* Small looping pictures that sit on top of each service: a running workflow,
   a timeline being cut, and an app screen building itself. */
export function ServiceArt({ kind }: { kind: ServiceKey }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);
      const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1, defaults: { ease: "power2.out" } });

      if (kind === "operations") {
        const nodes = q(".art-node");
        const dots = q(".art-packet");
        tl.set(nodes, { attr: { "data-state": "idle" } });
        nodes.forEach((node, i) => {
          if (i > 0) tl.fromTo(dots[i - 1], { left: "0%", autoAlpha: 1 }, { left: "100%", duration: 0.4, ease: "power1.inOut" }).set(dots[i - 1], { autoAlpha: 0 });
          tl.set(node, { attr: { "data-state": "success" } });
        });
      }

      if (kind === "video") {
        tl.fromTo(q(".art-playhead"), { left: "0%" }, { left: "100%", duration: 3.2, ease: "none" }, 0)
          .fromTo(q(".art-drop"), { y: -16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: "expo.out" }, 0.6)
          .fromTo(q(".art-filler"), { width: "10%", autoAlpha: 1 }, { width: "0%", autoAlpha: 0, duration: 0.4, ease: "power2.inOut" }, 1.4)
          .fromTo(q(".art-key"), { scale: 0, rotation: 45 }, { scale: 1, rotation: 45, duration: 0.3, stagger: 0.12, ease: "back.out(2)" }, 2);
      }

      if (kind === "product") {
        tl.fromTo(q(".art-card"), { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.15 }, 0)
          .fromTo(q(".art-line path"), { strokeDashoffset: 120 }, { strokeDashoffset: 0, duration: 1, ease: "power2.inOut" }, 0.4)
          .fromTo(q(".art-cursor"), { x: 0, y: 0 }, { x: 46, y: -14, duration: 0.8, ease: "power2.inOut" }, 1.2)
          .fromTo(q(".art-cursor"), { scale: 1 }, { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1 }, 2);
      }

      ScrollTrigger.create({ trigger: el, start: "top 90%", end: "bottom top", onToggle: (s) => (s.isActive ? tl.play() : tl.pause()) });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="service-art" aria-hidden="true">
      {kind === "operations" && (
        <div className="art-flow">
          {["trigger", "code", "ai", "slack"].map((k, i, all) => (
            <div key={k} className="contents">
              <span className="art-node" data-state="success" data-kind={k}>
                {k === "ai" ? <AiSpark size={22} /> : <i />}
              </span>
              {i < all.length - 1 && (
                <span className="art-link">
                  <span className="art-packet" />
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {kind === "video" && (
        <div className="art-timeline">
          <div className="art-track">
            <span className="art-clip" style={{ left: "0%", width: "30%" }} />
            <span className="art-clip art-filler" style={{ left: "30%", width: "0%" }} />
            <span className="art-clip" style={{ left: "31%", width: "40%" }}>
              <b className="art-key" style={{ left: "30%" }} />
              <b className="art-key" style={{ left: "70%" }} />
            </span>
            <span className="art-clip" style={{ left: "72%", width: "28%" }} />
          </div>
          <div className="art-track art-track-gfx">
            <span className="art-clip art-drop" style={{ left: "18%", width: "26%" }} />
            <span className="art-clip" style={{ left: "60%", width: "18%" }} />
          </div>
          <div className="art-track art-track-audio">
            {Array.from({ length: 36 }, (_, i) => (
              <i key={i} style={{ height: `${30 + Math.abs(Math.sin(i * 1.3)) * 70}%` }} />
            ))}
          </div>
          <span className="art-playhead" />
        </div>
      )}

      {kind === "product" && (
        <div className="art-window">
          <div className="art-bar">
            <i /> <i /> <i />
          </div>
          <div className="art-body">
            <div className="art-side">
              <i /> <i /> <i />
            </div>
            <div className="art-main">
              <span className="art-card" />
              <span className="art-card" />
              <span className="art-card" />
              <svg className="art-line" viewBox="0 0 120 30" preserveAspectRatio="none">
                <path d="M0 26 C20 22 30 10 48 14 S80 4 120 6" strokeDasharray="120" />
              </svg>
            </div>
          </div>
          <span className="art-cursor" />
        </div>
      )}
    </div>
  );
}
