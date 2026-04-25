import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code2, ExternalLink, Mail } from "lucide-react";
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
}: {
  project: ProjectCaseStudy;
  compact?: boolean;
}) {
  return (
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
          {project.stack.slice(0, compact ? 4 : 6).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
        <Link
          href={`/portfolio/projects/${project.slug}`}
          className="focusable inline-flex min-h-10 w-fit items-center gap-2 rounded-md border border-transparent text-sm font-semibold text-primary transition-colors hover:text-foreground"
        >
          Read case study <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

export function ExperiencePhaseCard({ phase }: { phase: ExperiencePhase }) {
  const related = getRelatedProjects(phase.relatedProjectSlugs);

  return (
    <article className="panel panel-hover rounded-xl p-5">
      <p className="muted-text text-sm font-medium">{phase.period}</p>
      <h2 className="mt-2 text-xl font-bold leading-7">{phase.title}</h2>
      <p className="quiet-text mt-3 text-sm leading-6">{phase.summary}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {phase.technologies.slice(0, 6).map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href={`/portfolio/experience/${phase.slug}`}
          className="focusable inline-flex min-h-10 items-center gap-2 rounded-md border border-transparent text-sm font-semibold text-primary transition-colors hover:text-foreground"
        >
          Explore phase <ArrowRight className="h-4 w-4" />
        </Link>
        {related[0] && (
          <Link
            href={`/portfolio/projects/${related[0].slug}`}
            className="focusable inline-flex min-h-10 items-center gap-2 rounded-md border border-transparent text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Related project
          </Link>
        )}
      </div>
    </article>
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
        <p className="muted-text mt-3 text-xs">Credential ID: {credential.credentialId}</p>
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
              <TextLink href="/portfolio/experience">Experience</TextLink>
              <TextLink href="/portfolio/projects">Projects</TextLink>
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
            <TextLink href="/portfolio/experience">View experience</TextLink>
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
            <TextLink href="/portfolio/projects">View projects</TextLink>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {featured.map((project) => (
              <ProjectCaseStudyCard key={project.slug} project={project} compact />
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

export function ExperienceIndex() {
  return (
    <section className="site-page">
      <div className="site-container space-y-12">
        <PageIntro
          eyebrow="Experience"
          title="A journey through engineering, SaaS, startups, freelance, and automation."
          summary="Each phase shows what I was responsible for, what I learned, and which projects came from that period."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {experiencePhases.map((phase) => (
            <ExperiencePhaseCard key={phase.slug} phase={phase} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExperienceDetail({ phase }: { phase: ExperiencePhase }) {
  const related = getRelatedProjects(phase.relatedProjectSlugs);

  return (
    <section className="site-page">
      <div className="site-container space-y-14">
        <PageIntro eyebrow="Experience" title={phase.title} summary={phase.summary} />

        <div className="grid gap-5 lg:grid-cols-3">
          <InfoPanel title="Responsibilities" items={phase.responsibilities} />
          <InfoPanel title="Achievements" items={phase.achievements} />
          <InfoPanel title="Key learnings" items={phase.learnings} />
        </div>

        <section>
          <p className="eyebrow mb-4">Technologies used</p>
          <div className="flex flex-wrap gap-2">
            {phase.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-accent px-3 py-1.5 text-sm font-semibold text-accent-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow mb-2">Connected proof</p>
                <h2 className="text-2xl font-bold">Related projects</h2>
              </div>
              <TextLink href="/portfolio/projects">View all projects</TextLink>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {related.slice(0, 4).map((project) => (
                <ProjectCaseStudyCard key={project.slug} project={project} compact />
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}

export function ProjectsIndex() {
  const categories = Array.from(new Set(projectCaseStudies.map((project) => project.category)));

  return (
    <section className="site-page">
      <div className="site-container space-y-14">
        <PageIntro
          eyebrow="Projects"
          title="Case studies organized by business context."
          summary="Dedicated pages make the work easier to scan, share, and revisit. Start with a category or jump into a featured case study."
        />

        {categories.map((category) => (
          <section key={category}>
            <p className="eyebrow mb-4">{category}</p>
            <div className="grid gap-5 md:grid-cols-2">
              {projectCaseStudies
                .filter((project) => project.category === category)
                .map((project) => (
                  <ProjectCaseStudyCard key={project.slug} project={project} />
                ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

export function ProjectDetail({ project }: { project: ProjectCaseStudy }) {
  return (
    <section className="site-page">
      <div className="site-container space-y-14">
        <PageIntro eyebrow={project.category} title={project.title} summary={project.overview} />

        {project.screenshots.length > 0 && (
          <div className="panel overflow-hidden rounded-xl">
            <ImageCarousel images={project.screenshots} title={project.title} />
          </div>
        )}

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-5">
            <ContentSection title="Business problem" body={project.businessProblem} />
            <ContentList title="My contributions" items={project.contributions} />
            <ContentList title="Challenges" items={project.challenges} />
            <ContentList title="Solutions implemented" items={project.solutions} />
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

export function CredentialsPageView() {
  return (
    <section className="site-page">
      <div className="site-container space-y-12">
        <PageIntro
          eyebrow="Credentials"
          title="Certifications, badges, training, and recognitions."
          summary="A compact record of the credentials and milestones that support my frontend, SaaS, cloud cost, and startup work."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {credentials.map((credential) => (
            <CredentialCard key={credential.slug} credential={credential} />
          ))}
        </div>
      </div>
    </section>
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
            summary="For hiring, freelance, collaboration, or product/frontend opportunities, email is the best first step."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:lordkelvinabellana@gmail.com"
              className="focusable inline-flex min-h-11 items-center gap-2 rounded-md border border-primary bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              <Mail className="h-4 w-4" /> Email Kelvin
            </a>
            <a
              href="/assets/resume.pdf"
              download
              className="focusable inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground"
            >
              Download resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="panel rounded-xl p-5">
      <h2 className="text-lg font-bold">{title}</h2>
      <ul className="quiet-text mt-4 space-y-3 text-sm leading-6">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
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
