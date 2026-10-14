import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { AboutPortrait } from "./AboutPortrait";

const chapters = [
  {
    period: "2026 – Present",
    label: "Operations systems and video",
    description:
      "As Ops & Automation Assistant at Penguin Ops and Systems Implementation Associate at Stakra, I build the systems agencies and small businesses run on: a client portal for a talent agency, a weekly scorecard rebuilt from source data, 38-node client onboarding from one form, and a salon operations app. Alongside that I edit VSLs, short-form ads and testimonials, with a brand system that keeps every piece consistent.",
  },
  {
    period: "Jul 2023 – Dec 2025",
    label: "From engineer to product owner",
    description:
      "At Alphaus I progressed from Junior Frontend Developer to Lead to Product Owner in under two years. As Lead I owned frontend quality, release coordination, and PR standards for Octo. As Product Owner I ran sprint planning, backlog refinement, and UI/UX design for Ripple and four connected products, stepping into design ownership when delivery depended on it.",
  },
  {
    period: "Oct 2025 – Apr 2026",
    label: "Startup and full-stack work",
    description:
      "At Ardexa I was the only frontend developer alongside two founders and one backend developer, building MVPs from scratch. I worked across frontend, backend, product decisions, and architecture planning, often in the same week. Products included RentWise (rental qualification with scoring logic), LexaDraft (contract template builder), and TicketDesk (centralized support triage).",
  },
  {
    period: "2023 – Present",
    label: "Automation and systems",
    description:
      "I've built automation systems that remove real manual overhead: a Slack-to-ClickUp bug reporting workflow that became the company standard at Alphaus, an AI-powered weekly coaching delivery system with approval flows, and a job-matching pipeline with LLM scoring and smart email notifications. The goal is always the same: reduce the repetitive work.",
  },
];

const values = [
  {
    label: "Systems over features",
    detail:
      "Good software improves how something works, not just how it looks. I try to understand the workflow before touching the interface.",
  },
  {
    label: "Ownership over handoffs",
    detail:
      "When delivery was blocked at Alphaus, I stepped into UI/UX design. When bug reporting was frustrating the team, I built the automation. The missing role is worth filling.",
  },
  {
    label: "Practical over clever",
    detail:
      "Maintainable systems built for real workflows are more useful than sophisticated ones that only the original author understands.",
  },
];

export function AboutSection() {
  return (
    <section className="site-page">
      <div className="site-container space-y-20">

        {/* ── Narrative ── */}
        <FadeIn>
          <div className="grid gap-12 md:grid-cols-[13rem_minmax(0,1fr)]">
            <div className="pt-2">
              <AboutPortrait />
            </div>

            <div>
              <p className="eyebrow mb-3">About</p>
              <h1 className="section-heading mb-8">
                I build systems that teams run on, and videos that sell what they do.
              </h1>
              <div className="quiet-text max-w-[68ch] space-y-5 text-base leading-7">
                <p>
                  I&apos;m Lord Kelvin Abellana: operations and automation builder, video
                  editor, and former lead frontend developer and product owner. I work best
                  where real operations meet software: agencies running on spreadsheets,
                  brands that need every video to look like them, and teams where removing
                  manual work creates actual value.
                </p>
                <p>
                  At Alphaus I grew from Junior Frontend Developer to Lead to Product
                  Owner across cloud cost management products. That progression taught me
                  to think beyond code, into delivery ownership, product decisions, and
                  the kind of internal tooling that quietly makes a team faster. The
                  Slack-to-ClickUp reporting system I built became the company standard.
                  Stepping into UI/UX design when our designer was blocked kept delivery
                  moving. These weren&apos;t assigned responsibilities. They were gaps
                  worth filling.
                </p>
                <p>
                  I care less about impressive implementations and more about systems that
                  reduce friction and actually get used.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── Three chapters ── */}
        <section>
          <FadeIn>
            <p className="eyebrow mb-8">Career in four chapters</p>
          </FadeIn>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
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
              href="/work"
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
