import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen, Lightbulb, type LucideIcon } from "lucide-react";
import {
  experiencePhases,
  getRelatedProjects,
  type ExperiencePhase,
} from "@/data/portfolio";
import { FadeIn } from "@/components/ui/FadeIn";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { CareerPath3D } from "@/components/three/Scenes";
import { careerIndex, careerRoles } from "./careerRoles";

/* ── Adjacent phase navigation ── */

function getAdjacentPhases(slug: string) {
  const idx = experiencePhases.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? experiencePhases[idx - 1] : null;
  const next = idx < experiencePhases.length - 1 ? experiencePhases[idx + 1] : null;
  return { prev, next };
}

/* ── Compact related project teaser ── */

function RelatedProjectTeaser({
  slug,
  title,
  outcomes,
  category,
}: {
  slug: string;
  title: string;
  outcomes: string[];
  category: string;
}) {
  return (
    <Link
      href={`/work/${slug}`}
      className="panel panel-hover focusable group flex items-start justify-between gap-4 rounded-xl p-4 no-underline"
    >
      <div className="min-w-0">
        <p className="muted-text text-xs font-bold uppercase tracking-widest">
          {category}
        </p>
        <p className="mt-0.5 font-semibold leading-snug">{title}</p>
        {outcomes[0] && (
          <p className="quiet-text mt-1 text-sm leading-5 line-clamp-2">{outcomes[0]}</p>
        )}
      </div>
      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
    </Link>
  );
}

/* ── Section card primitives ── */

function SectionLabel({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      <p className="eyebrow">{children}</p>
    </div>
  );
}

/* ── Main component ── */

export function ExperienceDetailSection({ phase }: { phase: ExperiencePhase }) {
  const { prev, next } = getAdjacentPhases(phase.slug);
  const relatedProjects = getRelatedProjects(phase.relatedProjectSlugs);

  return (
    <article className="site-page">
      <div className="site-container space-y-12">

        <Breadcrumb
          items={[
            { label: "Experience", href: "/experience" },
            { label: phase.title, href: `/experience/${phase.slug}` },
          ]}
        />

        {/* Header */}
        <FadeIn delay={40}>
          <header className="max-w-3xl">
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {phase.period}
            </span>
            <h1 className="section-heading mt-4">{phase.title}</h1>
            <p className="quiet-text mt-5 text-lg leading-8">{phase.summary}</p>
          </header>
        </FadeIn>

        {/* Where this role sits on the career path. */}
        <FadeIn delay={60}>
          <CareerPath3D key={phase.slug} roles={careerRoles} highlight={careerIndex(phase.slug)} className="h-36 sm:h-44" />
        </FadeIn>

        {/* Content grid */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">

          {/* Main column */}
          <div className="space-y-5">

            {/* Responsibilities */}
            <FadeIn>
              <div className="panel rounded-xl p-6">
                <SectionLabel icon={CheckCircle2}>Responsibilities</SectionLabel>
                <ul className="space-y-3">
                  {phase.responsibilities.map((item) => (
                    <li
                      key={item}
                      className="quiet-text flex items-start gap-3 text-sm leading-6"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Learnings */}
            <FadeIn delay={40}>
              <div className="panel rounded-xl p-6">
                <SectionLabel icon={BookOpen}>Key learnings</SectionLabel>
                <ul className="space-y-3">
                  {phase.learnings.map((item) => (
                    <li
                      key={item}
                      className="quiet-text flex items-start gap-3 text-sm leading-6"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Achievements — accent */}
            <FadeIn delay={80} spring>
              <section
                className="rounded-xl p-6"
                style={{
                  background: "color-mix(in oklch, var(--primary), transparent 90%)",
                  border: "1px solid color-mix(in oklch, var(--primary), transparent 76%)",
                }}
              >
                <div className="mb-4 flex items-center gap-2.5">
                  <Lightbulb
                    className="h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <p className="eyebrow">
                    Achievements
                  </p>
                </div>
                <ul className="space-y-4">
                  {phase.achievements.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-6"
                    >
                      <ArrowRight
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </FadeIn>

          </div>

          {/* Sidebar */}
          <aside>
            <div className="top-6 space-y-4 lg:sticky">

              {/* Tech stack */}
              <FadeIn delay={60}>
                <div className="panel rounded-xl p-5">
                  <p className="eyebrow mb-3">Technologies</p>
                  <div className="flex flex-wrap gap-1.5">
                    {phase.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Related projects */}
              {relatedProjects.length > 0 && (
                <FadeIn delay={100}>
                  <div className="space-y-3">
                    <p className="eyebrow">Related work</p>
                    {relatedProjects.map((project) => (
                      <RelatedProjectTeaser
                        key={project.slug}
                        slug={project.slug}
                        title={project.title}
                        outcomes={project.outcomes}
                        category={project.category}
                      />
                    ))}
                    <Link
                      href="/work"
                      className="focusable quiet-text inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold transition-colors hover:text-foreground"
                    >
                      See all projects <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </FadeIn>
              )}

            </div>
          </aside>
        </div>

        {/* Prev / next navigation */}
        {(prev || next) && (
          <FadeIn>
            <nav
              className="border-t border-border pt-10"
              aria-label="Experience navigation"
            >
              <p className="eyebrow mb-5">More experience</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {prev ? (
                  <Link
                    href={`/experience/${prev.slug}`}
                    className="panel panel-hover focusable flex items-center gap-4 rounded-xl p-4 no-underline"
                  >
                    <ArrowLeft className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      <p className="muted-text text-xs font-semibold">Previous</p>
                      <p className="truncate font-semibold">{prev.title}</p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {next && (
                  <Link
                    href={`/experience/${next.slug}`}
                    className="panel panel-hover focusable flex items-center justify-end gap-4 rounded-xl p-4 no-underline sm:text-right"
                  >
                    <div className="min-w-0">
                      <p className="muted-text text-xs font-semibold">Next</p>
                      <p className="truncate font-semibold">{next.title}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </Link>
                )}
              </div>
            </nav>
          </FadeIn>
        )}

      </div>
    </article>
  );
}
