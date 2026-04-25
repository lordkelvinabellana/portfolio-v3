"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-t-lg bg-muted">
      <Image
        src={images[index]}
        alt={`${title} screenshot ${index + 1} of ${images.length}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={prev}
            className="focusable absolute left-2 top-1/2 h-11 w-11 -translate-y-1/2 border border-border bg-background/80 backdrop-blur hover:bg-background"
            aria-label={`Previous ${title} screenshot`}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={next}
            className="focusable absolute right-2 top-1/2 h-11 w-11 -translate-y-1/2 border border-border bg-background/80 backdrop-blur hover:bg-background"
            aria-label={`Next ${title} screenshot`}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to ${title} screenshot ${i + 1} of ${images.length}`}
                aria-current={i === index ? "true" : undefined}
                className="focusable flex h-11 w-11 items-center justify-center rounded-md border border-transparent"
              >
                <span
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-5 bg-primary" : "w-1.5 bg-background/80"
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
