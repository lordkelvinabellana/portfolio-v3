import Link from "next/link";
import { ArrowLeft, ArrowRight, Code2, ExternalLink } from "lucide-react";
import { projectCaseStudies, type ProjectCaseStudy } from "@/data/portfolio";
import { FadeIn } from "@/components/ui/FadeIn";
import { ImageGallery } from "./ImageGallery";

/* ── Adjacent project navigation ── */

function getAdjacentProjects(slug: string) {
  const idx = projectCaseStudies.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? projectCaseStudies[idx - 1] : null;
  const next = idx < projectCaseStudies.length - 1 ? projectCaseStudies[idx + 1] : null;
  return { prev, next };
}

/* ── Helpers ── */

function firstSentence(text: string): string {
  const match = text.match(/^[^.!?]+[.!?]/);
  return match ? match[0].trim() : text.split(" ").slice(0, 18).join(" ") + "…";
}

/* Splits "Bold lead — rest of text" into [lead, rest] for visual emphasis */
function splitOutcome(text: string): [string, string] {
  const dashIdx = text.indexOf(" — ");
  if (dashIdx !== -1) return [text.slice(0, dashIdx), text.slice(dashIdx)];
  const words = text.split(" ");
  if (words.length > 6) return [words.slice(0, 5).join(" "), " " + words.slice(5).join(" ")];
  return [text, ""];
}

/* ── Section primitives ── */

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="panel rounded-xl p-6">{children}</div>
  );
}

function SectionLabel({ children, oneLiner }: { children: React.ReactNode; oneLiner?: string }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-3">
        <p className="shrink-0 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          {children}
        </p>
        <div className="h-px flex-1 bg-border" />
      </div>
      {oneLiner && (
        <p className="mt-2 text-sm font-medium text-foreground/70 leading-snug">{oneLiner}</p>
      )}
    </div>
  );
}

function BodyText({ text }: { text: string }) {
  const sentences = text.match(/[^.!?—]+[.!?—]*["']?\s*/g) ?? [text];
  const paragraphs: string[] = [];
  for (let i = 0; i < sentences.length; i += 2) {
    const chunk = sentences.slice(i, i + 2).join("").trim();
    if (chunk) paragraphs.push(chunk);
  }
  return (
    <div className="space-y-3">
      {paragraphs.map((p, i) => (
        <p key={i} className="quiet-text leading-7">
          {p}
        </p>
      ))}
    </div>
  );
}

/* ── TL;DR summary block ── */

function TLDRBlock({ project }: { project: ProjectCaseStudy }) {
  const bullets = [
    { label: "Built", text: project.contributions[0] },
    { label: "Problem", text: firstSentence(project.businessProblem) },
    { label: "Impact", text: project.outcomes[0] },
  ];

  return (
    <div
      className="rounded-xl px-6 py-5"
      style={{
        background: "color-mix(in oklch, var(--muted), transparent 40%)",
        border: "1px solid color-mix(in oklch, var(--border), transparent 30%)",
      }}
    >
      <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
        Summary
      </p>
      <ul className="space-y-2">
        {bullets.map(({ label, text }) => (
          <li key={label} className="flex gap-2 text-sm leading-6">
            <span className="shrink-0 font-semibold text-foreground/60 w-14">{label}</span>
            <span className="quiet-text">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Main component ── */

interface ProjectDetailSectionProps {
  project: ProjectCaseStudy;
  backHref?: string;
  basePath?: string;
}

export function ProjectDetailSection({ project, backHref = "/work", basePath = "/work" }: ProjectDetailSectionProps) {
  const { prev, next } = getAdjacentProjects(project.slug);
  const hasChallenges = project.challenges.length > 0;

  return (
    <article className="site-page">
      <div className="site-container space-y-12">

        {/* Back */}
        <FadeIn>
          <Link
            href={backHref}
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

        {/* Live link */}
        {project.demoUrl && project.liveLabel && (
          <FadeIn delay={50}>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focusable inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <ExternalLink className="h-4 w-4" />
                {project.liveLabel}
              </a>
              {project.liveLabel === "View MVP" && (
                <span className="text-xs font-medium text-muted-foreground">MVP / early-stage build</span>
              )}
            </div>
          </FadeIn>
        )}

        {/* TL;DR */}
        <FadeIn delay={60}>
          <TLDRBlock project={project} />
        </FadeIn>

        {/* Screenshots */}
        {project.screenshots.length > 0 && (
          <FadeIn delay={80} spring>
            <ImageGallery images={project.screenshots} title={project.title} variant="full" />
          </FadeIn>
        )}

        {/* Content + sidebar */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_21rem]">

          {/* Main column */}
          <div className="space-y-5">

            {/* Business problem */}
            <FadeIn>
              <SectionCard>
                <SectionLabel oneLiner={firstSentence(project.businessProblem)}>Problem</SectionLabel>
                <BodyText text={project.businessProblem} />
              </SectionCard>
            </FadeIn>

            {/* Contributions */}
            <FadeIn delay={40}>
              <SectionCard>
                <SectionLabel oneLiner={`${project.contributions.length} key contributions that defined the build`}>What I Built</SectionLabel>
                <ul className="space-y-3.5">
                  {project.contributions.map((item) => (
                    <li
                      key={item}
                      className="quiet-text flex items-start gap-3 text-sm leading-6"
                    >
                      <span
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
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
                  <SectionLabel oneLiner="Tradeoffs and approaches that shaped the final outcome">Key Decisions</SectionLabel>
                  <div className="space-y-5">
                    {project.challenges.map((challenge, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-border bg-secondary/30 p-4 last:mb-0"
                      >
                        <p className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                          Challenge
                        </p>
                        <p className="quiet-text mb-3 text-sm leading-6">{challenge}</p>
                        {project.solutions[i] && (
                          <>
                            <p className="eyebrow mb-1.5">
                              Approach
                            </p>
                            <p className="quiet-text text-sm leading-6">
                              {project.solutions[i]}
                            </p>
                          </>
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
                <div className="mb-5">
                  <div className="flex items-center gap-3">
                    <p className="eyebrow shrink-0">
                      Impact
                    </p>
                    <div className="h-px flex-1" style={{ background: "color-mix(in oklch, var(--primary), transparent 70%)" }} />
                  </div>
                  <p className="mt-2 text-sm font-medium text-foreground/70 leading-snug">
                    {firstSentence(project.outcomes[0])}
                  </p>
                </div>
                <ul className="space-y-4">
                  {project.outcomes.map((item) => {
                    const [lead, rest] = splitOutcome(item);
                    return (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-6"
                      >
                        <ArrowRight
                          className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span>
                          <strong className="font-semibold text-foreground">{lead}</strong>
                          {rest && <span className="quiet-text">{rest}</span>}
                        </span>
                      </li>
                    );
                  })}
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

                  <div className="mt-6">
                    <SectionLabel>Tech Stack</SectionLabel>
                  </div>
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
                      <div className="mt-6">
                        <SectionLabel>Links</SectionLabel>
                      </div>
                      <div className="flex flex-col gap-2">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="focusable inline-flex min-h-10 items-center gap-2 rounded-md border border-border bg-secondary px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-accent hover:text-accent-foreground"
                          >
                            {project.liveLabel ?? "Live preview"}{" "}
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="focusable inline-flex min-h-10 items-center gap-2 rounded-md border border-border bg-secondary px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-accent hover:text-accent-foreground"
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
                    href={`${basePath}/${prev.slug}`}
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
                    href={`${basePath}/${next.slug}`}
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
