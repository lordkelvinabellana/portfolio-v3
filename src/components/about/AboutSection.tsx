import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

const chapters = [
  {
    period: "2022 – 2023",
    label: "Engineering roots",
    description:
      "Computer Engineering gave me a hardware-first foundation: C, C++, embedded systems, and a thesis that required real reliability — not just a polished demo. I built an IoT emergency messenger using NodeMCU ESP8266 and LoRa for areas without internet access. That project taught me to think in systems, not screens.",
  },
  {
    period: "2022 – Present",
    label: "SaaS and product work",
    description:
      "I moved into frontend development through cloud cost management at Alphaus — building dashboards, reports, alerting, and recommendation UIs with Vue, Vuetify, TypeScript, and ECharts. Over time I moved into product ownership for Ripple and Flow: roadmap planning, backlog refinement, and cross-team delivery. Engineering background helps here — I know what's actually being asked when I write a spec.",
  },
  {
    period: "2022 – Present",
    label: "Automation and internal tools",
    description:
      "Alongside SaaS work, I've built automation systems that turn informal team handoffs into structured workflows — Slack to ClickUp task creation, Zoom recording pipelines, media operations, and Slack bots. Automation work sits at the intersection of product thinking and operations: what does the team actually do, and where does the manual work pile up?",
  },
];

const values = [
  {
    label: "Functional over impressive",
    detail:
      "I'd rather ship something that works well for the team using it than something that photographs well but creates friction.",
  },
  {
    label: "Context before solutions",
    detail:
      "Frontend decisions are better when you understand the business workflow they're part of. I try to stay connected to why something is being built.",
  },
  {
    label: "Reduce the manual work",
    detail:
      "If a team is doing something repetitive and the fix is a small automation, that's worth building. Small improvements compound.",
  },
];

export function AboutSection() {
  return (
    <section className="site-page">
      <div className="site-container space-y-20">

        {/* ── Narrative ── */}
        <FadeIn>
          <div className="grid gap-12 md:grid-cols-[10rem_minmax(0,1fr)]">
            <div className="hidden md:block">
              <div className="panel overflow-hidden rounded-full p-1.5">
                <Image
                  src="/assets/profile.jpg"
                  alt="Lord Kelvin Abellana"
                  width={192}
                  height={192}
                  className="block rounded-full object-cover object-top"
                  style={{ width: 192, height: 192 }}
                />
              </div>
            </div>

            <div>
              <p className="eyebrow mb-3">About</p>
              <h1 className="section-heading mb-8">
                A practical builder shaped by engineering, SaaS, and automation.
              </h1>
              <div className="quiet-text max-w-[68ch] space-y-5 text-base leading-7">
                <p>
                  I&apos;m Lord Kelvin Abellana — a frontend developer and automation
                  builder with a Computer Engineering foundation and product ownership
                  experience at Alphaus. I work best where interfaces, operations, and
                  real business workflows overlap.
                </p>
                <p>
                  My path started with hardware and embedded systems. I spent my thesis
                  building an IoT emergency messenger for areas without internet — a
                  project that needed to actually work, not just pass a demo. That
                  grounding in systems thinking has stayed with me through SaaS frontend
                  work, startup MVPs, freelance websites, and workflow automations.
                </p>
                <p>
                  Today I care about tools that feel considered: clear enough for users,
                  practical enough for teams, and grounded enough to solve actual work
                  instead of just looking polished.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── Three chapters ── */}
        <section>
          <FadeIn>
            <p className="eyebrow mb-8">Three chapters</p>
          </FadeIn>
          <div className="grid gap-5 md:grid-cols-3">
            {chapters.map((chapter, i) => (
              <FadeIn key={chapter.label} delay={i * 80} spring>
                <div className="panel flex h-full flex-col gap-3 rounded-xl p-6">
                  <p className="muted-text text-xs font-semibold">{chapter.period}</p>
                  <h2 className="font-bold leading-snug">{chapter.label}</h2>
                  <p className="quiet-text flex-1 text-sm leading-7">{chapter.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── What I care about ── */}
        <section>
          <FadeIn>
            <p className="eyebrow mb-8">What I care about</p>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <FadeIn key={v.label} delay={i * 60}>
                <div className="panel rounded-xl p-5">
                  <h3 className="font-semibold">{v.label}</h3>
                  <p className="quiet-text mt-2 text-sm leading-6">{v.detail}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Bridge links ── */}
        <FadeIn>
          <div className="border-t border-border pt-10 flex flex-wrap gap-4">
            <Link
              href="/experience"
              className="focusable inline-flex min-h-11 items-center gap-2 rounded-md border border-primary bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              See full experience <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/projects"
              className="focusable inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              View my work <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
