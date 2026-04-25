import Link from "next/link";
import { ArrowLeft, ArrowRight, Code2, ExternalLink } from "lucide-react";
import { projectCaseStudies, type ProjectCaseStudy } from "@/data/portfolio";
import { FadeIn } from "@/components/ui/FadeIn";
import { ImageCarousel } from "./ImageCarousel";

/* ── Adjacent project navigation ── */

function getAdjacentProjects(slug: string) {
  const idx = projectCaseStudies.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? projectCaseStudies[idx - 1] : null;
  const next = idx < projectCaseStudies.length - 1 ? projectCaseStudies[idx + 1] : null;
  return { prev, next };
}

/* ── Section primitives ── */

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="panel rounded-xl p-6">{children}</div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow mb-3">{children}</p>;
}

/* ── Main component ── */

export function ProjectDetailSection({ project }: { project: ProjectCaseStudy }) {
  const { prev, next } = getAdjacentProjects(project.slug);
  const hasChallenges = project.challenges.length > 0;

  return (
    <article className="site-page">
      <div className="site-container space-y-12">

        {/* Back */}
        <FadeIn>
          <Link
            href="/portfolio/projects"
            className="focusable inline-flex min-h-10 items-center gap-1.5 rounded-md border border-transparent px-2 py-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to work
          </Link>
        </FadeIn>

        {/* Header */}
        <FadeIn delay={40}>
          <header className="max-w-3xl">
            <p className="eyebrow mb-3">{project.category}</p>
            <h1 className="section-heading">{project.title}</h1>
            <p className="quiet-text mt-5 text-lg leading-8">{project.overview}</p>
          </header>
        </FadeIn>

        {/* Screenshots */}
        {project.screenshots.length > 0 && (
          <FadeIn delay={80} spring>
            <div className="panel overflow-hidden rounded-2xl">
              <ImageCarousel images={project.screenshots} title={project.title} />
            </div>
          </FadeIn>
        )}

        {/* Content + sidebar */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_21rem]">

          {/* Main column */}
          <div className="space-y-5">

            {/* Business problem */}
            <FadeIn>
              <SectionCard>
                <SectionLabel>The problem</SectionLabel>
                <p className="quiet-text leading-7">{project.businessProblem}</p>
              </SectionCard>
            </FadeIn>

            {/* Contributions */}
            <FadeIn delay={40}>
              <SectionCard>
                <SectionLabel>What I built</SectionLabel>
                <ul className="space-y-3">
                  {project.contributions.map((item) => (
                    <li
                      key={item}
                      className="quiet-text flex items-start gap-3 text-sm leading-6"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </SectionCard>
            </FadeIn>

            {/* Challenges + solutions paired */}
            {hasChallenges && (
              <FadeIn delay={80}>
                <SectionCard>
                  <SectionLabel>Challenges &amp; how I addressed them</SectionLabel>
                  <div className="space-y-6">
                    {project.challenges.map((challenge, i) => (
                      <div
                        key={i}
                        className="grid gap-3 border-b border-border pb-6 last:border-0 last:pb-0 sm:grid-cols-2 sm:gap-8"
                      >
                        <div>
                          <p className="muted-text mb-2 text-[11px] font-bold uppercase tracking-widest">
                            Challenge
                          </p>
                          <p className="quiet-text text-sm leading-6">{challenge}</p>
                        </div>
                        {project.solutions[i] && (
                          <div>
                            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-primary">
                              Response
                            </p>
                            <p className="quiet-text text-sm leading-6">
                              {project.solutions[i]}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </FadeIn>
            )}

            {/* Outcomes — visually distinct payoff */}
            <FadeIn delay={120} spring>
              <section
                className="rounded-xl p-6"
                style={{
                  background:
                    "color-mix(in oklch, var(--primary), transparent 90%)",
                  border:
                    "1px solid color-mix(in oklch, var(--primary), transparent 76%)",
                }}
              >
                <p
                  className="mb-4 text-[11px] font-bold uppercase tracking-widest"
                  style={{ color: "var(--primary)" }}
                >
                  Results &amp; outcomes
                </p>
                <ul className="space-y-4">
                  {project.outcomes.map((item) => (
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
              <FadeIn delay={60}>
                <div className="panel rounded-xl p-5">
                  <SectionLabel>Role</SectionLabel>
                  <p className="text-sm font-semibold">{project.role}</p>

                  <p className="eyebrow mb-3 mt-6">Tech stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {(project.demoUrl || project.githubUrl) && (
                    <>
                      <p className="eyebrow mb-3 mt-6">Links</p>
                      <div className="flex flex-col gap-2">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="focusable inline-flex min-h-10 items-center gap-2 rounded-md border border-transparent text-sm font-semibold text-primary transition-colors hover:text-foreground"
                          >
                            Live preview{" "}
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="focusable inline-flex min-h-10 items-center gap-2 rounded-md border border-transparent text-sm font-semibold text-primary transition-colors hover:text-foreground"
                          >
                            View on GitHub{" "}
                            <Code2 className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </FadeIn>
            </div>
          </aside>
        </div>

        {/* Prev / next navigation */}
        {(prev || next) && (
          <FadeIn>
            <nav
              className="border-t border-border pt-10"
              aria-label="Project navigation"
            >
              <p className="eyebrow mb-5">More work</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {prev ? (
                  <Link
                    href={`/portfolio/projects/${prev.slug}`}
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
                    href={`/portfolio/projects/${next.slug}`}
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
