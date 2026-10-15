"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { GlyphService, ServiceGlyphScene } from "./serviceGlyph";
import type { CareerKind, CareerPathScene } from "./careerPath";

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
