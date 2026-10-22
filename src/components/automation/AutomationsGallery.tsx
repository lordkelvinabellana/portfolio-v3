"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AUTOMATION_GROUPS, automations } from "@/data/automations";
import { automationStories } from "@/data/automationStories";
import { cn } from "@/lib/utils";
import { GROUP_INFO, type AutomationGroup } from "./groups";
import { WorkflowThumb } from "./WorkflowThumb";

/* As many tool chips as fit on one line of a card, then "+n". */
function fitTools(tools: string[], budget = 27) {
  const shown: string[] = [];
  let used = 0;
  for (const tool of tools) {
    if (shown.length && used + tool.length > budget) break;
    shown.push(tool);
    used += tool.length + 3;
  }
  return shown;
}

export function AutomationsGallery() {
  const [group, setGroup] = useState<AutomationGroup | "all">("all");
  const shown = group === "all" ? automations : automations.filter((a) => a.group === group);
  const info = group === "all" ? null : GROUP_INFO[group];

  const filters: { key: AutomationGroup | "all"; label: string; count: number }[] = [
    { key: "all", label: "All", count: automations.length },
    ...AUTOMATION_GROUPS.map((g) => ({ key: g, label: GROUP_INFO[g].label, count: automations.filter((a) => a.group === g).length })),
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div role="group" aria-label="Filter automations" className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              aria-pressed={group === f.key}
              onClick={() => setGroup(f.key)}
              className={cn(
                "focusable inline-flex min-h-10 items-center gap-2 rounded-full border px-3.5 text-sm font-semibold transition-colors",
                group === f.key
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-[var(--surface-elevated)] text-foreground hover:bg-accent",
              )}
            >
              {f.label}
              <span className={cn("tabular-nums text-xs", group === f.key ? "opacity-70" : "text-muted-foreground")}>{f.count}</span>
            </button>
          ))}
        </div>
        {info && (
          <p className="quiet-text max-w-3xl text-sm leading-6">
            {info.intro}{" "}
            {info.link && (
              <Link href={info.link.href} className="focusable inline-flex items-center gap-1 font-semibold text-primary hover:text-foreground">
                {info.link.label} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </p>
        )}
      </div>

      {/* Re-keyed per filter so the cards deal back in. */}
      <ul key={group} className="automation-grid grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {shown.map((a, i) => {
          const story = automationStories[a.id];
          const g = GROUP_INFO[a.group as AutomationGroup];
          const tools = fitTools(a.tools);
          const extra = a.tools.length - tools.length;
          return (
            <li key={a.id} style={{ "--n": i } as React.CSSProperties}>
              <Link
                href={`/automations/${a.id}`}
                className="automation-card panel panel-hover focusable flex h-full overflow-hidden rounded-2xl sm:flex-col"
              >
                <div className="automation-thumb relative w-28 shrink-0 border-r border-border p-2 sm:aspect-[2/1] sm:w-auto sm:border-r-0 sm:border-b sm:px-3 sm:py-2">
                  <WorkflowThumb workflow={a} />
                  {a.live && (
                    <span className="absolute right-1.5 top-1.5 inline-flex items-center gap-1.5 rounded-full border border-border bg-[var(--surface-elevated)] p-1 text-xs font-semibold text-[var(--status)] sm:right-2 sm:top-2 sm:px-2 sm:py-0.5">
                      <span className="status-dot" aria-hidden="true" /> <span className="max-sm:sr-only">Running</span>
                    </span>
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
                  <div className="flex items-center justify-between gap-2 text-xs font-semibold">
                    <span style={{ color: g.color }}>{g.label}</span>
                    <span className="font-medium tabular-nums text-muted-foreground">{a.count} nodes</span>
                  </div>
                  <h3 className="mt-1 text-[15px] font-semibold leading-snug sm:mt-2 sm:text-base">{a.title}</h3>
                  <p className="quiet-text mt-1 text-[13px] leading-5 sm:text-sm sm:leading-6">{story?.short ?? a.caption}</p>
                  <div className="mt-auto hidden flex-wrap items-center gap-1.5 pt-4 text-xs text-muted-foreground sm:flex">
                    {tools.map((tool) => (
                      <span key={tool} className="rounded-full border border-border px-2 py-0.5">
                        {tool}
                      </span>
                    ))}
                    {extra > 0 && <span className="px-1">+{extra}</span>}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
