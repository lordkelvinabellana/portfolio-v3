"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Play } from "lucide-react";
import type { ProjectVideo } from "@/data/portfolio";
import { cn } from "@/lib/utils";

function useMediaQuery(query: string, serverValue: boolean) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

/*
 * A muted preview of a video. It plays while hovered (or while a parent says so) on desktop,
 * and while mostly on screen on touch devices. Nothing autoplays when the
 * visitor prefers reduced motion; the poster stands in.
 */
export function VideoTile({
  video,
  className,
  active,
}: {
  video: ProjectVideo;
  className?: string;
  /** Lets a parent (e.g. a hovered card) start the preview. */
  active?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const touch = !useMediaQuery("(pointer: fine)", true);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)", false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !touch) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.intersectionRatio > 0.6), {
      threshold: [0, 0.6, 1],
    });
    io.observe(el);
    return () => io.disconnect();
  }, [touch]);

  const playing = !reduced && (active || hovered || (touch && inView));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (playing) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [playing]);

  return (
    <div
      className={cn("relative overflow-hidden bg-secondary", className)}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <video
        ref={ref}
        src={video.src}
        poster={video.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={video.title}
        className="h-full w-full object-cover"
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-opacity duration-200",
          playing ? "opacity-0" : "opacity-100",
        )}
      >
        <Play className="h-3.5 w-3.5 translate-x-px fill-current" />
      </span>
    </div>
  );
}
