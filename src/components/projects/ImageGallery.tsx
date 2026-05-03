"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Images, X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  title: string;
  /** card = single blurred hero (project index cards); full = grid + modal + spotlight (detail page) */
  variant?: "card" | "full";
}

const DEFAULT_VISIBLE = 3;

export function ImageGallery({
  images,
  title,
  variant = "full",
}: ImageGalleryProps) {
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [spotlightIndex, setSpotlightIndex] = useState<number | null>(null);
  const spotlightCloseRef = useRef<HTMLButtonElement>(null);
  const modalCloseRef = useRef<HTMLButtonElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const FOCUSABLE =
    'button:not([disabled]), [href]:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])';

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (spotlightIndex !== null) spotlightCloseRef.current?.focus();
  }, [spotlightIndex]);

  useEffect(() => {
    if (showModal) modalCloseRef.current?.focus();
  }, [showModal]);

  /* Keyboard nav & body scroll lock */
  useEffect(() => {
    const active = showModal || spotlightIndex !== null;
    if (!active) return;

    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (spotlightIndex !== null) setSpotlightIndex(null);
        else setShowModal(false);
      }

      if (spotlightIndex !== null) {
        if (e.key === "ArrowRight")
          setSpotlightIndex((i) => ((i ?? 0) + 1) % images.length);
        if (e.key === "ArrowLeft")
          setSpotlightIndex(
            (i) => ((i ?? 0) - 1 + images.length) % images.length,
          );
      }

      if (e.key === "Tab") {
        const container = spotlightIndex !== null ? spotlightRef.current : modalRef.current;
        if (!container) return;
        const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [showModal, spotlightIndex, images.length]);

  if (images.length === 0) return null;

  /* ── Card variant: single blurred thumbnail inside the clickable Link ── */
  if (variant === "card") {
    return (
      <div className="group relative aspect-video w-full overflow-hidden rounded-t-lg bg-muted">
        <Image
          src={images[0]}
          alt={`${title} preview`}
          fill
          className="object-cover blur-[1px] opacity-90"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {images.length > 1 && (
          <div className="pointer-events-none absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-background/60 px-2 py-0.5 text-xs font-semibold text-foreground/60 backdrop-blur-sm">
            <Images className="h-3 w-3" />
            {images.length}
          </div>
        )}
      </div>
    );
  }

  /* ── Full variant: preview grid → spotlight on click; "Show all" → modal ── */
  const previewImages = images.slice(0, DEFAULT_VISIBLE);
  const gridCols =
    previewImages.length === 1
      ? "grid-cols-1"
      : previewImages.length === 2
        ? "grid-cols-2"
        : "grid-cols-3";

  return (
    <>
      {/* Preview grid */}
      <div className="space-y-3">
        <div className={cn("grid gap-2", gridCols)}>
          {previewImages.map((src, i) => (
            <button
              key={src}
              onClick={() => setSpotlightIndex(i)}
              className="group focusable relative aspect-video overflow-hidden rounded-lg bg-muted"
              aria-label={`View ${title} screenshot ${i + 1} in full`}
            >
              <Image
                src={src}
                alt={`${title} screenshot ${i + 1}`}
                fill
                className="object-cover blur-[2px] opacity-90"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              />
            </button>
          ))}
        </div>

        {images.length > DEFAULT_VISIBLE && (
          <button
            onClick={() => setShowModal(true)}
            className="focusable rounded-md border border-border bg-secondary px-3.5 py-2 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Show all {images.length} images
          </button>
        )}
      </div>

      {/* ── Modal: full image grid — portalled to body to escape FadeIn's transform ── */}
      {mounted &&
        showModal &&
        createPortal(
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} — all screenshots`}
            className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  All screenshots
                </p>
                <p className="mt-0.5 font-semibold">{title}</p>
              </div>
              <button
                ref={modalCloseRef}
                onClick={() => setShowModal(false)}
                className="focusable flex h-11 w-11 items-center justify-center rounded-md border border-border bg-secondary text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Close gallery"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Grid */}
            <div className="overflow-y-auto p-6">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setSpotlightIndex(i)}
                    className="group focusable relative aspect-video overflow-hidden rounded-lg bg-muted"
                    aria-label={`View ${title} screenshot ${i + 1} in spotlight`}
                  >
                    <Image
                      src={src}
                      alt={`${title} screenshot ${i + 1}`}
                      fill
                      className="object-cover blur-[2px] opacity-90"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading={i >= 6 ? "lazy" : undefined}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}

      {/* ── Spotlight — portalled to body to escape FadeIn's transform ── */}
      {mounted &&
        spotlightIndex !== null &&
        createPortal(
          <div
            ref={spotlightRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} screenshot ${(spotlightIndex ?? 0) + 1} of ${images.length}`}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/98 backdrop-blur-md"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSpotlightIndex(null);
            }}
          >
            {/* Close */}
            <button
              ref={spotlightCloseRef}
              onClick={() => setSpotlightIndex(null)}
              className="focusable absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-md border border-border bg-secondary text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="Close spotlight"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Counter */}
            <p className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
              {spotlightIndex + 1} / {images.length}
            </p>

            {/* Image */}
            <div className="relative mx-16 aspect-video w-full max-w-5xl overflow-hidden rounded-xl bg-muted shadow-2xl">
              <Image
                src={images[spotlightIndex]}
                alt={`${title} screenshot ${spotlightIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Prev / Next */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setSpotlightIndex(
                      (spotlightIndex - 1 + images.length) % images.length,
                    )
                  }
                  className="focusable absolute left-4 flex h-11 w-11 items-center justify-center rounded-md border border-border bg-secondary text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() =>
                    setSpotlightIndex((spotlightIndex + 1) % images.length)
                  }
                  className="focusable absolute right-4 flex h-11 w-11 items-center justify-center rounded-md border border-border bg-secondary text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}
