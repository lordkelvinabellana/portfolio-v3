import { ArrowRight, Download, Mail, MessageCircle } from "lucide-react";
import { CV_FILENAME, CV_HREF, EMAIL, LinkedInIcon, RESUME_FILENAME, RESUME_HREF } from "@/components/layout/social";
import { FadeIn } from "@/components/ui/FadeIn";

const projectMail = `mailto:${EMAIL}?subject=${encodeURIComponent("Project enquiry")}`;
const roleMail = `mailto:${EMAIL}?subject=${encodeURIComponent("Role opportunity")}`;

export function ContactSection() {
  return (
    <section className="site-container">
      <FadeIn>
        <header className="max-w-2xl">
          <h1 className="section-heading">Let&apos;s work together</h1>
          <p className="quiet-text mt-5 text-lg leading-8">
            Pick the route that fits. I usually reply within 24 hours.
          </p>
        </header>
      </FadeIn>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <FadeIn spring>
          <div className="panel flex h-full flex-col gap-5 rounded-xl p-6 md:p-8">
            <div>
              <h2 className="text-xl font-semibold">Start a project</h2>
              <p className="quiet-text mt-2 text-sm leading-6">
                Operations systems, automation, web apps, or VSL and ad editing. A few lines on what you need and when is plenty to start.
              </p>
            </div>
            <ul className="space-y-2 text-sm">
              {[
                "What is slowing your team down, or what the video needs to say",
                "The tools you use today",
                "Your timeline and budget range",
              ].map((line) => (
                <li key={line} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span className="quiet-text">{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-3 pt-2">
              <a
                href={projectMail}
                className="focusable inline-flex min-h-11 items-center gap-2 rounded-md border border-primary bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Mail className="h-4 w-4" /> Email about a project
              </a>
              <a
                href="https://wa.me/639285583697"
                target="_blank"
                rel="noopener noreferrer"
                className="focusable inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </FadeIn>

        <FadeIn spring delay={70}>
          <div className="panel flex h-full flex-col gap-5 rounded-xl p-6 md:p-8">
            <div>
              <h2 className="text-xl font-semibold">Hiring for a role</h2>
              <p className="quiet-text mt-2 text-sm leading-6">
                Open to full-time and contract roles in operations, automation, product and frontend. The résumé is one page; the CV has every project.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={RESUME_HREF}
                download={RESUME_FILENAME}
                className="focusable inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent"
              >
                <Download className="h-4 w-4" /> Résumé
              </a>
              <a
                href={CV_HREF}
                download={CV_FILENAME}
                className="focusable inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent"
              >
                <Download className="h-4 w-4" /> Full CV
              </a>
            </div>
            <div className="mt-auto flex flex-wrap gap-3 pt-2">
              <a
                href={roleMail}
                className="focusable inline-flex min-h-11 items-center gap-2 rounded-md border border-primary bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Mail className="h-4 w-4" /> Email about a role
              </a>
              <a
                href="https://linkedin.com/in/lordkelvinabellana"
                target="_blank"
                rel="noopener noreferrer"
                className="focusable inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm font-semibold text-primary hover:text-foreground"
              >
                <LinkedInIcon className="h-3.5 w-3.5" /> LinkedIn <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
