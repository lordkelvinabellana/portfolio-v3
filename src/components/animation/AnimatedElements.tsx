"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Easing functions following Emil's principles: smooth, purposeful, not generic
const EASINGS = {
  // Smooth entry/exit - cubic-bezier for natural, elegant feel
  smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  // Snappy response - for micro-interactions and instant feedback
  snappy: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  // Gentle ease out - for large content reveals
  gentle: "cubic-bezier(0.16, 1, 0.3, 1)",
  // Elastic spring-like - for delightful moments
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
};

// Duration tiers: intentional, not arbitrary
const DURATIONS = {
  micro: 150, // Hover, focus states
  fast: 300, // Small UI changes
  base: 500, // Standard reveals
  slow: 700, // Large content reveals
};

/**
 * FadeIn with variants - entrance animations based on content type
 * Follows Emil's principle: purposeful motion that guides attention
 */
export function FadeIn({
  children,
  delay = 0,
  className,
  variant = "fade-up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?:
    | "fade-up"
    | "fade-down"
    | "fade-left"
    | "fade-right"
    | "scale"
    | "zoom";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.06 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (visible) return "translate(0, 0) scale(1)";
    switch (variant) {
      case "fade-up":
        return "translate(0, 12px) scale(1)";
      case "fade-down":
        return "translate(0, -12px) scale(1)";
      case "fade-left":
        return "translate(12px, 0) scale(1)";
      case "fade-right":
        return "translate(-12px, 0) scale(1)";
      case "scale":
        return "translate(0, 0) scale(0.95)";
      case "zoom":
        return "translate(0, 0) scale(0.9)";
      default:
        return "translate(0, 12px) scale(1)";
    }
  };

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${DURATIONS.base}ms ${EASINGS.gentle} ${delay}ms, transform ${DURATIONS.base}ms ${EASINGS.gentle} ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * SlideIn - directional entrance with momentum
 * Emil's principle: Motion should feel intentional, never random
 */
export function SlideIn({
  children,
  delay = 0,
  className,
  direction = "left",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (visible) return "translate(0, 0)";
    switch (direction) {
      case "left":
        return "translate(-24px, 0)";
      case "right":
        return "translate(24px, 0)";
      case "up":
        return "translate(0, -24px)";
      case "down":
        return "translate(0, 24px)";
      default:
        return "translate(-24px, 0)";
    }
  };

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${DURATIONS.base}ms ${EASINGS.smooth} ${delay}ms, transform ${DURATIONS.base}ms ${EASINGS.smooth} ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Stagger - animate multiple children with cascading delays
 * Emil's principle: Choreography creates visual hierarchy and reduces cognitive load
 */
export function Stagger({
  children,
  staggerDelay = 50,
  className,
}: {
  children: ReactNode[];
  staggerDelay?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {Array.isArray(children) &&
        children.map((child, index) => (
          <FadeIn key={index} delay={index * staggerDelay}>
            {child}
          </FadeIn>
        ))}
    </div>
  );
}

/**
 * Pulse - gentle attention-drawing animation
 * Emil's principle: Animate only what matters; otherwise distract
 */
export function withPulse(element: ReactNode, className?: string) {
  return (
    <div
      className={cn(className)}
      style={{
        animation: `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
      }}
    >
      {element}
    </div>
  );
}

/**
 * Hover scale - subtle scale on hover for interactive feedback
 * Emil's principle: Micro-interactions should feel responsive and alive
 */
export const withHoverScale = (scale = 1.05, duration = DURATIONS.micro) => ({
  style: {
    transition: `transform ${duration}ms ${EASINGS.snappy}`,
  },
  onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.transform = `scale(${scale})`;
  },
  onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
  },
});

/**
 * Export easing and duration constants for use in custom animations
 */
export { EASINGS, DURATIONS };
