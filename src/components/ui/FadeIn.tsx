"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

export function FadeIn({
  children,
  delay = 0,
  className,
  spring = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  spring?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Read after mount, never during render: the server can't know the setting, and a
  // style the client renders differently is not patched on hydration, so content
  // stayed invisible for visitors with reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.06 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const duration = spring ? "420ms" : "520ms";

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : spring
          ? "translateY(14px) scale(0.98)"
          : "translateY(12px)",
        // Reduced motion: the global stylesheet cuts every transition to 1ms
        transition: `opacity ${duration} ${EASE_OUT} ${delay}ms, transform ${duration} ${EASE_OUT} ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
