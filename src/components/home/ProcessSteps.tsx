"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const steps = [
  {
    title: "Brief and audit",
    text: "I learn how the work happens today, or what the brand needs to say, before anything is built or cut.",
  },
  {
    title: "Build or cut",
    text: "The first version of the system, or the first edit, shared early so you can react to something real.",
  },
  {
    title: "Prove it",
    text: "Systems run side by side with the old process until the numbers match. Edits get a review cut against your brand rules.",
  },
  {
    title: "Hand it over",
    text: "Guides, training and source files, so your team owns what it paid for.",
  },
];

/* The four steps, joined by a line that draws across as the section scrolls in. */
export function ProcessSteps() {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const markers = gsap.utils.toArray<HTMLElement>("[data-step-marker]");
      const texts = gsap.utils.toArray<HTMLElement>("[data-step-text]");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        defaults: { ease: "power3.out" },
      });
      tl.fromTo("[data-step-line]", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, 0)
        .fromTo(markers, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.45, stagger: 0.22 }, 0.05)
        .fromTo(texts, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.22 }, 0.15)
        .add(() => markers.forEach((m) => m.classList.add("is-lit")));
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      <span
        data-step-line
        aria-hidden="true"
        className="absolute left-3 right-3 top-3 hidden h-px origin-left bg-[color-mix(in_oklch,var(--primary),transparent_55%)] lg:block"
      />
      {steps.map((step, i) => (
        <li key={step.title} className="relative">
          <span data-step-marker className="flow-marker" aria-hidden="true">
            {i + 1}
          </span>
          <div data-step-text className="mt-4">
            <h3 className="font-semibold">{step.title}</h3>
            <p className="quiet-text mt-1.5 text-sm leading-6">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
