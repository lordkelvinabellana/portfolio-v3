import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AUTOMATION_GROUPS, automations, type Automation } from "@/data/automations";
import { FadeIn } from "@/components/ui/FadeIn";
import { ServiceGlyph3D } from "@/components/three/Scenes";
import { CollapsibleCanvas } from "./CollapsibleCanvas";

const GROUP_INTROS: Record<(typeof AUTOMATION_GROUPS)[number], { intro: string; link?: { href: string; label: string } }> = {
  "Client operations for a Google Ads agency": {
    intro:
      "Ten of the workflows that run an agency's client operations across Typeform, ClickUp, Slack, Shopify and Google Ads, built at Penguin Ops. The client stays anonymous.",
    link: { href: "/work/google-ads-agency-operations", label: "Read the case study" },
  },
  "AI agents and assistants": {
    intro: "Agents with memory and tools, from the bot in the corner of this page to a Telegram assistant that runs a calendar and an inbox.",
  },
  "Pipelines, intake and alerts": {
    intro: "Scheduled and event-driven flows with validation, de-duplication and their own error alerts.",
  },
};

function AutomationCard({ automation }: { automation: Automation }) {
  const drawn = automation.nodes.length;
  return (
    <article className="panel space-y-4 rounded-2xl p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <div className="max-w-2xl">
          <h3 className="text-lg font-semibold">{automation.title}</h3>
          <p className="quiet-text mt-1 text-sm leading-6">{automation.caption}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2 text-xs font-medium">
          {automation.live && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[color-mix(in_oklch,var(--status),transparent_85%)] px-2.5 py-1 text-[var(--status)]">
              <span className="status-dot" aria-hidden="true" /> Running
            </span>
          )}
          <span className="rounded-full bg-secondary px-2.5 py-1 text-secondary-foreground">
            {automation.count} nodes{drawn < automation.count ? `, ${drawn} shown` : ""}
          </span>
        </div>
      </div>
      <CollapsibleCanvas workflow={automation} />
      <p className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        <span className="mr-1">Starts on: {automation.trigger}.</span>
        {automation.tools.map((tool) => (
          <span key={tool} className="rounded-full border border-border px-2 py-0.5">
            {tool}
          </span>
        ))}
      </p>
    </article>
  );
}

export function AutomationsSection() {
  const live = automations.filter((a) => a.live).length;
  return (
    <section className="site-page">
      <div className="site-container space-y-16">
        <FadeIn>
          <header className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] md:gap-10">
            <div className="max-w-2xl">
              <h1 className="section-heading">Automations</h1>
              <p className="quiet-text mt-5 text-lg leading-8">
                {`${automations.length} workflows I've built in n8n, drawn from their exports: every node is real, and client names are taken out. ${live} of them are running right now. Each one runs node by node as it scrolls into view.`}
              </p>
            </div>
            <ServiceGlyph3D service="operations" className="h-40 md:h-56" />
          </header>
        </FadeIn>

        {AUTOMATION_GROUPS.map((group) => {
          const items = automations.filter((a) => a.group === group);
          const { intro, link } = GROUP_INTROS[group];
          return (
            <section key={group} aria-labelledby={`group-${items[0]?.id}`} className="space-y-6">
              <FadeIn>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div className="max-w-2xl">
                    <h2 id={`group-${items[0]?.id}`} className="home-heading !text-[clamp(1.6rem,3vw,2.25rem)]">
                      {group}
                    </h2>
                    <p className="quiet-text mt-2 text-base leading-7">{intro}</p>
                  </div>
                  {link && (
                    <Link href={link.href} className="focusable inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-foreground">
                      {link.label} <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </FadeIn>
              <div className="space-y-6">
                {items.map((automation) => (
                  <FadeIn key={automation.id}>
                    <AutomationCard automation={automation} />
                  </FadeIn>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
