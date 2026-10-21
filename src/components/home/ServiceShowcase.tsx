"use client";

import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, FileText, Hash, ListChecks, Scissors, Send } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { services, type ServiceKey } from "@/data/services";
import { FadeIn } from "@/components/ui/FadeIn";

/*
 * The services, each topped by a small motion piece that shows the work before
 * anyone reads a word: a workflow runs and onboards a client, an edit gets cut
 * and changes shot, a dashboard builds itself. They play one after another.
 */

const FLOW_NODES = [
  { icon: FileText, label: "Form" },
  { icon: ListChecks, label: "ClickUp" },
  { icon: Hash, label: "Slack" },
  { icon: Send, label: "Welcome" },
];
const NODE_X = [12.5, 37.5, 62.5, 87.5];

const CLIPS = [
  { grow: 26, filler: false },
  { grow: 11, filler: true },
  { grow: 30, filler: false },
  { grow: 21, filler: false },
];

const FRAMES = [
  { src: "/assets/clipt/stills/hero-vsl-panel.jpg", alt: "VSL frame with a brand panel beside the founder" },
  { src: "/assets/clipt/stills/hero-vsl-two-panels.jpg", alt: "VSL frame with panels on both sides" },
  { src: "/assets/clipt/stills/hero-vsl-statement.jpg", alt: "VSL full-screen statement" },
];

const KPIS = [
  { value: 93, suffix: "%", label: "Data parity" },
  { value: 14, suffix: "", label: "Workflows" },
  { value: 80, suffix: "", label: "Clients" },
];
const BARS = [38, 52, 46, 64, 58, 76, 88];
// Rounded so the server and every browser print identical markup.
const WAVE = Array.from({ length: 40 }, (_, i) => Math.round((2 + Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6)) * 8) * 100) / 100);

function FlowStage() {
  return (
    <>
      <div className="show-grid-dots absolute inset-0" />
      <svg viewBox="0 0 160 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {NODE_X.slice(0, -1).map((x, i) => (
          <g key={x}>
            <line x1={(x / 100) * 160 + 11} y1="42" x2={(NODE_X[i + 1] / 100) * 160 - 11} y2="42" className="show-wire" vectorEffect="non-scaling-stroke" />
            <line data-wire x1={(x / 100) * 160 + 11} y1="42" x2={(NODE_X[i + 1] / 100) * 160 - 11} y2="42" pathLength={1} className="show-wire-live" vectorEffect="non-scaling-stroke" />
          </g>
        ))}
      </svg>
      <span data-packet className="show-packet absolute top-[42%] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ left: "12.5%" }} />
      {FLOW_NODES.map(({ icon: Icon, label }, i) => (
        <div key={label} className="absolute top-[42%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5" style={{ left: `${NODE_X[i]}%` }}>
          <div data-node className="show-node relative flex size-10 items-center justify-center rounded-xl">
            {i === 0 && <span data-ring className="show-ring absolute inset-0 rounded-xl" />}
            <span data-node-done className="show-node-done absolute -inset-px rounded-xl" />
            <Icon className="relative size-4" />
            <span data-check className="show-check absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full">
              <Check className="size-2.5" strokeWidth={3.5} />
            </span>
          </div>
          <span className="text-[0.625rem] font-medium text-muted-foreground">{label}</span>
        </div>
      ))}
      <div data-chip className="show-chip absolute top-[6%] right-[4%] rounded-full px-2.5 py-1 text-[0.625rem] font-semibold">
        38 steps, none by hand
      </div>
      <div data-toast className="show-toast absolute bottom-[8%] left-1/2 flex w-[80%] -translate-x-1/2 items-center gap-2.5 rounded-xl px-3 py-2">
        <span className="show-toast-icon flex size-6 shrink-0 items-center justify-center rounded-full">
          <Check className="size-3.5" strokeWidth={3} />
        </span>
        <span className="min-w-0 leading-tight">
          <span className="block text-xs font-semibold">New client onboarded</span>
          <span className="block truncate text-[0.625rem] text-muted-foreground">Tasks, channels and welcome sent</span>
        </span>
      </div>
    </>
  );
}

function EditStage() {
  return (
    <>
      {FRAMES.map((frame, i) => (
        <Image
          key={frame.src}
          data-frame
          src={frame.src}
          alt={frame.alt}
          width={640}
          height={360}
          sizes="(min-width: 768px) 33vw, 82vw"
          loading="eager"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: i === FRAMES.length - 1 ? 1 : 0 }}
        />
      ))}
      <div data-chip className="show-chip-media absolute top-[6%] left-[4%] flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.625rem] font-semibold">
        <span className="show-rec size-1.5 rounded-full" /> 4K VSL
      </div>
      <div className="show-timeline absolute inset-x-[4%] bottom-[5%] h-[27%] rounded-lg px-2 py-1.5">
        <div data-clips className="flex h-[48%] gap-[2px]">
          {CLIPS.map((clip, i) => (
            <span
              key={i}
              data-clip={clip.filler ? "filler" : "keep"}
              className={clip.filler ? "show-clip-filler h-full rounded-[3px]" : "show-clip h-full rounded-[3px]"}
              style={{ flexGrow: clip.grow, flexBasis: 0 }}
            />
          ))}
        </div>
        <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="mt-[4%] block h-[30%] w-full">
          {WAVE.map((h, i) => (
            <rect key={i} x={i * 2.5} y={(10 - h) / 2} width="1.4" height={h} className="show-wave-bar" />
          ))}
        </svg>
        <span data-playhead className="show-playhead absolute top-0 bottom-0 w-px" style={{ left: "6%" }} />
        <span data-blade className="show-blade absolute -top-3 flex size-5 -translate-x-1/2 items-center justify-center rounded-full" style={{ left: "32%" }}>
          <Scissors className="size-3" />
        </span>
      </div>
    </>
  );
}

function AppStage() {
  return (
    <>
      <div className="show-chrome absolute inset-x-0 top-0 flex h-[13%] items-center gap-1 px-3">
        <span className="size-1.5 rounded-full bg-current opacity-30" />
        <span className="size-1.5 rounded-full bg-current opacity-30" />
        <span className="size-1.5 rounded-full bg-current opacity-30" />
        <span className="show-url ml-2 h-[45%] w-[38%] rounded-full" />
        <span data-live className="show-live ml-auto flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.5625rem] font-semibold">
          <span className="show-live-dot size-1.5 rounded-full" /> Live
        </span>
      </div>
      <div data-sidebar className="show-sidebar absolute top-[13%] bottom-0 left-0 w-[21%] space-y-[9%] px-[3%] pt-[8%]">
        {[70, 90, 60, 80].map((w) => (
          <span key={w} className="show-skel block h-1.5 rounded-full" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="absolute top-[20%] right-[4%] left-[25%] grid grid-cols-3 gap-[4%]">
        {KPIS.map((kpi) => (
          <div key={kpi.label} data-kpi className="show-kpi rounded-lg px-2 py-1.5">
            <span className="block text-[0.5625rem] text-muted-foreground">{kpi.label}</span>
            <span className="block text-base leading-tight font-semibold tabular-nums">
              <span data-count={kpi.value}>{kpi.value}</span>
              {kpi.suffix}
            </span>
          </div>
        ))}
      </div>
      <div className="show-chart absolute right-[4%] bottom-[7%] left-[25%] flex h-[38%] items-end gap-[4%] rounded-lg px-[4%] pt-[4%]">
        {BARS.map((h, i) => (
          <span key={i} data-bar className="show-bar flex-1 rounded-t-[3px]" style={{ height: `${h}%` }} />
        ))}
      </div>
    </>
  );
}

/* ── Each card's story, built paused from its first frame ── */

function flowTimeline(stage: HTMLElement) {
  const q = gsap.utils.selector(stage);
  const nodes = q("[data-node]");
  const tl = gsap.timeline({ paused: true });
  tl.fromTo(q("[data-wire]"), { strokeDashoffset: 1 }, { strokeDashoffset: 1, duration: 0 }, 0)
    .fromTo(q("[data-node-done]"), { autoAlpha: 0 }, { autoAlpha: 0, duration: 0 }, 0)
    .fromTo(q("[data-check]"), { scale: 0 }, { scale: 0, duration: 0 }, 0)
    .fromTo(q("[data-toast]"), { autoAlpha: 0, y: 18, scale: 0.85 }, { autoAlpha: 0, y: 18, scale: 0.85, duration: 0 }, 0)
    .fromTo(q("[data-chip]"), { autoAlpha: 0, scale: 0.5 }, { autoAlpha: 0, scale: 0.5, duration: 0 }, 0)
    .fromTo(q("[data-packet]"), { left: "12.5%", autoAlpha: 0 }, { left: "12.5%", autoAlpha: 0, duration: 0 }, 0)
    .fromTo(q("[data-ring]"), { scale: 0.8, autoAlpha: 0.9 }, { scale: 2.3, autoAlpha: 0, duration: 0.7, ease: "power2.out" }, 0.05);

  const done = (i: number, at: number) => {
    tl.to(nodes[i], { keyframes: { scale: [1, 1.2, 1] }, duration: 0.42, ease: "power2.out" }, at)
      .to(q("[data-node-done]")[i], { autoAlpha: 1, duration: 0.2 }, at)
      .to(q("[data-check]")[i], { scale: 1, duration: 0.35, ease: "back.out(3)" }, at + 0.08);
  };
  done(0, 0.15);
  NODE_X.slice(1).forEach((x, i) => {
    const at = 0.45 + i * 0.6;
    tl.to(q("[data-wire]")[i], { strokeDashoffset: 0, duration: 0.45, ease: "power1.inOut" }, at)
      .to(q("[data-packet]"), { autoAlpha: 1, duration: 0.1 }, at)
      .to(q("[data-packet]"), { left: `${x}%`, duration: 0.45, ease: "power1.inOut" }, at);
    done(i + 1, at + 0.42);
  });
  tl.to(q("[data-packet]"), { autoAlpha: 0, duration: 0.2 }, 2.3)
    .to(q("[data-toast]"), { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.8)" }, 2.35)
    .to(q("[data-chip]"), { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2.4)" }, 2.75)
    .to({}, { duration: 1.4 });
  return tl;
}

function editTimeline(stage: HTMLElement) {
  const q = gsap.utils.selector(stage);
  const frames = q("[data-frame]");
  const filler = q('[data-clip="filler"]');
  const tl = gsap.timeline({ paused: true });
  tl.fromTo(frames, { autoAlpha: 0, scale: 1 }, { autoAlpha: 0, scale: 1, duration: 0 }, 0)
    .fromTo(frames[0], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, 0)
    .fromTo(q("[data-chip]"), { autoAlpha: 0, scale: 0.5 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2.4)" }, 0.15)
    .fromTo(filler, { flexGrow: 11, autoAlpha: 1 }, { flexGrow: 11, autoAlpha: 1, duration: 0 }, 0)
    .fromTo(q("[data-blade]"), { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 0, scale: 0.4, duration: 0 }, 0)
    .fromTo(q("[data-playhead]"), { left: "6%" }, { left: "94%", duration: 3.2, ease: "none" }, 0.2)
    // Push in on the speaker beside the panel.
    .to(frames[0], { scale: 1.1, duration: 1, ease: "power2.inOut" }, 0.2)
    // Cut one: the blade drops, the filler goes, the timeline closes up.
    .to(q("[data-blade]"), { autoAlpha: 1, scale: 1, duration: 0.3, ease: "back.out(3)" }, 0.75)
    .to(filler, { flexGrow: 0, autoAlpha: 0, duration: 0.45, ease: "power3.inOut" }, 1.05)
    .to(q("[data-blade]"), { autoAlpha: 0, scale: 0.6, duration: 0.25 }, 1.35)
    .set(frames[0], { autoAlpha: 0 }, 1.2)
    .fromTo(frames[1], { autoAlpha: 1, scale: 1.12 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "expo.out" }, 1.2)
    // Cut two: straight to the full-screen statement.
    .fromTo(frames[2], { autoAlpha: 0, scale: 1.06 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power2.out" }, 2.4)
    .to({}, { duration: 1.2 });
  return tl;
}

function appTimeline(stage: HTMLElement) {
  const q = gsap.utils.selector(stage);
  const tl = gsap.timeline({ paused: true });
  tl.fromTo(q("[data-sidebar]"), { xPercent: -100, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" }, 0.05)
    .fromTo(q("[data-kpi]"), { autoAlpha: 0, scale: 0.6, y: 10 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(2)", stagger: 0.14 }, 0.35);
  q("[data-count]").forEach((el, i) => {
    const target = Number(el.getAttribute("data-count"));
    const counter = { value: 0 };
    tl.fromTo(
      counter,
      { value: 0 },
      { value: target, duration: 1.1, ease: "power2.out", onUpdate: () => { el.textContent = String(Math.round(counter.value)); } },
      0.45 + i * 0.14,
    );
  });
  tl.fromTo(q("[data-bar]"), { scaleY: 0 }, { scaleY: 1, duration: 0.6, ease: "back.out(1.6)", stagger: 0.07, transformOrigin: "50% 100%" }, 1.1)
    .fromTo(q("[data-live]"), { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: "back.out(3)" }, 2.1)
    .to({}, { duration: 1.6 });
  return tl;
}

const STAGES: Record<ServiceKey, { tone: string; Stage: () => React.JSX.Element; story: (stage: HTMLElement) => gsap.core.Timeline }> = {
  operations: { tone: "var(--teal-fg)", Stage: FlowStage, story: flowTimeline },
  video: { tone: "var(--coral-fg)", Stage: EditStage, story: editTimeline },
  product: { tone: "var(--violet-fg)", Stage: AppStage, story: appTimeline },
};

export function ServiceShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const root = rootRef.current;
      if (!root || !contextSafe) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-show-card]", root);
      const stages = cards.map((card) => card.querySelector<HTMLElement>("[data-show-stage]")!);
      const stories = services.map((service, i) => STAGES[service.key].story(stages[i]));
      // Every card starts on its finished frame; it replays its story when its turn comes.
      stories.forEach((story) => story.progress(1));
      if (prefersReducedMotion()) return;

      let active = -1;
      let next: gsap.core.Tween | null = null;

      const play = contextSafe((index: number) => {
        active = index;
        cards.forEach((card, i) => card.classList.toggle("is-active", i === index));

        gsap.timeline()
          .to(cards[index], { scale: 1.025, duration: 0.35, ease: "back.out(2)" })
          .to(stages[index], { autoAlpha: 0.2, duration: 0.18 }, 0)
          .add(() => stories[index].restart())
          .to(stages[index], { autoAlpha: 1, duration: 0.18 });
        cards.forEach((card, i) => {
          if (i !== index) gsap.to(card, { scale: 1, duration: 0.4, ease: "power2.out" });
        });

        next = gsap.delayedCall(stories[index].duration() + 0.6, () => play((index + 1) % cards.length));
      });

      // Start the loop the first time the services come into view; pause it while they're off screen.
      const io = new IntersectionObserver(
        ([entry]) => {
          if (active < 0) {
            if (entry.isIntersecting) play(0);
            return;
          }
          const method = entry.isIntersecting ? "resume" : "pause";
          stories[active][method]();
          next?.[method]();
        },
        { threshold: 0.25 },
      );
      io.observe(root);

      return () => {
        next?.kill();
        io.disconnect();
      };
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="grid gap-14 lg:grid-cols-3 lg:gap-8">
      {services.map((service, i) => {
        const { tone, Stage } = STAGES[service.key];
        return (
          <FadeIn key={service.key} delay={i * 70}>
            <div className="flex h-full max-w-xl flex-col gap-4 lg:max-w-none">
              <div data-show-card className="show-card mb-2 overflow-hidden rounded-2xl" style={{ "--tone": tone } as CSSProperties}>
                <div data-show-stage className="show-stage relative aspect-video overflow-hidden" aria-hidden="true">
                  <Stage />
                </div>
              </div>
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="quiet-text text-sm leading-6">{service.summary}</p>
              <ul className="space-y-2 text-sm">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: tone }} aria-hidden="true" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-2 text-sm font-medium leading-6 text-foreground/80">{service.proof}</p>
              <Link
                href={`/work?service=${service.key}`}
                className="focusable inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-primary hover:text-foreground"
              >
                {/* Lowercase the first letter only, so "AI" keeps its capitals */}
                See {service.title.replace(/^[A-Z](?=[a-z])/, (c) => c.toLowerCase())} work <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}
