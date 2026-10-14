"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/*
 * An edit in progress, in 3D: tracks tilted back in perspective, a playhead
 * sweeping across, a filler take ripple-deleted, a graphic dropped onto its
 * track, zoom keyframes and a blade cut. Plays while on screen.
 */

type Clip = { id: string; left: number; width: number; label?: string; tone: string; filler?: boolean; cut?: number; keys?: number[] };
type Track = { id: string; name: string; clips: Clip[]; wave?: boolean };

const TRACKS: Track[] = [
  { id: "v3", name: "V3 Titles", clips: [
    { id: "t1", left: 3, width: 17, label: "Hook", tone: "var(--amber-fg)" },
    { id: "t2", left: 72, width: 16, label: "Offer", tone: "var(--amber-fg)" },
  ] },
  { id: "v2", name: "V2 Graphics", clips: [
    { id: "g1", left: 20, width: 21, label: "Panel", tone: "var(--coral-fg)" },
    { id: "g2", left: 50, width: 13, label: "Statement", tone: "var(--coral-fg)" },
    { id: "g3", left: 76, width: 18, label: "Logo", tone: "var(--coral-fg)" },
  ] },
  { id: "v1", name: "V1 Camera", clips: [
    { id: "c1", left: 0, width: 24, label: "A-cam 01", tone: "var(--primary)" },
    { id: "c2", left: 24, width: 6, label: "um", tone: "var(--destructive)", filler: true },
    { id: "c3", left: 30, width: 30, label: "A-cam 02", tone: "var(--primary)", keys: [36, 62] },
    { id: "c4", left: 60, width: 40, label: "A-cam 03", tone: "var(--primary)", cut: 45 },
  ] },
  { id: "a1", name: "A1 Voice", wave: true, clips: [{ id: "w1", left: 0, width: 100, tone: "var(--teal-fg)" }] },
  { id: "a2", name: "A2 SFX", clips: [
    { id: "s1", left: 19, width: 4, tone: "var(--violet-fg)" },
    { id: "s2", left: 49, width: 4, tone: "var(--violet-fg)" },
    { id: "s3", left: 75, width: 4, tone: "var(--violet-fg)" },
  ] },
];

const BARS = Array.from({ length: 64 }, (_, i) => 0.25 + Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.45)) * 0.75);

function timecode(frames: number) {
  const f = Math.floor(frames % 30), s = Math.floor(frames / 30) % 60, m = Math.floor(frames / 1800);
  return `00:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
}

export function EditTimeline({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const stage = q(".edit-stage")[0];
      const playhead = q(".edit-playhead")[0];
      const tc = q("[data-timecode]")[0];
      const clips = q<HTMLElement>("[data-clip]");
      const filler = q("[data-clip='c2']")[0];
      const after = q("[data-clip='c3'], [data-clip='c4']");
      const drop = q("[data-clip='g1']")[0];
      const keys = q(".edit-key");
      const blade = q(".edit-blade")[0];
      const c4b = q(".edit-gap")[0];
      gsap.set(stage, { rotationX: 50, rotationZ: -12 });

      const markLive = (pct: number) => {
        clips.forEach((c) => {
          const l = parseFloat(c.style.left), w = parseFloat(c.style.width);
          c.classList.toggle("is-live", pct >= l && pct <= l + w && w > 0.5);
        });
      };

      if (prefersReducedMotion()) {
        gsap.set(filler, { width: "0%", autoAlpha: 0 });
        gsap.set(after, { left: (i, t: HTMLElement) => `${parseFloat(t.style.left) - 6}%` });
        gsap.set(keys, { autoAlpha: 1, scale: 1 });
        gsap.set(playhead, { left: "62%" });
        gsap.set(c4b, { autoAlpha: 1 });
        markLive(62);
        return;
      }

      const state = { p: 0 };
      const original = new Map(clips.map((c) => [c, { left: c.style.left, width: c.style.width }]));
      const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.2, defaults: { ease: "power3.out" } });
      tl.call(() => {
        original.forEach((v, c) => { c.style.left = v.left; c.style.width = v.width; });
        gsap.set(filler, { autoAlpha: 1 });
        gsap.set(drop, { z: 90, autoAlpha: 0 });
        gsap.set(keys, { autoAlpha: 0, scale: 0 });
        gsap.set(blade, { autoAlpha: 0, scaleY: 0 });
        gsap.set(c4b, { autoAlpha: 0 });
      })
        .fromTo(".edit-track", { z: -30, autoAlpha: 0 }, { z: 0, autoAlpha: 1, duration: 0.6, stagger: 0.07 }, 0)
        .to(state, {
          p: 100, duration: 8, ease: "none",
          onUpdate: () => {
            playhead.style.left = `${state.p}%`;
            tc.textContent = timecode(state.p * 31.2);
            markLive(state.p);
          },
        }, 0.5)
        // ripple delete the filler take
        .to(filler, { opacity: 0.35, duration: 0.14, yoyo: true, repeat: 3, ease: "none" }, 1.2)
        .to(filler, { width: "0%", autoAlpha: 0, duration: 0.45, ease: "power2.inOut" }, 1.8)
        .to(after, { left: (i, t: HTMLElement) => `${parseFloat(t.style.left) - 6}%`, duration: 0.45, ease: "power2.inOut" }, 1.8)
        // drop a graphic onto V2
        .to(drop, { z: 0, autoAlpha: 1, duration: 0.7, ease: "expo.out" }, 2.6)
        // zoom keyframes
        .to(keys, { autoAlpha: 1, scale: 1, duration: 0.35, stagger: 0.15, ease: "back.out(2)" }, 3.4)
        // blade cut
        .to(blade, { autoAlpha: 1, scaleY: 1, duration: 0.2, ease: "power2.out" }, 4.6)
        .to(c4b, { autoAlpha: 1, duration: 0.01 }, 4.85)
        .to(blade, { autoAlpha: 0, duration: 0.3 }, 5.1);

      ScrollTrigger.create({ trigger: el, start: "top 85%", end: "bottom 10%", onToggle: (s) => (s.isActive ? tl.play() : tl.pause()) });

      // A little parallax with the pointer.
      if (window.matchMedia("(pointer: fine)").matches) {
        const rx = gsap.quickTo(stage, "rotationX", { duration: 1, ease: "power3.out" });
        const rz = gsap.quickTo(stage, "rotationZ", { duration: 1, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const b = el.getBoundingClientRect();
          const nx = (e.clientX - b.left) / b.width - 0.5, ny = (e.clientY - b.top) / b.height - 0.5;
          rx(50 - ny * 8);
          rz(-12 + nx * 8);
        };
        el.addEventListener("pointermove", move);
        return () => el.removeEventListener("pointermove", move);
      }
    },
    { scope: root },
  );

  return (
    <div ref={root} className={cn("edit-scene", className)} aria-hidden="true">
      <div className="edit-hud">
        <span className="edit-hud-dot" />
        <span data-timecode>00:00:00:00</span>
      </div>
      <div className="edit-stage">
        <div className="edit-ruler">
          <div className="edit-rail">
            {Array.from({ length: 11 }, (_, i) => (
              <span key={i} style={{ left: `${i * 10}%` }} />
            ))}
          </div>
        </div>
        {TRACKS.map((track) => (
          <div key={track.id} className="edit-track">
            <span className="edit-track-name">{track.name}</span>
            <div className="edit-lane">
              {track.clips.map((clip) => (
                <div
                  key={clip.id}
                  data-clip={clip.id}
                  className={cn("edit-clip", clip.filler && "edit-clip-filler", track.wave && "edit-clip-wave")}
                  style={{ left: `${clip.left}%`, width: `${clip.width}%`, ["--tone" as string]: clip.tone }}
                >
                  {track.wave &&
                    BARS.map((h, i) => <i key={i} style={{ height: `${Math.round(h * 100)}%` }} />)}
                  {clip.label && <span>{clip.label}</span>}
                  {clip.keys?.map((k) => <b key={k} className="edit-key" style={{ left: `${k}%` }} />)}
                  {clip.cut && (
                    <>
                      <em className="edit-blade" style={{ left: `${clip.cut}%` }} />
                      <em className="edit-gap" style={{ left: `${clip.cut}%` }} />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="edit-rail edit-playhead-rail">
          <div className="edit-playhead" />
        </div>
      </div>
    </div>
  );
}
