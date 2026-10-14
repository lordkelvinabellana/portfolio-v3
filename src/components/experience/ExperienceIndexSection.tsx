import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { experiencePhases } from "@/data/portfolio";
import { FadeIn } from "@/components/ui/FadeIn";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { CareerPath3D } from "@/components/three/Scenes";
import { careerRoles } from "./careerRoles";

export function ExperienceIndexSection() {
  return (
    <section className="site-page">
      <div className="site-container space-y-12">

        <Breadcrumb
          items={[
            { label: "Experience", href: "/experience" },
          ]}
        />

        {/* Header */}
        <FadeIn>
          <header className="max-w-2xl">
            <p className="eyebrow mb-3">Career</p>
            <h1 className="section-heading">Experience &amp; journey.</h1>
            <p className="quiet-text mt-5 text-lg leading-8">
              Four years across engineering foundations, SaaS product work, freelance projects,
              startup builds, and automation. Each phase shaped how I approach the next one.
            </p>
          </header>
        </FadeIn>

        {/* The career as a path: oldest on the left, today on the right. */}
        <FadeIn>
          <figure>
            <CareerPath3D roles={careerRoles} className="h-44 sm:h-56 md:h-64" />
            <figcaption className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[var(--teal-fg)]" />Operations &amp; automation</span>
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[var(--coral-fg)]" />Video</span>
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[var(--violet-fg)]" />Product &amp; web</span>
              <span>Glowing: current</span>
            </figcaption>
          </figure>
        </FadeIn>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[7px] top-2 bottom-2 w-px bg-border"
            aria-hidden="true"
          />

          <ol className="space-y-0">
            {experiencePhases.map((phase, i) => (
              <li key={phase.slug} className="relative pl-10">
                <FadeIn delay={i * 60}>
                  {/* Timeline dot */}
                  <span
                    className="absolute left-0 top-[22px] flex h-[15px] w-[15px] items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" />
                  </span>

                  <Link
                    href={`/experience/${phase.slug}`}
                    className="panel panel-hover focusable group mb-4 flex flex-col gap-4 rounded-xl p-5 no-underline sm:flex-row sm:items-start sm:justify-between"
                  >
                    <div className="flex-1 space-y-2 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                          {phase.period}
                        </span>
                      </div>
                      <h2 className="text-base font-bold leading-snug">{phase.title}</h2>
                      <p className="quiet-text text-sm leading-6">{phase.summary}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {phase.technologies.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                        {phase.technologies.length > 5 && (
                          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                            +{phase.technologies.length - 5}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-foreground sm:mt-1 sm:self-start">
                      View phase
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>

      </div>
    </section>
  );
}
