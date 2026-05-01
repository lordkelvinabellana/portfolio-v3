"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { projectCaseStudies, type ProjectCaseStudy } from "@/data/portfolio";
import { FadeIn } from "@/components/ui/FadeIn";
import { ImageGallery } from "./ImageGallery";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { cn } from "@/lib/utils";

/* ── Data ── */

const FILTERS = [
  { label: "All", value: "All" },
  { label: "Product", value: "Product" },
  { label: "Automation", value: "Automation" },
  { label: "Client Work", value: "Client Work" },
  { label: "Startup", value: "Startup" },
] as const;

type FilterValue = (typeof FILTERS)[number]["value"];

const countByFilter = (value: string) =>
  projectCaseStudies.filter((p) => p.category === value).length;

const GROUP_ORDER = ["Automation", "Product", "Client Work"] as const;

/* ── Cards ── */

function FeaturedProjectCard({ project, basePath }: { project: ProjectCaseStudy; basePath: string }) {
  return (
    <Link
      href={`${basePath}/${project.slug}`}
      className="panel panel-hover focusable flex h-full flex-col overflow-hidden rounded-xl no-underline"
    >
      {project.screenshots.length > 0 ? (
        <ImageGallery images={project.screenshots} title={project.title} variant="card" />
      ) : (
        <div className="flex aspect-video w-full items-center justify-center bg-secondary">
          <span className="muted-text text-[11px] font-bold uppercase tracking-widest">
            Case study
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <p className="muted-text text-[11px] font-bold uppercase tracking-widest">
            {project.category}
          </p>
          <h2 className="mt-1.5 text-lg font-bold leading-tight">{project.title}</h2>
          <p className="muted-text mt-0.5 text-sm font-medium">{project.role}</p>
        </div>
        <p className="quiet-text flex-1 text-sm leading-6">{project.outcomes[0]}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
              +{project.stack.length - 4}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            Read case study <ArrowRight className="h-3.5 w-3.5" />
          </span>
          {project.demoUrl && project.liveLabel && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="focusable inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {project.liveLabel} <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
        {project.liveLabel === "View MVP" && (
          <p className="text-[10px] font-medium text-muted-foreground/60">MVP / early-stage build</p>
        )}
      </div>
    </Link>
  );
}

function CompactProjectCard({ project, basePath }: { project: ProjectCaseStudy; basePath: string }) {
  return (
    <Link
      href={`${basePath}/${project.slug}`}
      className="panel panel-hover focusable flex h-full flex-col gap-4 rounded-xl p-5 no-underline"
    >
      <div>
        <p className="muted-text text-[11px] font-bold uppercase tracking-widest">
          {project.category}
        </p>
        <h2 className="mt-1.5 font-bold leading-snug">{project.title}</h2>
      </div>
      <p className="quiet-text flex-1 text-sm leading-6">{project.outcomes[0]}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground"
          >
            {tech}
          </span>
        ))}
        {project.stack.length > 3 && (
          <span className="muted-text rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">
            +{project.stack.length - 3}
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary/70">
          Read case study <ArrowRight className="h-3 w-3" />
        </span>
        {project.demoUrl && project.liveLabel && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="focusable inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[10px] font-semibold text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {project.liveLabel} <ExternalLink className="h-2.5 w-2.5" />
          </a>
        )}
      </div>
      {project.liveLabel === "View MVP" && (
        <p className="text-[10px] font-medium text-muted-foreground/60">MVP / early-stage build</p>
      )}
    </Link>
  );
}

/* ── Page ── */

interface WorkSectionProps {
  basePath?: string;
  showBreadcrumb?: boolean;
}

export function WorkSection({ basePath = "/work", showBreadcrumb = true }: WorkSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("All");

  const filtered =
    activeFilter === "All"
      ? projectCaseStudies
      : projectCaseStudies.filter((p) => p.category === activeFilter);

  const featured = activeFilter === "All" ? filtered.filter((p) => p.featured) : [];
  const rest = activeFilter === "All" ? filtered.filter((p) => !p.featured) : filtered;

  const grouped =
    activeFilter === "All"
      ? GROUP_ORDER.map((group) => ({
          label: group === "Product" ? "Product / SaaS" : group,
          projects: rest.filter((p) => p.category === group),
        })).filter((g) => g.projects.length > 0)
      : null;

  return (
    <section className="site-page">
      <div className="site-container space-y-12">

        {showBreadcrumb && (
          <Breadcrumb
            items={[
              { label: "Work", href: "/work" },
            ]}
          />
        )}

        {/* Header */}
        <FadeIn>
          <header className="max-w-2xl">
            <p className="eyebrow mb-3">Work</p>
            <h1 className="section-heading">Projects &amp; case studies.</h1>
            <p className="quiet-text mt-5 text-lg leading-8">
              SaaS products, automation systems, and startup MVPs. Each case study shows the problem, the decisions behind it, and what changed.
            </p>
          </header>
        </FadeIn>

        {/* Filter */}
        <FadeIn delay={60}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
            {FILTERS.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setActiveFilter(value)}
                className={cn(
                  "focusable rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors",
                  activeFilter === value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                {label}
                {value !== "All" && (
                  <span
                    className={cn(
                      "ml-1.5 text-xs",
                      activeFilter === value ? "opacity-70" : "text-muted-foreground",
                    )}
                  >
                    {countByFilter(value)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Featured (All view only) */}
        {featured.length > 0 && (
          <section aria-label="Featured projects">
            <FadeIn>
              <p className="eyebrow mb-5">Case studies</p>
            </FadeIn>
            <div className="grid gap-5 md:grid-cols-2">
              {featured.map((project, i) => (
                <FadeIn key={project.slug} delay={i * 60} spring>
                  <FeaturedProjectCard project={project} basePath={basePath} />
                </FadeIn>
              ))}
            </div>
          </section>
        )}

        {/* All view — grouped */}
        {grouped && grouped.length > 0 && (
          <section aria-label="All projects">
            <FadeIn>
              <p className="eyebrow mb-5">All work</p>
            </FadeIn>
            <div className="space-y-10">
              {grouped.map((group) => (
                <div key={group.label}>
                  <FadeIn>
                    <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      {group.label}
                    </p>
                  </FadeIn>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {group.projects.map((project, i) => (
                      <FadeIn key={project.slug} delay={i * 40}>
                        <CompactProjectCard project={project} basePath={basePath} />
                      </FadeIn>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Filtered view — flat */}
        {!grouped && rest.length > 0 && (
          <section aria-label={`${activeFilter} projects`}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((project, i) => (
                <FadeIn key={project.slug} delay={i * 40}>
                  <CompactProjectCard project={project} basePath={basePath} />
                </FadeIn>
              ))}
            </div>
          </section>
        )}

        {filtered.length === 0 && (
          <p className="muted-text py-12 text-center text-sm">
            No projects in this category yet.
          </p>
        )}

      </div>
    </section>
  );
}
