"use client";

import { useRef } from "react";
import Link from "next/link";
import type { ProjectVideo } from "@/data/portfolio";
import { VideoTile } from "@/components/projects/VideoTile";
import { gsap, useGSAP } from "@/lib/gsap";

/* Vertical videos in a row. On wide screens alternate tiles drift against the
   scroll for a little depth; on phones the row scrolls sideways instead. */
export function OutputReel({ videos, href }: { videos: ProjectVideo[]; href: string }) {
  const rowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-reel-tile]").forEach((tile, i) => {
          const travel = i % 2 === 0 ? 5 : -5;
          gsap.fromTo(
            tile,
            { yPercent: travel },
            {
              yPercent: -travel,
              ease: "none",
              scrollTrigger: { trigger: rowRef.current, start: "top bottom", end: "bottom top", scrub: 0.8 },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: rowRef },
  );

  return (
    <div
      ref={rowRef}
      // One column per video, so the row never leaves a tile alone on a second line
      style={{ ["--reel-count" as string]: videos.length }}
      className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 py-2 lg:grid lg:snap-none lg:grid-cols-[repeat(var(--reel-count),minmax(0,1fr))] lg:overflow-visible lg:py-8"
    >
      {videos.map((video) => (
        <Link
          key={video.src}
          href={href}
          data-reel-tile
          className="focusable group w-[46vw] max-w-56 shrink-0 snap-start rounded-xl no-underline sm:w-[30vw] lg:w-auto lg:max-w-none"
        >
          <VideoTile
            video={video}
            className="panel aspect-[9/16] w-full rounded-xl transition-[border-color] duration-200 group-hover:border-primary/40"
          />
          <p className="mt-2 truncate text-xs font-semibold">{video.title}</p>
        </Link>
      ))}
    </div>
  );
}
