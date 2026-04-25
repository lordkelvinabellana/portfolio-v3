import { Experience } from "@/data/portfolio";
import { ExternalLink } from "lucide-react";

const roleStyles: Record<string, { bg: string; text: string; dot: string; label: string }> = {
  violet: { bg: "color-mix(in oklch, var(--primary), transparent 84%)", text: "var(--primary)", dot: "var(--primary)", label: "Product" },
  purple: { bg: "color-mix(in oklch, var(--primary), transparent 84%)", text: "var(--primary)", dot: "var(--primary)", label: "Product" },
  blue: { bg: "color-mix(in oklch, var(--primary), transparent 88%)", text: "var(--primary)", dot: "var(--primary)", label: "Dev" },
  sky: { bg: "color-mix(in oklch, var(--primary), transparent 88%)", text: "var(--primary)", dot: "var(--primary)", label: "Dev" },
  green: { bg: "color-mix(in oklch, var(--status), transparent 84%)", text: "var(--status)", dot: "var(--status)", label: "Automation" },
  slate: { bg: "var(--surface-3)", text: "var(--text-secondary)", dot: "var(--text-tertiary)", label: "Academic" },
};

export function ExperienceCard({ item, isLast }: { item: Experience; isLast?: boolean }) {
  const role = roleStyles[item.color] ?? roleStyles.slate;
  const isCurrent = item.duration === "Present";

  return (
    <div className="relative pl-10 pb-8 last:pb-0">
      {/* Timeline stem */}
      {!isLast && (
        <div
          className="absolute top-3 bottom-0 w-px"
          style={{ left: 6, background: "var(--border)" }}
        />
      )}
      <div
        className="absolute rounded-full"
        style={{
          left: 0,
          top: 10,
          width: 13,
          height: 13,
          backgroundColor: role.dot,
          border: "2px solid var(--background)",
          boxShadow: "0 0 0 1px var(--border)",
        }}
      />

      <div className="panel panel-hover rounded-xl p-5">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 mb-2">
          <h2 className="text-base font-bold leading-6">
            {item.position}
          </h2>

          <div className="flex items-center gap-2 shrink-0">
            <span
              className="rounded-full"
              style={{
                background: role.bg,
                color: role.text,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.125px",
                padding: "3px 8px",
              }}
            >
              {role.label}
            </span>

            {/* Active / duration */}
            {isCurrent ? (
              <span
                className="inline-flex items-center gap-1.5 rounded-full"
                style={{
                  background: "color-mix(in oklch, var(--status), transparent 84%)",
                  color: "var(--status)",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.125px",
                  padding: "3px 8px",
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: "var(--status)" }}
                />
                Active
              </span>
            ) : (
              <span className="muted-text text-[13px] font-medium">
                {item.duration}
              </span>
            )}
          </div>
        </div>

        <p className="quiet-text mb-3 text-sm font-medium">
          {item.company}
        </p>

        <p className="quiet-text max-w-[65ch] text-[15px] leading-6">
          {item.description}
        </p>

        {item.cta && item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="focusable mt-4 inline-flex min-h-10 items-center gap-1 rounded-md border border-transparent text-sm font-medium text-primary transition-colors hover:text-foreground"
          >
            {item.cta}
            <ExternalLink className="h-3 w-3" strokeWidth={2} />
          </a>
        )}
      </div>
    </div>
  );
}
