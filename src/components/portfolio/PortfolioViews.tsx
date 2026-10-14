import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code2, ExternalLink, Mail, MessageCircle, Download, Eye } from "lucide-react";
import {
  credentials,
  experiencePhases,
  featuredProjectSlugs,
  getRelatedProjects,
  projectCaseStudies,
  type Credential,
  type ExperiencePhase,
  type ProjectCaseStudy,
} from "@/data/portfolio";
import { ImageCarousel } from "@/components/projects/ImageCarousel";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { AnimatedCard } from "@/components/animation/AnimatedComponents";
import { DURATIONS, EASINGS } from "@/components/animation/AnimatedElements";

export function PageIntro({
  eyebrow,
  title,
  summary,
}: {
  eyebrow: string;
  title: string;
  summary: string;
}) {
  return (
    <header className="max-w-3xl">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h1 className="section-heading">{title}</h1>
      <p className="quiet-text mt-6 text-lg leading-8">{summary}</p>
    </header>
  );
}

export function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="focusable inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

export function ProjectCaseStudyCard({
  project,
  compact = false,
  index = 0,
}: {
  project: ProjectCaseStudy;
  compact?: boolean;
  index?: number;
}) {
  return (
    <AnimatedCard delay={index * 50}>
      <article className="panel panel-hover flex h-full flex-col overflow-hidden rounded-xl">
        {project.screenshots.length > 0 ? (
          <ImageCarousel images={project.screenshots} title={project.title} />
        ) : (
          <div className="flex aspect-video w-full items-center justify-center bg-secondary">
            <span className="muted-text text-[11px] font-semibold uppercase tracking-[0.08em]">
              Case study
            </span>
          </div>
        )}

        <div className="flex flex-1 flex-col gap-4 p-5">
          <div>
            <p className="eyebrow mb-2">{project.category}</p>
            <h2 className="text-lg font-bold leading-6">{project.title}</h2>
            <p className="muted-text mt-1 text-sm font-medium">{project.role}</p>
          </div>
          <p className="quiet-text text-sm leading-6">
            {compact ? project.overview : project.businessProblem}
          </p>
          <div className="mt-auto flex flex-wrap gap-1.5">
            {project.stack.slice(0, compact ? 4 : 6).map((tech, idx) => (
              <span
                key={tech}
                className="rounded-full bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground"
                style={{
                  animation: `fade-in ${DURATIONS.fast}ms ${EASINGS.smooth} ${index * 50 + idx * 30}ms both`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
          <Link
            href={`/work/${project.slug}`}
            className="focusable inline-flex min-h-10 w-fit items-center gap-2 rounded-md border border-transparent text-sm font-semibold text-primary transition-colors hover:text-foreground"
          >
            Read case study <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </article>
    </AnimatedCard>
  );
}

export function ExperiencePhaseCard({ phase, index }: { phase: ExperiencePhase; index?: number }) {
  const related = getRelatedProjects(phase.relatedProjectSlugs);

  return (
    <AnimatedCard delay={index ? index * 50 : 0}>
      <article className="panel panel-hover rounded-xl p-5 h-full">
        <p className="muted-text text-sm font-medium">{phase.period}</p>
        <h2 className="mt-2 text-xl font-bold leading-7">{phase.title}</h2>
        <p className="quiet-text mt-3 text-sm leading-6">{phase.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {phase.technologies.slice(0, 6).map((tech, idx) => (
            <span
              key={tech}
              className="rounded-full bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground"
              style={{
                animation: `fade-in ${DURATIONS.fast}ms ${EASINGS.smooth} ${(index ? index * 50 : 0) + idx * 30}ms both`,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/experience/${phase.slug}`}
            className="focusable inline-flex min-h-10 items-center gap-2 rounded-md border border-transparent text-sm font-semibold text-primary transition-colors hover:text-foreground"
            style={{
              transition: `color ${DURATIONS.micro}ms ${EASINGS.snappy}`,
            }}
          >
            Explore phase <ArrowRight className="h-4 w-4" />
          </Link>
          {related[0] && (
            <Link
              href={`/work/${related[0].slug}`}
              className="focusable inline-flex min-h-10 items-center gap-2 rounded-md border border-transparent text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Related project
            </Link>
          )}
        </div>
      </article>
    </AnimatedCard>
  );
}

export function CredentialCard({ credential }: { credential: Credential }) {
  const card = (
    <article className="panel panel-hover h-full rounded-xl p-5">
      {credential.image && (
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-lg bg-secondary p-2">
          <Image
            src={credential.image}
            alt={credential.title}
            width={72}
            height={72}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
      <p className="eyebrow mb-2">{credential.type}</p>
      <h2 className="text-lg font-bold leading-6">{credential.title}</h2>
      <p className="muted-text mt-1 text-sm font-medium">
        {credential.issuer}
        {credential.dateEarned ? ` · ${credential.dateEarned}` : ""}
      </p>
      <p className="quiet-text mt-3 text-sm leading-6">{credential.context}</p>
      {credential.credentialId && (
        <p className="muted-text mt-3 text-xs">
          Credential ID: {credential.credentialId}
        </p>
      )}
      {credential.verificationUrl && (
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          Verify credential <ExternalLink className="h-4 w-4" />
        </span>
      )}
    </article>
  );

  if (!credential.verificationUrl) return card;

  return (
    <a
      href={credential.verificationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="focusable block rounded-xl no-underline"
    >
      {card}
    </a>
  );
}

export function PortfolioHub() {
  const featured = featuredProjectSlugs
    .map((slug) => projectCaseStudies.find((project) => project.slug === slug))
    .filter((project): project is ProjectCaseStudy => Boolean(project));

  return (
    <section className="site-page">
      <div className="site-container space-y-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <PageIntro
            eyebrow="Portfolio"
            title="A structured map of my work, experience, and proof."
            summary="Start here if you want the clearest view of how my frontend work, product ownership, automation systems, and credentials connect."
          />
          <div className="panel rounded-xl p-5">
            <p className="eyebrow mb-4">Quick paths</p>
            <div className="grid gap-2">
              <TextLink href="/experience">Experience</TextLink>
              <TextLink href="/work">Projects</TextLink>
              <TextLink href="/portfolio/credentials">Credentials</TextLink>
            </div>
          </div>
        </div>

        <section>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">Journey</p>
              <h2 className="text-2xl font-bold">Experience phases</h2>
            </div>
            <TextLink href="/experience">View experience</TextLink>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {experiencePhases.map((phase) => (
              <ExperiencePhaseCard key={phase.slug} phase={phase} />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">Proof</p>
              <h2 className="text-2xl font-bold">Featured projects</h2>
            </div>
            <TextLink href="/work">View projects</TextLink>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {featured.map((project) => (
              <ProjectCaseStudyCard
                key={project.slug}
                project={project}
                compact
              />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">Trust signals</p>
              <h2 className="text-2xl font-bold">Credentials & recognition</h2>
            </div>
            <TextLink href="/portfolio/credentials">View credentials</TextLink>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {credentials.slice(0, 3).map((credential) => (
              <CredentialCard key={credential.slug} credential={credential} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export function ProjectDetail({ project }: { project: ProjectCaseStudy }) {
  return (
    <section className="site-page">
      <div className="site-container space-y-14">
        <Breadcrumb
          items={[
            { label: "Portfolio", href: "/portfolio" },
            { label: "Projects", href: "/work" },
            { label: project.title, href: `/work/${project.slug}` },
          ]}
        />
        <PageIntro
          eyebrow={project.category}
          title={project.title}
          summary={project.overview}
        />

        {project.screenshots.length > 0 && (
          <div className="panel overflow-hidden rounded-xl">
            <ImageCarousel images={project.screenshots} title={project.title} />
          </div>
        )}

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-5">
            <ContentSection
              title="Business problem"
              body={project.businessProblem}
            />
            <ContentList
              title="My contributions"
              items={project.contributions}
            />
            <ContentList title="Challenges" items={project.challenges} />
            <ContentList
              title="Solutions implemented"
              items={project.solutions}
            />
            <ContentList title="Results / outcomes" items={project.outcomes} />
          </div>

          <aside className="panel h-fit rounded-xl p-5">
            <p className="eyebrow mb-3">Role</p>
            <p className="font-semibold">{project.role}</p>

            <p className="eyebrow mb-3 mt-6">Tech stack</p>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground"
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
                      className="focusable inline-flex min-h-10 items-center gap-2 rounded-md border border-transparent text-sm font-semibold text-primary"
                    >
                      Live preview <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focusable inline-flex min-h-10 items-center gap-2 rounded-md border border-transparent text-sm font-semibold text-primary"
                    >
                      GitHub <Code2 className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function ContactPageView() {
  return (
    <section className="site-page">
      <div className="site-container">
        <div className="panel max-w-2xl rounded-xl p-6 md:p-8">
          <PageIntro
            eyebrow="Contact"
            title="Let’s talk about the work."
            summary="For product, frontend, or automation work. Happy to jump into a quick conversation."
          />
          <p className="quiet-text mt-3 text-sm">
            Open to full-time roles, freelance work, and product collaborations.
          </p>

          {/* Primary CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:lordkelvinabellana@gmail.com"
              className="focusable inline-flex min-h-11 items-center gap-2 rounded-md border border-primary bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Mail className="h-4 w-4" /> Email Kelvin
            </a>
            <a
              href="/assets/Abellana%2C%20Lord%20Kelvin%20-%20Resume.pdf"
              download="Abellana, Lord Kelvin - Resume.pdf"
              className="focusable inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Download className="h-4 w-4" strokeWidth={2} /> Download resume
            </a>
            <a
              href="/assets/Abellana%2C%20Lord%20Kelvin%20-%20Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="focusable inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Eye className="h-4 w-4" strokeWidth={2} /> View resume
            </a>
          </div>

          {/* CV access */}
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

          {/* Secondary contact options */}
          <div className="mt-6 border-t border-border pt-6">
            <p className="muted-text mb-3 text-xs font-semibold uppercase tracking-widest">Also reachable via</p>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://linkedin.com/in/lord-kelvin-abellana-46a15a320"
                target="_blank"
                rel="noopener noreferrer"
                className="focusable inline-flex min-h-10 items-center gap-2 rounded-md border border-border bg-secondary px-3.5 py-2 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <LinkedInIcon className="h-3.5 w-3.5" /> LinkedIn
              </a>
              <a
                href="https://github.com/lordkelvinabellana"
                target="_blank"
                rel="noopener noreferrer"
                className="focusable inline-flex min-h-10 items-center gap-2 rounded-md border border-border bg-secondary px-3.5 py-2 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <GitHubIcon className="h-3.5 w-3.5" /> GitHub
              </a>
              <a
                href="https://wa.me/639285583697"
                target="_blank"
                rel="noopener noreferrer"
                className="focusable inline-flex min-h-10 items-center gap-2 rounded-md border border-border bg-secondary px-3.5 py-2 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </a>
            </div>
            <p className="muted-text mt-4 text-sm">Usually reply within 24 hours.</p>
          </div>

          {/* What I help with */}
          <div className="mt-6 border-t border-border pt-6">
            <p className="muted-text mb-3 text-xs font-semibold uppercase tracking-widest">What I usually help with</p>
            <ul className="quiet-text space-y-2 text-sm leading-6">
              <li>Building scalable frontend systems (Vue, React, Next.js)</li>
              <li>Improving product workflows and delivery speed</li>
              <li>Automation and AI-assisted processes (n8n, APIs, OpenAI)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContentSection({ title, body }: { title: string; body: string }) {
  return (
    <section className="panel rounded-xl p-5">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="quiet-text mt-3 leading-7">{body}</p>
    </section>
  );
}

function ContentList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="panel rounded-xl p-5">
      <h2 className="text-xl font-bold">{title}</h2>
      <ul className="quiet-text mt-4 space-y-3 leading-7">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
