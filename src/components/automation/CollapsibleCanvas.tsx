"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Workflow } from "@/data/workflows";
import { cn } from "@/lib/utils";
import { WorkflowCanvas } from "./WorkflowCanvas";

const MAX = 520;

/* Big workflows start folded to a preview height, so the page stays easy to scan. */
export function CollapsibleCanvas({ workflow }: { workflow: Workflow }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [tall, setTall] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setTall(el.scrollHeight > MAX + 80));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const folded = tall && !open;
  return (
    <div className="relative">
      <div ref={innerRef} className={cn("overflow-hidden", folded && "max-h-[520px]")}>
        <WorkflowCanvas workflow={workflow} compact />
      </div>
      {folded && <div aria-hidden="true" className="pointer-events-none absolute inset-x-px bottom-px h-28 rounded-b-xl bg-gradient-to-t from-[var(--surface-elevated)] to-transparent" />}
      {tall && (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className={cn(
            "focusable inline-flex items-center gap-1.5 rounded-full border border-border bg-[var(--surface-elevated)] px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-accent",
            folded ? "absolute bottom-4 left-1/2 -translate-x-1/2" : "mt-3",
          )}
        >
          {open ? "Fold it back" : `Show all ${workflow.nodes.length} nodes`}
          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
        </button>
      )}
    </div>
  );
}
