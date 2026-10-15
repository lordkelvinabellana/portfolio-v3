import Link from "next/link";
import { ArrowLeft, ArrowRight, CircleAlert, CircleCheck, ShieldCheck } from "lucide-react";
import { automations, type Automation } from "@/data/automations";
import { automationStories } from "@/data/automationStories";
import { FadeIn } from "@/components/ui/FadeIn";
import { GROUP_INFO, type AutomationGroup } from "./groups";
import { WorkflowCanvas } from "./WorkflowCanvas";

function Neighbour({ automation, dir }: { automation: Automation; dir: "prev" | "next" }) {
  return (
    <Link
      href={`/automations/${automation.id}`}
      className={`panel panel-hover focusable flex flex-col gap-1 rounded-xl p-4 ${dir === "next" ? "sm:items-end sm:text-right" : ""}`}
    >
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
        {dir === "prev" && <ArrowLeft className="h-3.5 w-3.5" />}
        {dir === "prev" ? "Previous" : "Next"}
        {dir === "next" && <ArrowRight className="h-3.5 w-3.5" />}
      </span>
      <span className="font-semibold">{automation.title}</span>
      <span className="quiet-text text-sm leading-6">{automationStories[automation.id]?.short}</span>
    </Link>
  );
}

export function AutomationDetail({ automation }: { automation: Automation }) {
  const story = automationStories[automation.id];
  const group = GROUP_INFO[automation.group as AutomationGroup];
  const index = automations.findIndex((a) => a.id === automation.id);
  const prev = automations[(index - 1 + automations.length) % automations.length];
  const next = automations[(index + 1) % automations.length];
  const drawn = automation.nodes.length;

  return (
    <article className="site-page">
      <div className="site-container space-y-10">
        <FadeIn>
          <Link
            href="/automations"
            className="focusable -ml-2 inline-flex min-h-10 items-center gap-1.5 rounded-md border border-transparent px-2 py-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All automations
          </Link>

          <header className="mt-6 max-w-3xl">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold">
              <span style={{ color: group.color }}>{group.label}</span>
              {automation.live && (
                <span className="inline-flex items-center gap-1.5 text-[var(--status)]">
                  <span className="status-dot" aria-hidden="true" /> Running in production
                </span>
              )}
            </div>
            <h1 className="section-heading mt-3">{automation.title}</h1>
            {story && <p className="quiet-text mt-4 text-lg leading-8">{story.short}</p>}
          </header>
        </FadeIn>

        {/* The two things to take away, side by side. */}
        {story && (
          <FadeIn delay={40}>
            <section aria-label="Problem and fix" className="grid gap-4 md:grid-cols-2">
              <div className="automation-callout rounded-2xl p-6 md:p-7" style={{ "--tone": "var(--coral-fg)" } as React.CSSProperties}>
                <h2 className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--coral-fg)" }}>
                  <CircleAlert className="h-4 w-4" aria-hidden="true" /> The problem
                </h2>
                <p className="mt-3 text-lg font-medium leading-8 md:text-xl md:leading-8">{story.problem}</p>
              </div>
              <div className="automation-callout rounded-2xl p-6 md:p-7" style={{ "--tone": "var(--status)" } as React.CSSProperties}>
                <h2 className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--status)" }}>
                  <CircleCheck className="h-4 w-4" aria-hidden="true" /> What it does now
                </h2>
                <p className="mt-3 text-lg font-medium leading-8 md:text-xl md:leading-8">{story.fix}</p>
              </div>
            </section>
          </FadeIn>
        )}

        <FadeIn delay={60}>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-y border-border py-5 text-sm lg:grid-cols-4 lg:gap-x-8">
            <div>
              <dt className="text-muted-foreground">Starts on</dt>
              <dd className="mt-1 font-semibold">{automation.trigger}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Tools</dt>
              <dd className="mt-1.5 flex flex-wrap gap-1.5">
                {automation.tools.length ? (
                  automation.tools.map((tool) => (
                    <span key={tool} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                      {tool}
                    </span>
                  ))
                ) : (
                  <span className="font-semibold">n8n core nodes</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Size</dt>
              <dd className="mt-1 font-semibold tabular-nums">{automation.count} nodes</dd>
            </div>
            {story?.builtFor && (
              <div>
                <dt className="text-muted-foreground">Built for</dt>
                <dd className="mt-1 font-semibold">
                  {story.builtFor}
                  {group.link && (
                    <Link href={group.link.href} className="focusable mt-1 flex items-center gap-1 font-semibold text-primary hover:text-foreground">
                      {group.link.label} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </dd>
              </div>
            )}
          </dl>
        </FadeIn>

        {story && (
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14">
            <FadeIn>
              <section aria-labelledby="how-it-runs">
                <h2 id="how-it-runs" className="text-xl font-semibold">
                  How it runs
                </h2>
                <ol className="mt-5 space-y-4">
                  {story.steps.map((step, i) => (
                    <li key={step} className="flex gap-4">
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-xs font-semibold tabular-nums"
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <p className="quiet-text pt-0.5 leading-7">{step}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </FadeIn>
            <FadeIn delay={40}>
              <section aria-labelledby="holds-up" className="panel rounded-2xl p-6">
                <h2 id="holds-up" className="text-xl font-semibold">
                  What keeps it reliable
                </h2>
                <ul className="mt-5 space-y-4">
                  {story.safeguards.map((item) => (
                    <li key={item} className="flex gap-3">
                      <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-[var(--status)]" aria-hidden="true" />
                      <p className="quiet-text leading-7">{item}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </FadeIn>
          </div>
        )}

        <FadeIn delay={80}>
          <figure aria-labelledby="the-workflow">
            <h2 id="the-workflow" className="mb-4 text-xl font-semibold">
              The workflow
            </h2>
            <WorkflowCanvas workflow={automation} />
            <figcaption className="muted-text mt-3 text-xs leading-5">
              {`The real workflow, drawn from its n8n export${drawn < automation.count ? ` (${drawn} of its ${automation.count} nodes; an agent's extra sub-nodes are left out)` : ""}. It runs node by node while it's on screen.`}
            </figcaption>
          </figure>
        </FadeIn>

        <nav aria-label="More automations" className="grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
          <Neighbour automation={prev} dir="prev" />
          <Neighbour automation={next} dir="next" />
        </nav>
      </div>
    </article>
  );
}
