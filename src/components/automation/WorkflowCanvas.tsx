"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Workflow, WorkflowNode, WorkflowNodeKind } from "@/data/workflows";
import { KIND_COLOR, KIND_LABEL } from "./kinds";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/*
 * A real n8n workflow drawn the way n8n draws it: square nodes, curved
 * connectors, and an execution that runs node by node and turns each one green.
 * The canvas wraps into a snake so every node stays on screen at any width.
 */

function Glyph({ kind, color }: { kind: WorkflowNodeKind; color: string }) {
  const common = { fill: "none", stroke: color, strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (kind) {
    case "trigger":
      return <path d="M13 3 6 13h5l-1 8 7-10h-5l1-8Z" {...common} fill={color} fillOpacity={0.18} />;
    case "code":
      return <path d="M9 6c-2 0-2 1.5-2 3s-1 3-2 3c1 0 2 1.5 2 3s0 3 2 3M15 6c2 0 2 1.5 2 3s1 3 2 3c-1 0-2 1.5-2 3s0 3-2 3" {...common} />;
    case "http":
      return (
        <g {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M4 12h16M12 4c2.5 2.4 2.5 13.6 0 16M12 4c-2.5 2.4-2.5 13.6 0 16" />
        </g>
      );
    case "if":
      return <path d="M5 12h5l4-5h5M10 12l4 5h5M17 5l2 2-2 2M17 15l2 2-2 2" {...common} />;
    case "slack":
      return <path d="M9 4 7 20M17 4l-2 16M4.5 9h15M3.5 15h15" {...common} />;
    case "ads":
      return <path d="M5 19V11M10 19V6M15 19v-5M20 19V9" {...common} />;
    case "form":
      return (
        <g {...common}>
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <path d="M8 9h8M8 13h8M8 17h4" />
        </g>
      );
    case "noop":
      return <path d="M6 12h12" {...common} strokeDasharray="2 3" />;
    case "data":
      return (
        <g {...common}>
          <ellipse cx="12" cy="6.5" rx="6.5" ry="2.5" />
          <path d="M5.5 6.5v11c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-11M5.5 12c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5" />
        </g>
      );
    case "mail":
      return (
        <g {...common}>
          <rect x="4" y="6" width="16" height="12" rx="2" />
          <path d="m5 7.5 7 5.5 7-5.5" />
        </g>
      );
    case "chat":
      return <path d="M5 5.5h14a1 1 0 0 1 1 1v8.5a1 1 0 0 1-1 1h-8l-4 3.5V16H5a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z" {...common} />;
    case "ai":
      // A four-point spark; it spins on its vertical axis while the node runs.
      return (
        <g data-spark>
          <path d="M12 2.5c.8 4.6 2.9 6.7 7.5 7.5-4.6.8-6.7 2.9-7.5 7.5-.8-4.6-2.9-6.7-7.5-7.5 4.6-.8 6.7-2.9 7.5-7.5Z" fill={color} fillOpacity={0.9} />
          <path d="M18.5 16.5c.3 1.6 1 2.3 2.6 2.6-1.6.3-2.3 1-2.6 2.6-.3-1.6-1-2.3-2.6-2.6 1.6-.3 2.3-1 2.6-2.6Z" fill={color} fillOpacity={0.6} />
        </g>
      );
  }
}

function wrapLabel(text: string, max: number) {
  const words = text.split(" ");
  const lines: string[] = [""];
  for (const w of words) {
    const cur = lines[lines.length - 1];
    if ((cur + " " + w).trim().length <= max) lines[lines.length - 1] = (cur + " " + w).trim();
    else lines.push(w);
  }
  if (lines.length > 2) {
    lines[1] = (lines.slice(1).join(" ").slice(0, max - 1) + "…").trim();
    lines.length = 2;
  }
  return lines;
}

type Placed = WorkflowNode & { x: number; y: number; dir: 1 | -1; row: number };

export function WorkflowCanvas({
  workflow,
  compact = false,
  className,
}: {
  workflow: Workflow;
  compact?: boolean;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(960);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const S = compact ? 44 : 52; // node size
  const DX = compact ? 116 : 136; // column pitch
  const LABEL = compact ? 34 : 38;
  const PAD = 28;

  const layout = useMemo(() => {
    const cols = Math.max(...workflow.nodes.map((n) => n.col)) + 1;
    // Balanced rows: as few as fit, then spread evenly across the width.
    const maxPerRow = Math.max(3, Math.min(cols, Math.floor((width - PAD * 2) / DX)));
    const rowCount = Math.ceil(cols / maxPerRow);
    const perRow = Math.ceil(cols / rowCount);
    const dx = Math.min((width - PAD * 2) / perRow, DX * 1.5);
    const laneH = S + LABEL + 14;
    const rows = Math.ceil(cols / perRow);
    // Each row is only as tall as the lanes it actually uses.
    const rowLanes = Array.from({ length: rows }, (_, r) =>
      [...new Set(workflow.nodes.filter((n) => Math.floor(n.col / perRow) === r).map((n) => n.lane))].sort((a, b) => a - b),
    );
    const rowTop: number[] = [];
    let acc = PAD;
    rowLanes.forEach((ls) => {
      rowTop.push(acc);
      acc += ls.length * laneH + 30;
    });
    const usedW = perRow * dx;
    const offsetX = Math.max(PAD, (width - usedW) / 2);
    const placed: Placed[] = workflow.nodes.map((n) => {
      const row = Math.floor(n.col / perRow);
      const i = n.col % perRow;
      const dir: 1 | -1 = row % 2 === 0 ? 1 : -1;
      const xi = dir === 1 ? i : perRow - 1 - i;
      return {
        ...n,
        row,
        dir,
        x: offsetX + xi * dx + dx / 2,
        y: rowTop[row] + rowLanes[row].indexOf(n.lane) * laneH + S / 2,
      };
    });
    const height = acc - 30 + PAD;
    return { placed, height, laneH, dx };
  }, [workflow, width, S, DX, LABEL]);

  const byId = useMemo(() => new Map(layout.placed.map((n) => [n.id, n])), [layout]);

  const edges = useMemo(
    () =>
      workflow.edges.map(([from, to]) => {
        const a = byId.get(from)!;
        const b = byId.get(to)!;
        const ox = a.x + (a.dir * S) / 2;
        const ix = b.x - (b.dir * S) / 2;
        let d: string;
        if (a.row === b.row) {
          const k = Math.max(24, Math.abs(ix - ox) / 2);
          d = `M${ox},${a.y} C${ox + a.dir * k},${a.y} ${ix - b.dir * k},${b.y} ${ix},${b.y}`;
        } else {
          // Row change: a U-turn round the end of the row, like a wrapped canvas.
          const bulge = layout.dx * 0.5 * a.dir;
          d = `M${ox},${a.y} C${ox + bulge},${a.y} ${ix + bulge},${b.y} ${ix},${b.y}`;
        }
        return { id: `${from}-${to}`, from, to, d, skip: a.skip || b.skip };
      }),
    [workflow, byId, S, layout.dx],
  );

  /* Sub-nodes hang off their agent on a dashed line, from below its label. */
  const attachments = useMemo(
    () =>
      layout.placed
        .filter((n) => n.attach && byId.get(n.attach)?.row === n.row)
        .map((n) => {
          const p = byId.get(n.attach!)!;
          const fromY = p.y + S / 2 + LABEL - 4;
          const toY = n.y - S / 2;
          const mid = (fromY + toY) / 2;
          return { id: n.id, parent: p.id, d: `M${p.x},${fromY} C${p.x},${mid} ${n.x},${mid} ${n.x},${toY}` };
        }),
    [layout, byId, S, LABEL],
  );

  /* Execution: nodes run in canvas order; each incoming connector carries a
     packet first. Loops while on screen. */
  useGSAP(
    () => {
      const svg = svgRef.current;
      if (!svg) return;
      const nodeEls = new Map<string, SVGGElement>();
      svg.querySelectorAll<SVGGElement>("[data-node]").forEach((el) => nodeEls.set(el.dataset.node!, el));
      const edgeEls = new Map<string, SVGPathElement>();
      svg.querySelectorAll<SVGPathElement>("[data-edge]").forEach((el) => edgeEls.set(el.dataset.edge!, el));
      const packetEls = new Map<string, SVGCircleElement>();
      svg.querySelectorAll<SVGCircleElement>("[data-packet]").forEach((el) => packetEls.set(el.dataset.packet!, el));

      const setState = (id: string, state: string) => nodeEls.get(id)?.setAttribute("data-state", state);

      if (prefersReducedMotion()) {
        layout.placed.forEach((n) => setState(n.id, n.skip ? "skipped" : "success"));
        edges.forEach((e) => !e.skip && edgeEls.get(e.id)?.setAttribute("data-state", "success"));
        svg.querySelectorAll("[data-attach]").forEach((el) => el.setAttribute("data-state", "success"));
        return;
      }

      const order = [...layout.placed].sort((a, b) => a.col - b.col || a.lane - b.lane);
      const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 2.2 });
      tl.call(() => {
        layout.placed.forEach((n) => setState(n.id, n.skip ? "skipped" : "idle"));
        edges.forEach((e) => edgeEls.get(e.id)?.setAttribute("data-state", "idle"));
        svg.querySelectorAll("[data-attach]").forEach((el) => el.setAttribute("data-state", "idle"));
      });
      const attachedTo = (id: string) => layout.placed.filter((c) => c.attach === id && !c.skip);
      for (const n of order) {
        if (n.skip || n.attach) continue;
        const incoming = edges.filter((e) => e.to === n.id && !e.skip);
        const at = tl.duration();
        incoming.forEach((e) => {
          const path = edgeEls.get(e.id);
          const dot = packetEls.get(e.id);
          if (!path || !dot) return;
          const len = path.getTotalLength();
          const p = { t: 0 };
          tl.set(dot, { autoAlpha: 1 }, at)
            .to(p, {
              t: 1,
              duration: 0.26,
              ease: "power1.inOut",
              onUpdate: () => {
                const pt = path.getPointAtLength(p.t * len);
                dot.setAttribute("cx", String(pt.x));
                dot.setAttribute("cy", String(pt.y));
              },
            }, at)
            .set(dot, { autoAlpha: 0 }, at + 0.26)
            .call(() => path.setAttribute("data-state", "success"), undefined, at + 0.26);
        });
        const start = tl.duration();
        tl.call(() => setState(n.id, "running"), undefined, start);
        const done = start + (n.kind === "ai" ? 0.9 : 0.12);
        if (n.kind === "ai") {
          const spark = nodeEls.get(n.id)?.querySelector("[data-spark]");
          if (spark) tl.fromTo(spark, { scaleX: 1, transformOrigin: "50% 50%" }, { scaleX: -1, duration: 0.45, ease: "power2.inOut", yoyo: true, repeat: 1 }, start);
        }
        // An agent's model, memory and tools work while it runs.
        attachedTo(n.id).forEach((c, k) => {
          tl.call(() => setState(c.id, "running"), undefined, start + 0.1 + k * 0.12);
          tl.call(() => {
            setState(c.id, "success");
            svg.querySelector(`[data-attach="${c.id}"]`)?.setAttribute("data-state", "success");
          }, undefined, done - 0.05);
        });
        tl.call(() => setState(n.id, "success"), undefined, done);
      }

      ScrollTrigger.create({
        trigger: svg,
        start: "top 85%",
        end: "bottom 10%",
        onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
      });
    },
    { scope: wrapRef, dependencies: [layout, edges, attachments], revertOnUpdate: true },
  );

  const fontSize = compact ? 10 : 11;
  const maxChars = compact ? 15 : 18;

  return (
    <div ref={wrapRef} className={cn("workflow-canvas relative w-full overflow-hidden rounded-xl border border-border", className)}>
      <svg
        ref={svgRef}
        width={width}
        height={layout.height}
        viewBox={`0 0 ${width} ${layout.height}`}
        role="img"
        aria-label={`n8n workflow "${workflow.title}" with ${workflow.nodes.length} nodes`}
        className="block"
      >
        <defs>
          <pattern id={`dots-${workflow.id}`} width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" className="workflow-dot" />
          </pattern>
        </defs>
        <rect width={width} height={layout.height} fill={`url(#dots-${workflow.id})`} />

        {edges.map((e) => (
          <path key={e.id} data-edge={e.id} d={e.d} className="workflow-edge" data-state={e.skip ? "skipped" : "idle"} />
        ))}
        {attachments.map((a) => (
          <path key={`a-${a.id}`} data-attach={a.id} d={a.d} className="workflow-attach" data-state="idle" />
        ))}
        {edges.map((e) => (
          <circle key={`p-${e.id}`} data-packet={e.id} r={3.6} className="workflow-packet" style={{ opacity: 0, visibility: "hidden" }} />
        ))}

        {layout.placed.map((n) => {
          const color = KIND_COLOR[n.kind];
          const lines = wrapLabel(n.name, maxChars);
          const r = n.kind === "trigger" ? S / 2 : 10;
          return (
            <g key={n.id} data-node={n.id} data-state={n.skip ? "skipped" : "idle"} className="workflow-node">
              <title>{`${n.name} (${KIND_LABEL[n.kind]})`}</title>
              {n.kind === "trigger" ? (
                <path
                  className="workflow-node-box"
                  d={`M${n.x - S / 2 + r},${n.y - S / 2} H${n.x + S / 2 - 10} Q${n.x + S / 2},${n.y - S / 2} ${n.x + S / 2},${n.y - S / 2 + 10} V${n.y + S / 2 - 10} Q${n.x + S / 2},${n.y + S / 2} ${n.x + S / 2 - 10},${n.y + S / 2} H${n.x - S / 2 + r} A${r},${r} 0 0 1 ${n.x - S / 2 + r},${n.y - S / 2} Z`}
                  transform={n.dir === -1 ? `rotate(180 ${n.x} ${n.y})` : undefined}
                />
              ) : (
                <rect className="workflow-node-box" x={n.x - S / 2} y={n.y - S / 2} width={S} height={S} rx={r} />
              )}
              <svg x={n.x - 12} y={n.y - 12} width={24} height={24} viewBox="0 0 24 24" overflow="visible">
                <Glyph kind={n.kind} color={color} />
              </svg>
              <g className="workflow-check" transform={`translate(${n.x + S / 2 - 4} ${n.y - S / 2 + 4})`}>
                <circle r={7} />
                <path d="M-3 0 -1 2.2 3.2 -2.2" />
              </g>
              <text x={n.x} y={n.y + S / 2 + 15} textAnchor="middle" className="workflow-label" fontSize={fontSize}>
                {lines.map((l, i) => (
                  <tspan key={i} x={n.x} dy={i === 0 ? 0 : fontSize + 3}>
                    {l}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
