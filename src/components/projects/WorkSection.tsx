"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { projectCaseStudies, type ProjectCaseStudy } from "@/data/portfolio";
import { serviceFilters, serviceOf, type ServiceFilter } from "@/data/services";
import { FadeIn } from "@/components/ui/FadeIn";
import { CaseStudyCard } from "./CaseStudyCard";
import { ServiceGlyph3D } from "@/components/three/Scenes";
import { cn } from "@/lib/utils";

const SECTIONS = serviceFilters.filter((f) => f.key !== "all");

const byService = (key: ServiceFilter) =>
  projectCaseStudies
    .filter((p) => key === "all" || serviceOf(p) === key)
    // Featured case studies lead each group; the rest keep their order.
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));

const isFilter = (value: string | null): value is ServiceFilter =>
  serviceFilters.some((f) => f.key === value);

function Grid({ projects, basePath }: { projects: ProjectCaseStudy[]; basePath: string }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        <FadeIn key={project.slug} delay={Math.min(i, 5) * 40} spring>
          <CaseStudyCard project={project} basePath={basePath} />
        </FadeIn>
      ))}
    </div>
  );
}

export function WorkGrid({
  active,
  onChange,
  basePath = "/work",
}: {
  active: ServiceFilter;
  onChange?: (key: ServiceFilter) => void;
  basePath?: string;
}) {
  return (
    <section className="site-container space-y-12">
      <FadeIn>
        <header className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:gap-10">
          <div className="max-w-2xl">
            <h1 className="section-heading">Work</h1>
            <p className="quiet-text mt-5 text-lg leading-8">
              Operations systems, video editing and product work. Each case study covers the problem, what I built and what changed. Clients are kept anonymous.
            </p>
          </div>
          {/* Follows the filter: a workflow, a video screen or a dashboard. */}
          <ServiceGlyph3D service={active} className="h-44 md:h-60" />
        </header>
      </FadeIn>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter work by service">
        {serviceFilters.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            aria-pressed={active === key}
            onClick={() => onChange?.(key)}
            className={cn(
              "focusable inline-flex min-h-10 items-center rounded-full px-4 text-sm font-semibold transition-colors",
              active === key
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {label}
            <span className={cn("ml-2 text-xs", active === key ? "opacity-75" : "text-muted-foreground")}>
              {byService(key).length}
            </span>
          </button>
        ))}
      </div>

      {active === "all" ? (
        <div className="space-y-16">
          {SECTIONS.map(({ key, label }) => {
            const projects = byService(key);
            if (projects.length === 0) return null;
            return (
              <section key={key} aria-label={label}>
                <FadeIn>
                  <h2 className="home-heading mb-6 !text-[clamp(1.6rem,3vw,2.25rem)]">{label}</h2>
                </FadeIn>
                <Grid projects={projects} basePath={basePath} />
              </section>
            );
          })}
        </div>
      ) : (
        <Grid projects={byService(active)} basePath={basePath} />
      )}
    </section>
  );
}

/* Reads ?service= so links from the home page open the right tab. */
export function WorkSection({ basePath = "/work" }: { basePath?: string }) {
  const params = useSearchParams();
  const fromUrl = params.get("service");
  const [picked, setPicked] = useState<ServiceFilter | null>(null);
  const active: ServiceFilter = picked ?? (isFilter(fromUrl) ? fromUrl : "all");

  const change = (key: ServiceFilter) => {
    setPicked(key);
    const url = key === "all" ? window.location.pathname : `${window.location.pathname}?service=${key}`;
    window.history.replaceState(window.history.state, "", url);
  };

  return <WorkGrid active={active} onChange={change} basePath={basePath} />;
}
