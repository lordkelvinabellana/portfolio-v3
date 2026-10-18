import Link from "next/link";
import { ArrowRight, Download, Mail, MessageCircle } from "lucide-react";
import { experiencePhases, getProjectCaseStudy, type ProjectCaseStudy } from "@/data/portfolio";
import { services } from "@/data/services";
import { FadeIn } from "@/components/ui/FadeIn";
import { CaseStudyCard } from "@/components/projects/CaseStudyCard";
import { CV_FILENAME, CV_HREF, EMAIL, RESUME_FILENAME, RESUME_HREF } from "@/components/layout/social";
import { HeroSection } from "./HeroSection";
import { OutputReel } from "./OutputReel";
import { ProcessSteps } from "./ProcessSteps";
import { ServiceArt } from "./ServiceArt";
import { EditTimeline } from "@/components/video/EditTimeline";
import { WorkflowCanvas } from "@/components/automation/WorkflowCanvas";
import { automations } from "@/data/automations";
import { getWorkflow } from "@/data/workflows";
import Image from "next/image";

const pick = (slugs: string[]) =>
  slugs.map((slug) => getProjectCaseStudy(slug)).filter((p): p is ProjectCaseStudy => Boolean(p));

const SYSTEMS = pick(["talent-agency-client-portal", "ad-agency-scorecard", "google-ads-agency-operations"]);
const PERSONAL = pick(["hatstand", "bouquet-cipher", "arnis-scoreboard"]);
const VSL = getProjectCaseStudy("clipt-vsl");
const PULSE = getWorkflow("weekly-pulse");
const ADS = getProjectCaseStudy("clipt-short-form-ads-testimonials");
const HOME_PHASES = ["penguin-ops", "stakra", "clipt", "retail-group", "flexiwork", "ardexa", "clix", "alphaus"]
  .map((slug) => experiencePhases.find((p) => p.slug === slug))
  .filter((p): p is (typeof experiencePhases)[number] => Boolean(p));

function SectionHeader({
  title,
  intro,
  link,
}: {
  title: string;
  intro?: string;
  link?: { href: string; label: string };
}) {
  return (
    <FadeIn>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div className="max-w-2xl">
          <h2 className="home-heading">{title}</h2>
          {intro && <p className="quiet-text mt-4 text-base leading-7">{intro}</p>}
        </div>
        {link && (
          <Link
            href={link.href}
            className="focusable inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-primary transition-colors hover:text-foreground"
          >
            {link.label} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    </FadeIn>
  );
}

export function HomePage() {
  const vslVideo = VSL?.videos?.[0];

  return (
    <>
      <HeroSection />

      {/* ── Services ── */}
      <section id="services" className="border-y border-border bg-[var(--surface-1)]">
        <div className="site-container">
          <SectionHeader
            title="What I can do for you"
            intro="Three ways I work with clients. Most projects start with one and grow into another."
          />
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-0">
            {services.map((service, i) => (
              <FadeIn key={service.key} delay={i * 70}>
                <div className="flex h-full flex-col gap-4 lg:border-l lg:border-border lg:px-8 lg:first:border-l-0 lg:first:pl-0">
                  <ServiceArt kind={service.key} />
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="quiet-text text-sm leading-6">{service.summary}</p>
                  <ul className="space-y-2 text-sm">
                    {service.deliverables.map((d) => (
                      <li key={d} className="flex gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto pt-2 text-sm font-medium leading-6 text-foreground/80">{service.proof}</p>
                  <Link
                    href={`/work?service=${service.key}`}
                    className="focusable inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-primary hover:text-foreground"
                  >
                    See {service.title.toLowerCase()} work <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Video work ── */}
      {VSL && ADS && vslVideo && (
        <section id="video">
          <div className="site-container">
            <div className="mb-12 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
              <FadeIn>
                <div className="max-w-xl">
                  <h2 className="home-heading">VSLs and ads that stay on-brand</h2>
                  <p className="quiet-text mt-4 text-base leading-7">
                    Edited for Clipt, a mobile foot-care training company: the full 35-minute sales video, vertical ads and nurse testimonials, all built from one brand system so every piece looks like the same company.
                  </p>
                  <ul className="mt-6 space-y-3 text-sm leading-6">
                    {[
                      "Retakes, fillers and long pauses cleaned out, with repeated lines tracked across the whole script",
                      "Brand-style panels and statements timed to what the speaker says",
                      "Framing that follows the graphics, colour measured per location, sound mixed under the voice",
                      "A brand system set up once, so the next VSL or ad is consistent from day one",
                    ].map((line) => (
                      <li key={line} className="flex gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--coral-fg)]" aria-hidden="true" />
                        <span className="quiet-text">{line}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/work/${VSL.slug}`}
                    className="focusable mt-6 inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-primary transition-colors hover:text-foreground"
                  >
                    See the VSL case study <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </FadeIn>
              <FadeIn delay={80}>
                <EditTimeline />
              </FadeIn>
            </div>

            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)]">
              <FadeIn spring>
                <div className="panel overflow-hidden rounded-xl">
                  <video
                    src={vslVideo.src}
                    poster={vslVideo.poster}
                    controls
                    playsInline
                    preload="none"
                    className="aspect-video w-full bg-secondary object-cover"
                  >
                    {vslVideo.title}
                  </video>
                </div>
                <p className="muted-text mt-2 text-xs">{vslVideo.note}</p>
              </FadeIn>
              <div className="grid grid-cols-2 gap-5 lg:grid-cols-1">
                {VSL.screenshots.slice(1, 3).map((src, i) => (
                  <FadeIn key={src} delay={60 + i * 60}>
                    <div className="panel relative aspect-video overflow-hidden rounded-xl">
                      <Image src={src} alt="A frame from the Clipt sales video" fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-cover" />
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            <div className="mt-16">
              <FadeIn>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <h3 className="text-lg font-semibold">Short-form ads and testimonials</h3>
                  <Link
                    href={`/work/${ADS.slug}`}
                    className="focusable inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-primary hover:text-foreground"
                  >
                    See the ads case study <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </FadeIn>
              <FadeIn>
                <OutputReel videos={ADS.videos ?? []} href={`/work/${ADS.slug}`} />
              </FadeIn>
            </div>
          </div>
        </section>
      )}

      {/* ── Systems ── */}
      <section className="border-t border-border">
        <div className="site-container">
          <SectionHeader
            title="Systems teams run on"
            intro="Recent operations work for agencies. Clients are kept anonymous; the numbers are real."
            link={{ href: "/work?service=operations", label: "All operations work" }}
          />
          {PULSE && (
            <FadeIn>
              <figure className="mb-10">
                <WorkflowCanvas workflow={PULSE} compact />
                <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-sm">
                  <span>
                    <span className="font-semibold">A real n8n workflow: {PULSE.title.toLowerCase()}.</span>{" "}
                    <span className="quiet-text">{PULSE.caption}</span>
                  </span>
                  <span className="flex items-center gap-4">
                    <span className="muted-text text-xs">{PULSE.nodes.length} nodes, runs every Monday</span>
                    <Link href="/automations" className="focusable inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-foreground">
                      See all {automations.length} n8n workflows <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </span>
                </figcaption>
              </figure>
            </FadeIn>
          )}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SYSTEMS.map((project, i) => (
              <FadeIn key={project.slug} delay={i * 60} spring>
                <CaseStudyCard project={project} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="border-y border-border bg-[var(--surface-1)]">
        <div className="site-container">
          <SectionHeader title="How a project runs" />
          <ProcessSteps />
        </div>
      </section>

      {/* ── Experience ── */}
      <section>
        <div className="site-container">
          <SectionHeader
            title="Experience"
            intro="For recruiters: the short version is below, and the résumé has the rest."
            link={{ href: "/experience", label: "Full experience" }}
          />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <ol className="divide-y divide-border border-y border-border">
              {HOME_PHASES.map((phase) => (
                <li key={phase.slug}>
                  <Link
                    href={`/experience/${phase.slug}`}
                    className="focusable group grid gap-1 py-4 no-underline sm:grid-cols-[minmax(0,1fr)_10rem] sm:gap-6"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold transition-colors group-hover:text-primary">{phase.title}</p>
                      <p className="quiet-text mt-1 line-clamp-2 text-sm leading-6">{phase.summary}</p>
                    </div>
                    <p className="muted-text text-sm sm:text-right">{phase.period}</p>
                  </Link>
                </li>
              ))}
            </ol>
            <FadeIn>
              <div className="panel space-y-4 rounded-xl p-5">
                <p className="font-semibold">Hiring?</p>
                <p className="quiet-text text-sm leading-6">
                  Open to full-time and contract roles in operations, automation, product and frontend.
                </p>
                <a
                  href={RESUME_HREF}
                  download={RESUME_FILENAME}
                  className="focusable flex min-h-11 items-center justify-center gap-2 rounded-md border border-primary bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Download className="h-4 w-4" /> Download résumé
                </a>
                <a
                  href={CV_HREF}
                  download={CV_FILENAME}
                  className="focusable flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-secondary text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent"
                >
                  <Download className="h-4 w-4" /> Download full CV
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Personal ── */}
      <section className="border-t border-border">
        <div className="site-container">
          <SectionHeader
            title="Personal projects"
            intro="Things I build on my own time, to try an idea properly."
            link={{ href: "/work?service=personal", label: "All personal projects" }}
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PERSONAL.map((project, i) => (
              <FadeIn key={project.slug} delay={i * 60} spring>
                <CaseStudyCard project={project} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="border-t border-border bg-[var(--surface-1)]">
        <div className="site-container">
          <FadeIn>
            <div className="max-w-2xl">
              <h2 className="home-heading">Have a project or a role in mind?</h2>
              <p className="quiet-text mt-4 text-base leading-7">
                Tell me what is slowing your team down, or what your next video needs to say. I will reply with how I would approach it.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="focusable inline-flex min-h-11 items-center gap-2 rounded-md border border-primary bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Mail className="h-4 w-4" /> Email me
                </a>
                <a
                  href="https://wa.me/639285583697"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focusable inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <a
                  href="https://linkedin.com/in/lord-kelvin-abellana-46a15a320"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focusable inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm font-semibold text-primary hover:text-foreground"
                >
                  LinkedIn <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
