"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import {
  getProjectCaseStudy,
  experiencePhases,
  techGroups,
  projectCaseStudies,
} from "@/data/portfolio";
import { FadeIn } from "@/components/ui/FadeIn";

/* Three featured slugs — one per category for variety */
const FEATURED_SLUGS = [
  "octo-dashboard-cost-report-builder",
  "renthive-mvp-ui",
  "slack-clickup-bug-automation",
];

const featuredProjects = FEATURED_SLUGS
  .map((slug) => getProjectCaseStudy(slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

const CORE_TECH = ["Vue", "React", "TypeScript", "Tailwind CSS", "n8n", "Make", "Pinia", "ECharts"];

const coreStack = techGroups
  .flatMap((g) => g.items)
  .filter((item) => CORE_TECH.includes(item.name));

export function HeroSection() {
  return (
    <section className="site-page">
      <div className="site-container space-y-24">

        {/* ── Hero ── */}
        <FadeIn>
          <div className="grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_18rem] lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-3">
                <span className="status-dot" aria-hidden="true" />
                <p className="eyebrow">Open to opportunities · Frontend · Product · Automation</p>
              </div>

              <h1 className="display-heading">
                Building clear SaaS interfaces and automations that reduce manual work.
              </h1>

              <p className="quiet-text mt-6 max-w-[60ch] text-lg leading-8">
                Frontend developer and product owner at Alphaus. I build cloud cost
                management UIs, automate team workflows, and ship startup MVPs — across
                SaaS, freelance, and internal tools.
              </p>

              <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
                <div className="flex items-baseline gap-2">
                  <dt className="muted-text">Experience</dt>
                  <dd className="font-semibold">3+ years</dd>
                </div>
                <div className="flex items-baseline gap-2">
                  <dt className="muted-text">Projects shipped</dt>
                  <dd className="font-semibold">{projectCaseStudies.length}+</dd>
                </div>
                <div className="flex items-baseline gap-2">
                  <dt className="muted-text">Current role</dt>
                  <dd className="font-semibold">Product Owner · Alphaus</dd>
                </div>
              </dl>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className="focusable inline-flex min-h-11 items-center gap-2 rounded-md border border-primary bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  View my work <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="/assets/resume.pdf"
                  download
                  className="focusable inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Download className="h-4 w-4" strokeWidth={2} />
                  Download resume
                </a>
              </div>
            </div>

            <div className="mx-auto w-full max-w-64 md:max-w-none">
              <div className="panel relative aspect-square overflow-hidden rounded-full p-2">
                <Image
                  src="/assets/profile.jpg"
                  alt="Lord Kelvin Abellana"
                  width={352}
                  height={352}
                  priority
                  className="h-full w-full rounded-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── Featured work ── */}
        <section>
          <FadeIn>
            <div className="mb-6 flex items-end justify-between gap-4">
              <p className="eyebrow">Selected work</p>
              <Link
                href="/projects"
                className="focusable inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-foreground"
              >
                See all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <FadeIn key={project.slug} delay={i * 60} spring>
                <Link
                  href={`/portfolio/projects/${project.slug}`}
                  className="panel panel-hover focusable flex h-full flex-col gap-3 rounded-xl p-5 no-underline"
                >
                  <p className="muted-text text-[11px] font-bold uppercase tracking-widest">
                    {project.category}
                  </p>
                  <h2 className="font-bold leading-snug">{project.title}</h2>
                  <p className="quiet-text flex-1 text-sm leading-6">{project.outcomes[0]}</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                        +{project.stack.length - 3}
                      </span>
                    )}
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Experience + Core stack ── */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <section>
            <FadeIn>
              <p className="eyebrow mb-5">Experience</p>
            </FadeIn>
            <div className="space-y-2">
              {experiencePhases.slice(0, 4).map((phase, i) => (
                <FadeIn key={phase.slug} delay={i * 50} spring>
                  <Link
                    href={`/portfolio/experience/${phase.slug}`}
                    className="panel panel-hover focusable flex items-center justify-between gap-4 rounded-xl px-5 py-4 no-underline"
                  >
                    <div>
                      <p className="text-sm font-semibold">{phase.title}</p>
                      <p className="muted-text mt-0.5 text-xs">{phase.period}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </Link>
                </FadeIn>
              ))}
            </div>
          </section>

          <section>
            <FadeIn>
              <p className="eyebrow mb-5">Core stack</p>
              <div className="panel rounded-xl p-5">
                <div className="flex flex-wrap gap-2">
                  {coreStack.map((tech) => (
                    <div
                      key={tech.name}
                      className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-2.5 py-1.5"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={tech.logo}
                        alt={tech.name}
                        width={14}
                        height={14}
                        className="shrink-0 object-contain"
                        style={{ width: 14, height: 14 }}
                      />
                      <span className="text-xs font-semibold">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </section>
        </div>

        {/* ── Contact CTA ── */}
        <FadeIn>
          <section className="border-t border-border pt-16">
            <p className="eyebrow mb-3">Get in touch</p>
            <h2 className="section-heading max-w-lg">
              Have a project in mind?
            </h2>
            <p className="quiet-text mt-4 max-w-[52ch] text-base leading-7">
              I&apos;m open to frontend engineering roles, automation projects, and
              product-minded work. Let&apos;s talk about what you&apos;re building.
            </p>
            <div className="mt-8">
              <a
                href="mailto:lordkelvinabellana@gmail.com"
                className="focusable inline-flex min-h-11 items-center gap-2 rounded-md border border-primary bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Email Kelvin <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </section>
        </FadeIn>

      </div>
    </section>
  );
}
