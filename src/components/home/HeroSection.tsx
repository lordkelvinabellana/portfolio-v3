"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { RESUME_FILENAME, RESUME_HREF } from "@/components/layout/social";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { afterIntro } from "@/lib/intro";
import { HeroShowcase } from "./HeroShowcase";
import { PortraitPop } from "./PortraitPop";


/* Headline lines rise out of their masks and the rest follows; the portrait runs its own entrance. */
function enter(root: HTMLElement) {
  const title = root.querySelector<HTMLElement>("[data-hero-title]");
  const items = root.querySelectorAll<HTMLElement>("[data-hero-item]");

  if (title) {
    gsap.set(title, { autoAlpha: 1 });
    SplitText.create(title, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 112,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.085,
          delay: 0.12,
        }),
    });
  }

  gsap.fromTo(items, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.07, delay: 0.5 });
}

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  /* One orchestrated entrance: headline lines rise out of their masks, the
     rest follows, and the portrait rises into place. On a
     first visit it waits for the chat bot's close-up to hand over. */
  useGSAP(
    (_context, contextSafe) => {
      if (prefersReducedMotion() || !contextSafe) return;
      const root = heroRef.current;
      if (!root) return;
      return afterIntro(contextSafe(() => enter(root)));
    },
    { scope: heroRef },
  );

  return (
    <section className="site-container !pt-8 !pb-10 md:!pt-10 md:!pb-16">
      <div ref={heroRef}>
        <div className="grid items-center gap-10 max-sm:overflow-x-clip lg:grid-cols-[minmax(0,1fr)_24rem] xl:grid-cols-[minmax(0,1fr)_28rem] xl:gap-14">
          <div className="max-w-3xl">
            <p data-reveal data-hero-item className="mb-5 flex items-center gap-2.5 text-sm font-medium text-muted-foreground">
              <span className="status-dot animate-pulse-gentle" aria-hidden="true" />
              Available for client projects and full-time roles
            </p>

            <h1 data-reveal data-hero-title className="display-heading hero-heading">
              <span className="block">Systems that run</span> <span className="block">your business.</span>{" "}
              <span className="block">Videos that</span> <span className="block">sell it.</span>
            </h1>

            <p data-reveal data-hero-item className="quiet-text mt-5 max-w-[58ch] text-lg leading-8">
              I build client portals, scorecards and onboarding automation for agencies and growing brands, and I edit VSLs and short-form
              ads that stay on-brand from the first frame to the last.
            </p>

            <div data-reveal data-hero-item className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="focusable inline-flex min-h-11 items-center gap-2 rounded-md border border-primary bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Hire me <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/work"
                className="focusable inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                See my work
              </Link>
              <a
                href={RESUME_HREF}
                download={RESUME_FILENAME}
                className="focusable inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <Download className="h-3.5 w-3.5" /> Recruiting? Get my résumé
              </a>
            </div>
          </div>

          {/* Kelvin, cut out, with his tools flying out from behind him on hover. Sized so the
              tiles (which reach about 75% past the portrait's edges) never clip or cover the text. */}
          <div className="order-first mx-auto w-full max-w-[13.5rem] sm:max-w-[18rem] lg:order-none lg:max-w-[19rem] xl:max-w-[21rem]">
            <PortraitPop priority />
          </div>
        </div>

        <div className="mt-8">
          <HeroShowcase />
        </div>

        <p data-reveal data-hero-item className="muted-text mt-6 max-w-[72ch] text-sm leading-6">
          Ops &amp; Automation Assistant at Penguin Ops, building its systems and automations. Systems Implementation Associate at Stakra.
          Video editor and motion graphic designer for Clipt. Previously Lead Frontend Developer, then Product Owner, at Alphaus.
        </p>
      </div>
    </section>
  );
}
