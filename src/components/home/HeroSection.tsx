"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Eye } from "lucide-react";
import {
  getProjectCaseStudy,
  experiencePhases,
  techGroups,
} from "@/data/portfolio";
import { FadeIn } from "@/components/ui/FadeIn";

/* Three featured slugs — one per category for variety */
const FEATURED_SLUGS = [
  "octo-dashboard-cost-report-builder",
  "olj-job-matching-automation",
  "autofit-ai-coaching",
];

const featuredProjects = FEATURED_SLUGS
  .map((slug) => getProjectCaseStudy(slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

const allTechItems = techGroups.flatMap((g) => g.items);
const findTech = (name: string) => allTechItems.find((t) => t.name === name);

const CONTEXTUAL_GROUPS = [
  {
    context: "Production SaaS interfaces",
    techs: ["Vue", "React", "TypeScript"],
  },
  {
    context: "Scalable UI systems",
    techs: ["Tailwind CSS", "Vuetify"],
  },
  {
    context: "Workflow automation",
    techs: ["n8n", "Make", "Zapier"],
  },
  {
    context: "AI-assisted systems",
    techs: ["OpenAI / ChatGPT"],
  },
  {
    context: "UI/UX design",
    techs: ["Figma"],
  },
];

export function HeroSection() {
  return (
    <section className="site-page">
      <div className="site-container space-y-24">

        {/* ── Hero ── */}
        <FadeIn>
          <div className="grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_18rem] lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-3">
                <span className="status-dot animate-pulse-gentle" aria-hidden="true" />
                <p className="eyebrow">Open to opportunities · Frontend · Product · Automation</p>
              </div>

              <h1 className="display-heading">
                I build SaaS interfaces and automation systems that teams actually use
              </h1>

              <p className="quiet-text mt-6 max-w-[60ch] text-lg leading-8">
                I work across frontend, automation, and product systems. Not just building features — improving how teams ship and operate.
              </p>

              <p className="muted-text mt-3 max-w-[58ch] text-sm leading-7">
                Lead Frontend Developer → Product Owner @ Alphaus · Built systems across SaaS, automation, and startup MVPs
              </p>

              <ul className="mt-8 space-y-2 text-sm">
                {[
                  "Owned frontend and product delivery across multiple SaaS products at Alphaus",
                  "Built internal automation adopted company-wide (Slack → ClickUp → n8n)",
                  "Shipped startup MVPs end-to-end with founders (Ardexa)",
                ].map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span className="font-medium">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/work"
                  className="focusable inline-flex min-h-11 items-center gap-2 rounded-md border border-primary bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  View my work <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="/assets/Abellana%2C%20Lord%20Kelvin%20-%20Resume.pdf"
                  download="Abellana, Lord Kelvin - Resume.pdf"
                  className="focusable inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Download className="h-4 w-4" strokeWidth={2} />
                  Download resume
                </a>
                <a
                  href="/assets/Abellana%2C%20Lord%20Kelvin%20-%20Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focusable inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Eye className="h-4 w-4" strokeWidth={2} />
                  View resume
                </a>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <p className="muted-text text-sm">Need more detail?</p>
                <a
                  href="/assets/CV%20-%20Abellana%2C%20Lord%20Kelvin.pdf"
                  download="CV - Abellana, Lord Kelvin.pdf"
                  className="focusable inline-flex min-h-11 items-center gap-1.5 rounded-md border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Download className="h-3.5 w-3.5" strokeWidth={2} /> Download CV
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
                href="/work"
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
                  href={`/work/${project.slug}`}
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
                    href={`/experience/${phase.slug}`}
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
              <div className="panel rounded-xl p-5 space-y-3">
                {CONTEXTUAL_GROUPS.map((group) => (
                  <div key={group.context} className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="muted-text w-40 shrink-0 text-xs">{group.context}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {group.techs.map((name) => {
                        const tech = findTech(name);
                        return (
                          <div
                            key={name}
                            className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-2.5 py-1.5"
                          >
                            {tech && (
                              <Image
                                src={tech.logo}
                                alt=""
                                aria-hidden="true"
                                width={14}
                                height={14}
                                className="shrink-0 object-contain"
                              />
                            )}
                            <span className="text-xs font-semibold">{name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
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
