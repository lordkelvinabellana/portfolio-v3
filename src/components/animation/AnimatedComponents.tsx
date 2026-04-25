"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASINGS, DURATIONS } from "@/components/animation/AnimatedElements";

/**
 * AnimatedCard - Card with entrance animation and hover effects
 * Emil's principle: Cards should feel responsive and inviting on hover
 */
export function AnimatedCard({
  children,
  className,
  delay = 0,
  hoverScale = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverScale?: boolean;
}) {
  return (
    <div
      className={cn("group", className)}
      style={{
        animation: `slide-up ${DURATIONS.base}ms ${EASINGS.gentle} ${delay}ms both`,
        transition: hoverScale
          ? `transform ${DURATIONS.micro}ms ${EASINGS.snappy}`
          : undefined,
      }}
      onMouseEnter={(e) => {
        if (hoverScale) {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
        }
      }}
      onMouseLeave={(e) => {
        if (hoverScale) {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        }
      }}
    >
      {children}
    </div>
  );
}

/**
 * AnimatedBadge - Badge with pulse animation
 * Emil's principle: Important elements should draw attention subtly
 */
export function AnimatedBadge({
  children,
  variant = "default",
  animate = false,
}: {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "error";
  animate?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
        animate && "animate-pulse-gentle",
        {
          default: "bg-primary/10 text-primary",
          success: "bg-green-500/10 text-green-600",
          warning: "bg-amber-500/10 text-amber-600",
          error: "bg-red-500/10 text-red-600",
        }[variant],
      )}
    >
      {animate && (
        <span className="inline-block h-2 w-2 rounded-full animate-pulse-gentle" />
      )}
      {children}
    </span>
  );
}

/**
 * AnimatedButton - Button with smooth state transitions
 * Emil's principle: Interactive elements should feel responsive
 */
export function AnimatedButton({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-medium transition-all duration-150",
        "bg-primary text-primary-foreground hover:bg-primary/90",
        className,
      )}
      style={{
        transition: `all ${DURATIONS.micro}ms ${EASINGS.snappy}`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      {children}
    </button>
  );
}

/**
 * AnimatedText - Text with staggered character reveal
 * Emil's principle: Choreography of text creates engagement without distraction
 */
export function AnimatedText({
  text,
  className,
  staggerDelay = 30,
}: {
  text: string;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            animation: `fade-in ${DURATIONS.fast}ms ${EASINGS.smooth} ${i * staggerDelay}ms both`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
