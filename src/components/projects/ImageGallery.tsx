"use client";

import { useState } from "react";
import Image from "next/image";
import { Images } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  title: string;
  /** card = single blurred hero (for project cards); full = grid with expand (for detail page) */
  variant?: "card" | "full";
}

const DEFAULT_VISIBLE = 3;

export function ImageGallery({ images, title, variant = "full" }: ImageGalleryProps) {
  const [showAll, setShowAll] = useState(false);

  if (images.length === 0) return null;

  /* ── Card variant: single blurred hero inside a clickable Link ── */
  if (variant === "card") {
    return (
      <div className="group relative aspect-video w-full overflow-hidden rounded-t-lg bg-muted">
        <Image
          src={images[0]}
          alt={`${title} preview`}
          fill
          className="object-cover transition-[filter] duration-300 blur-md group-hover:blur-sm"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
          <span className="rounded-full bg-background/60 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-foreground/60 backdrop-blur-sm">
            Preview
          </span>
        </div>
        {images.length > 1 && (
          <div className="pointer-events-none absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-background/60 px-2 py-0.5 text-xs font-semibold text-foreground/60 backdrop-blur-sm">
            <Images className="h-3 w-3" />
            {images.length}
          </div>
        )}
      </div>
    );
  }

  /* ── Full variant: grid with inline expand ── */
  const visible = showAll ? images : images.slice(0, DEFAULT_VISIBLE);
  const remaining = images.length - DEFAULT_VISIBLE;

  const gridCols =
    visible.length === 1
      ? "grid-cols-1"
      : visible.length === 2
        ? "grid-cols-2"
        : "grid-cols-3";

  return (
    <div className="space-y-3">
      <div className={cn("grid gap-2", gridCols)}>
        {visible.map((src, i) => (
          <div
            key={src}
            className="group relative aspect-video overflow-hidden rounded-lg bg-muted"
          >
            <Image
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              fill
              className="object-cover transition-[filter] duration-300 blur-md group-hover:blur-none"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              loading={i >= DEFAULT_VISIBLE ? "lazy" : undefined}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
              <span className="rounded-full bg-background/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground/60 backdrop-blur-sm">
                Dashboard Preview
              </span>
            </div>
          </div>
        ))}
      </div>

      {!showAll && remaining > 0 && (
        <button
          onClick={() => setShowAll(true)}
          className="focusable rounded-md border border-border bg-secondary px-3.5 py-2 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Show all {images.length} images
        </button>
      )}
    </div>
  );
}
