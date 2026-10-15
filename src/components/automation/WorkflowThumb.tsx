import type { Workflow } from "@/data/workflows";
import { KIND_COLOR } from "./kinds";

/*
 * A small static map of a workflow for the gallery: the same snake layout as
 * WorkflowCanvas, without labels, folded into as many rows as it takes to
 * suit a 2:1 card. Hovering the card lights the nodes up column by column.
 */

const S = 1; // node size
const DX = 1.8; // column pitch
const LANE = 1.55; // lane pitch
const GAP = 0.85; // between rows
const PAD = 0.9;
const TARGET = 2; // width / height of the thumbnail box

export function WorkflowThumb({ workflow }: { workflow: Workflow }) {
  const cols = Math.max(...workflow.nodes.map((n) => n.col)) + 1;

  const fit = (rows: number) => {
    const perRow = Math.ceil(cols / rows);
    const rowLanes = Array.from({ length: Math.ceil(cols / perRow) }, (_, r) =>
      [...new Set(workflow.nodes.filter((n) => Math.floor(n.col / perRow) === r).map((n) => n.lane))].sort((a, b) => a - b),
    );
    const width = perRow * DX + PAD * 2;
    const height = rowLanes.reduce((h, ls) => h + (ls.length - 1) * LANE + S, 0) + GAP * (rowLanes.length - 1) + PAD * 2;
    return { perRow, rowLanes, width, height };
  };
  // As few rows as keep it close to the box's shape.
  const best = [1, 2, 3, 4, 5]
    .map(fit)
    .reduce((a, b) => (Math.abs(Math.log(b.width / b.height / TARGET)) < Math.abs(Math.log(a.width / a.height / TARGET)) ? b : a));
  const { perRow, rowLanes, width, height } = best;

  const rowTop: number[] = [];
  rowLanes.reduce((top, ls) => {
    rowTop.push(top);
    return top + (ls.length - 1) * LANE + S + GAP;
  }, PAD);

  const placed = new Map(
    workflow.nodes.map((n) => {
      const row = Math.floor(n.col / perRow);
      const i = n.col % perRow;
      const dir = row % 2 === 0 ? 1 : -1;
      const x = PAD + (dir === 1 ? i : perRow - 1 - i) * DX + DX / 2;
      const y = rowTop[row] + rowLanes[row].indexOf(n.lane) * LANE + S / 2;
      return [n.id, { ...n, x, y, row, dir }];
    }),
  );

  const edges = workflow.edges.map(([from, to]) => {
    const a = placed.get(from)!;
    const b = placed.get(to)!;
    const ox = a.x + (a.dir * S) / 2;
    const ix = b.x - (b.dir * S) / 2;
    const k = a.row === b.row ? Math.max(0.35, Math.abs(ix - ox) / 2) : DX * 0.55;
    const d =
      a.row === b.row
        ? `M${ox},${a.y} C${ox + a.dir * k},${a.y} ${ix - b.dir * k},${b.y} ${ix},${b.y}`
        : `M${ox},${a.y} C${ox + a.dir * k},${a.y} ${ix + a.dir * k},${b.y} ${ix},${b.y}`;
    return { id: `${from}-${to}`, d, col: a.col };
  });

  const attachments = [...placed.values()]
    .filter((n) => n.attach && placed.get(n.attach)?.row === n.row)
    .map((n) => {
      const p = placed.get(n.attach!)!;
      return { id: n.id, d: `M${p.x},${p.y + S / 2} L${n.x},${n.y - S / 2}`, col: p.col };
    });

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" className="block h-full w-full" aria-hidden="true">
      {edges.map((e) => (
        <path key={e.id} d={e.d} className="thumb-edge" style={{ "--i": e.col } as React.CSSProperties} />
      ))}
      {attachments.map((a) => (
        <path key={`a-${a.id}`} d={a.d} className="thumb-edge thumb-attach" style={{ "--i": a.col } as React.CSSProperties} />
      ))}
      {[...placed.values()].map((n) => (
        <rect
          key={n.id}
          x={n.x - S / 2}
          y={n.y - S / 2}
          width={S}
          height={S}
          rx={n.kind === "trigger" ? S / 2 : 0.22}
          className="thumb-node"
          data-skip={n.skip || undefined}
          style={{ "--k": KIND_COLOR[n.kind], "--i": n.col } as React.CSSProperties}
        />
      ))}
    </svg>
  );
}
