"use client";

import { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASINGS, DURATIONS } from "@/components/animation/AnimatedElements";

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
      className={cn(
        "group",
        hoverScale && "transition-transform duration-150 hover:-translate-y-0.5",
        className,
      )}
      style={{
        animation: `slide-up ${DURATIONS.base}ms ${EASINGS.gentle} ${delay}ms both`,
      }}
    >
      {children}
    </div>
  );
}

const badgeStyles: Record<string, CSSProperties> = {
  default: {
    background: "color-mix(in oklch, var(--primary), transparent 88%)",
    color: "var(--primary)",
  },
  success: {
    background: "color-mix(in oklch, var(--status), transparent 88%)",
    color: "var(--status)",
  },
  warning: {
    background: "color-mix(in oklch, var(--amber-fg), transparent 88%)",
    color: "var(--amber-fg)",
  },
  error: {
    background: "color-mix(in oklch, var(--destructive), transparent 88%)",
    color: "var(--destructive)",
  },
};

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
      )}
      style={badgeStyles[variant]}
    >
      {animate && (
        <span className="inline-block h-2 w-2 rounded-full animate-pulse-gentle" />
      )}
      {children}
    </span>
  );
}

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
        "group relative inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-medium",
        "bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-px",
        className,
      )}
      style={{
        transition: `background-color ${DURATIONS.micro}ms ${EASINGS.snappy}, transform ${DURATIONS.micro}ms ${EASINGS.snappy}`,
      }}
    >
      {children}
    </button>
  );
}

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
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}
