"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";
import {
  credentials,
  experiencePhases,
  featuredProjectSlugs,
  getProjectCaseStudy,
  projectCaseStudies,
  techGroups,
} from "@/data/portfolio";

const featuredProjects = featuredProjectSlugs
  .map((slug) => getProjectCaseStudy(slug))
  .filter((project): project is NonNullable<typeof project> => Boolean(project));

const capabilityAreas = [
  {
    title: "SaaS frontend",
    summary: "Dashboards, reports, recommendations, alerts, onboarding, and data-heavy product UI.",
  },
  {
    title: "Product ownership",
    summary: "Roadmap planning, backlog refinement, specs, and cross-functional delivery alignment.",
  },
  {
    title: "Workflow automation",
    summary: "Slack, ClickUp, n8n, Make, Zapier, Google Sheets, Zoom, and webhook-based systems.",
  },
  {
    title: "Client websites",
    summary: "Responsive healthcare, travel, landing page, and MVP interfaces built with practical constraints.",
  },
];

export function HeroSection() {
  const coreStack = techGroups
    .flatMap((group) => group.items.map((item) => item.name))
    .filter((name) =>
      ["Vue", "React", "TypeScript", "Tailwind CSS", "n8n", "Make", "ECharts", "Pinia"].includes(name)
    );

  return (
    <section className="site-page">
      <div className="site-container space-y-20">
        <div className="grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_18rem] lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="status-dot" aria-hidden="true" />
              <p className="eyebrow">Frontend · Product · Automation</p>
            </div>

            <h1 className="display-heading">
              Clear SaaS interfaces and automations that reduce manual work.
            </h1>

            <p className="quiet-text mt-6 max-w-[62ch] text-lg leading-8">
              I build product UI, workflow systems, and practical internal tools
              across cloud cost SaaS, freelance websites, startup MVPs, and team
              operations.
            </p>

            <dl className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <div className="flex items-baseline gap-2">
                <dt className="muted-text">Experience</dt>
                <dd className="font-semibold">3+ years</dd>
              </div>
              <div className="flex items-baseline gap-2">
                <dt className="muted-text">Case studies</dt>
                <dd className="font-semibold">{projectCaseStudies.length}</dd>
              </div>
              <div className="flex items-baseline gap-2">
                <dt className="muted-text">Credentials</dt>
                <dd className="font-semibold">{credentials.length}</dd>
              </div>
              <div className="flex items-baseline gap-2">
                <dt className="muted-text">Current</dt>
                <dd className="font-semibold">Product Owner at Alphaus</dd>
              </div>
            </dl>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/portfolio"
                className="focusable inline-flex min-h-11 items-center gap-2 rounded-md border border-primary bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                View portfolio <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="/assets/resume.pdf"
                download
                className="focusable inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Download className="h-4 w-4" strokeWidth={2} />
                Download resume
              </a>
              <a
                href="mailto:lordkelvinabellana@gmail.com"
                className="focusable inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" strokeWidth={2} />
                Email Kelvin
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-72 md:max-w-none">
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

        <section>
          <p className="eyebrow mb-5">Featured proof</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {featuredProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/portfolio/projects/${project.slug}`}
                className="panel panel-hover focusable rounded-xl p-5 no-underline"
              >
                <p className="muted-text text-xs font-semibold">{project.category}</p>
                <h2 className="mt-2 text-lg font-bold leading-6">{project.title}</h2>
                <p className="quiet-text mt-3 text-sm leading-6">{project.overview}</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <p className="eyebrow mb-5">Capability areas</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {capabilityAreas.map((area) => (
              <article key={area.title} className="panel rounded-xl p-5">
                <h2 className="text-lg font-bold">{area.title}</h2>
                <p className="quiet-text mt-3 text-sm leading-6">{area.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <p className="eyebrow mb-5">Experience highlights</p>
            <div className="grid gap-3">
              {experiencePhases.slice(0, 4).map((phase) => (
                <Link
                  key={phase.slug}
                  href={`/portfolio/experience/${phase.slug}`}
                  className="panel panel-hover focusable flex items-center justify-between gap-4 rounded-xl p-4 no-underline"
                >
                  <div>
                    <h2 className="font-bold">{phase.title}</h2>
                    <p className="muted-text mt-1 text-sm">{phase.period}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow mb-5">Core stack</p>
            <div className="panel rounded-xl p-5">
              <div className="flex flex-wrap gap-2">
                {coreStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-accent px-3 py-1.5 text-sm font-semibold text-accent-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <p className="eyebrow mb-5 mt-8">Credentials snapshot</p>
            <div className="panel rounded-xl p-5">
              {credentials.slice(0, 3).map((credential) => (
                <Link
                  key={credential.slug}
                  href="/portfolio/credentials"
                  className="focusable block rounded-md py-2 no-underline"
                >
                  <p className="font-semibold">{credential.title}</p>
                  <p className="muted-text text-sm">{credential.issuer}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
