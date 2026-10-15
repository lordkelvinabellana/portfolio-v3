"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { afterIntro } from "@/lib/intro";
import { cn } from "@/lib/utils";
import type { PortraitIconsScene } from "@/components/three/portraitIcons";

/*
 * Kelvin, cut out of the photo, standing in front of a round backdrop with his
 * head breaking out over its top edge. Hovering (or tapping) sends the tools
 * he works with flying out from behind him: the 3D canvas sits between the
 * backdrop and the photo.
 *
 * The box is 4:5; the backdrop is a circle filling its width at the bottom.
 * The mask shows everything above the circle's middle and only the inside of
 * the circle below it, so the shoulders sit inside and the hair pops out.
 */

const MASK = [
  "radial-gradient(circle closest-side at 50% 60%, #000 calc(100% - 1px), transparent 100%)",
  "linear-gradient(#000, #000)",
].join(", ");

const PERSON_MASK: CSSProperties = {
  maskImage: MASK,
  maskSize: "100% 100%, 100% 60%",
  maskRepeat: "no-repeat",
  maskPosition: "center, top",
  WebkitMaskImage: MASK,
  WebkitMaskSize: "100% 100%, 100% 60%",
  WebkitMaskRepeat: "no-repeat",
  WebkitMaskPosition: "center, top",
};

export function PortraitPop({
  className,
  priority = false,
  entrance = "hero",
  tools = true,
}: {
  className?: string;
  priority?: boolean;
  /* "hero" waits for the page's opening; "view" plays when scrolled into view. */
  entrance?: "hero" | "view";
  /* The flying tool tiles need room around the portrait; leave them off in tight spots. */
  tools?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<PortraitIconsScene | null>(null);
  const openRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root) return;
    const reduced = prefersReducedMotion();
    const backdrop = root.querySelector<HTMLElement>("[data-backdrop]");
    const person = root.querySelector<HTMLElement>("[data-person]");
    let cancelled = false;
    let scene: PortraitIconsScene | null = null;
    let peekCall: gsap.core.Tween | null = null;
    let cancelHero = () => {};
    let io: IntersectionObserver | null = null;

    const enter = () => {
      if (reduced) {
        gsap.set([backdrop, person], { autoAlpha: 1 });
        return;
      }
      gsap.fromTo(backdrop, { scale: 0.7, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.9, ease: "back.out(1.6)" });
      gsap.fromTo(person, { yPercent: 10, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1, ease: "power3.out", delay: 0.15 });
      // Show once what hovering does: the tools peek out and tuck back in.
      peekCall = gsap.delayedCall(1.7, () => !openRef.current && sceneRef.current?.peek());
    };

    if (entrance === "hero") {
      cancelHero = afterIntro(enter);
    } else {
      io = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        enter();
        io?.disconnect();
      });
      io.observe(root);
    }

    if (canvas) {
      import("@/components/three/portraitIcons")
        .then(({ createPortraitIcons }) => {
          if (cancelled) return;
          scene = createPortraitIcons(canvas, { reducedMotion: reduced });
          sceneRef.current = scene;
        })
        .catch(() => {});
    }

    const themeObserver = new MutationObserver(() => scene?.refreshColors());
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelled = true;
      cancelHero();
      io?.disconnect();
      peekCall?.kill();
      themeObserver.disconnect();
      scene?.dispose();
      sceneRef.current = null;
    };
  }, [entrance]);

  const setOpen = (open: boolean) => {
    openRef.current = open;
    if (open) sceneRef.current?.show();
    else sceneRef.current?.hide();
  };

  return (
    <div
      ref={rootRef}
      className={cn("relative aspect-[4/5] w-full", className)}
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
      onPointerUp={(e) => e.pointerType !== "mouse" && setOpen(!openRef.current)}
    >
      <div data-backdrop data-reveal className="portrait-backdrop absolute inset-x-0 bottom-0 aspect-square rounded-full" />
      {tools && <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute -inset-[35%] h-[170%] w-[170%]" />}
      <div data-person data-reveal className="absolute inset-0" style={PERSON_MASK}>
        <Image
          src="/assets/profile-cutout.png"
          alt="Lord Kelvin Abellana"
          width={1000}
          height={1000}
          priority={priority}
          sizes="(min-width: 1024px) 26rem, 20rem"
          draggable={false}
          className="absolute top-[4.4%] left-[-10%] w-[120%] max-w-none select-none"
        />
      </div>
    </div>
  );
}
