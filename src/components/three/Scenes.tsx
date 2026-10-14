"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { afterIntro } from "@/lib/intro";
import { cn } from "@/lib/utils";
import type { GlyphService, ServiceGlyphScene } from "./serviceGlyph";
import type { CareerKind, CareerPathScene } from "./careerPath";
import type { PortraitScene, PortraitShape } from "./portraitParticles";

/*
 * React wrappers for the three.js pieces. three.js loads only in the browser,
 * after the page is interactive, and each scene follows the theme.
 */

type Disposable = { dispose: () => void; refreshColors: () => void };

function useScene<T extends Disposable>(create: (canvas: HTMLCanvasElement, reducedMotion: boolean) => Promise<T | null>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const createRef = useRef(create);
  const [scene, setScene] = useState<T | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    let made: T | null = null;
    createRef
      .current(canvas, prefersReducedMotion())
      .then((result) => {
        if (cancelled) return result?.dispose();
        made = result;
        setScene(result);
      })
      .catch(() => {});
    const themeObserver = new MutationObserver(() => made?.refreshColors());
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => {
      cancelled = true;
      themeObserver.disconnect();
      made?.dispose();
    };
  }, []);

  return { canvasRef, scene };
}

/* A glossy object for a service; "all" cycles through the three. */
export function ServiceGlyph3D({ service, className }: { service: GlyphService | "personal" | "all"; className?: string }) {
  const { canvasRef, scene } = useScene<ServiceGlyphScene>(async (canvas, reducedMotion) =>
    (await import("./serviceGlyph")).createServiceGlyph(canvas, { reducedMotion }),
  );
  useEffect(() => {
    scene?.show(service === "personal" ? "product" : service);
  }, [scene, service]);
  return (
    <div className={cn("pointer-events-none relative", className)} aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

/* The career as a path of roles; `highlight` singles one out. */
export function CareerPath3D({
  roles,
  highlight = null,
  className,
}: {
  roles: { kind: CareerKind; current: boolean }[];
  highlight?: number | null;
  className?: string;
}) {
  const { canvasRef } = useScene<CareerPathScene>(async (canvas, reducedMotion) =>
    (await import("./careerPath")).createCareerPath(canvas, { reducedMotion, roles, highlight }),
  );
  return (
    <div className={cn("pointer-events-none relative", className)} aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

const LANE_SHAPES: Record<string, PortraitShape> = { Operations: "operations", Video: "video", Product: "product" };

/*
 * The particle portrait, drawn over the photo in `photoRef`. In the hero it
 * assembles once the page is released and turns into the work in step with
 * the showcase cards (one card per cycle, so the face stays the main view).
 */
export function PortraitCloud({
  photoRef,
  mode,
  className,
}: {
  photoRef: RefObject<HTMLElement | null>;
  mode: "hero" | "about";
  className?: string;
}) {
  const { canvasRef, scene } = useScene<PortraitScene>(async (canvas, reducedMotion) => {
    const photo = photoRef.current;
    if (!photo) return null;
    try {
      const image = new Image();
      image.src = "/assets/profile-256.jpg";
      await image.decode();
      const made = (await import("./portraitParticles")).createPortrait(canvas, { reducedMotion, image, photo });
      if (!made) gsap.set(photo, { autoAlpha: 1 });
      return made;
    } catch {
      gsap.set(photo, { autoAlpha: 1 });
      return null;
    }
  });

  useEffect(() => {
    if (!scene) return;
    let cancelHero = () => {};
    let io: IntersectionObserver | null = null;
    if (mode === "hero") {
      cancelHero = afterIntro(() => scene.assemble());
    } else {
      io = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        scene.assemble();
        io?.disconnect();
      });
      if (canvasRef.current) io.observe(canvasRef.current);
    }

    let played = 0;
    const onService = (event: Event) => {
      const shape = LANE_SHAPES[(event as CustomEvent<{ lane?: string }>).detail?.lane ?? ""];
      const card = played % 3;
      const cycle = Math.floor(played / 3);
      played++;
      if (shape && cycle % 3 === card) scene.morph(shape);
    };
    if (mode === "hero") window.addEventListener("hero:service", onService);

    return () => {
      cancelHero();
      io?.disconnect();
      window.removeEventListener("hero:service", onService);
    };
  }, [scene, mode, canvasRef]);

  return (
    <div className={cn("pointer-events-none absolute", className)} aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
