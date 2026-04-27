"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projectCaseStudies, type ProjectCaseStudy } from "@/data/portfolio";
import { FadeIn } from "@/components/ui/FadeIn";
import { ImageCarousel } from "./ImageCarousel";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { cn } from "@/lib/utils";

/* ── Data ── */

const CATEGORIES = [
  "All",
  "SaaS/Product",
  "Freelance",
  "Startup",
  "Automation",
  "Personal",
] as const;

const countByCategory = (cat: string) =>
  projectCaseStudies.filter((p) => p.category === cat).length;

/* ── Cards ── */

function FeaturedProjectCard({ project }: { project: ProjectCaseStudy }) {
  return (
    <article className="panel flex h-full flex-col overflow-hidden rounded-xl">
      {project.screenshots.length > 0 ? (
        <ImageCarousel images={project.screenshots} title={project.title} />
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
        <Link
          href={`/portfolio/projects/${project.slug}`}
          className="focusable inline-flex min-h-10 w-fit items-center gap-1.5 rounded-md border border-transparent text-sm font-semibold text-primary transition-colors hover:text-foreground"
        >
          Read case study <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}

function CompactProjectCard({ project }: { project: ProjectCaseStudy }) {
  return (
    <Link
      href={`/portfolio/projects/${project.slug}`}
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
    </Link>
  );
}

/* ── Page ── */

export function WorkSection() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filtered =
    activeFilter === "All"
      ? projectCaseStudies
      : projectCaseStudies.filter((p) => p.category === activeFilter);

  const featured = activeFilter === "All" ? filtered.filter((p) => p.featured) : [];
  const rest = activeFilter === "All" ? filtered.filter((p) => !p.featured) : filtered;

  return (
    <section className="site-page">
      <div className="site-container space-y-12">

        <Breadcrumb
          items={[
            { label: "Portfolio", href: "/portfolio" },
            { label: "Projects", href: "/portfolio/projects" },
          ]}
        />

        {/* Header */}
        <FadeIn>
          <header className="max-w-2xl">
            <p className="eyebrow mb-3">Work</p>
            <h1 className="section-heading">Projects &amp; case studies.</h1>
            <p className="quiet-text mt-5 text-lg leading-8">
              Work organized by context. Each project has a dedicated case study with
              the business problem, my contributions, and concrete outcomes.
            </p>
          </header>
        </FadeIn>

        {/* Filter */}
        <FadeIn delay={60}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={cn(
                  "focusable rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors",
                  activeFilter === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                {cat}
                {cat !== "All" && (
                  <span
                    className={cn(
                      "ml-1.5 text-xs",
                      activeFilter === cat ? "opacity-70" : "text-muted-foreground",
                    )}
                  >
                    {countByCategory(cat)}
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
              <p className="eyebrow mb-5">Featured</p>
            </FadeIn>
            <div className="grid gap-5 md:grid-cols-2">
              {featured.map((project, i) => (
                <FadeIn key={project.slug} delay={i * 60} spring>
                  <FeaturedProjectCard project={project} />
                </FadeIn>
              ))}
            </div>
          </section>
        )}

        {/* All / filtered */}
        {rest.length > 0 && (
          <section aria-label={activeFilter === "All" ? "All projects" : `${activeFilter} projects`}>
            {featured.length > 0 && (
              <FadeIn>
                <p className="eyebrow mb-5">All work</p>
              </FadeIn>
            )}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((project, i) => (
                <FadeIn key={project.slug} delay={i * 40}>
                  <CompactProjectCard project={project} />
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
