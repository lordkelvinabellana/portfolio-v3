import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { experiencePhases } from "@/data/portfolio";
import { FadeIn } from "@/components/ui/FadeIn";

const journey = [
  {
    label: "Engineering foundation",
    phase: "college",
    summary:
      "Computer Engineering gave me a hardware-and-software base: C, C++, Flutter, embedded systems, and thesis prototyping.",
  },
  {
    label: "College thesis",
    phase: "college",
    summary:
      "I built an IoT emergency serial messenger using NodeMCU ESP8266 and LoRa for areas without internet access.",
  },
  {
    label: "Early frontend work",
    phase: "alphaus",
    summary:
      "I shifted into frontend development through cloud cost management interfaces, reusable components, dashboards, and reports.",
  },
  {
    label: "Startup work",
    phase: "renthive",
    summary:
      "RentHive taught me how to turn a product idea into a focused MVP story under a fast startup timeline.",
  },
  {
    label: "Freelance work",
    phase: "freelance",
    summary:
      "Client projects sharpened my ability to communicate clearly and build within real constraints.",
  },
  {
    label: "Alphaus SaaS and product",
    phase: "alphaus",
    summary:
      "At Alphaus, I moved from frontend implementation into product ownership for Ripple and Flow.",
  },
  {
    label: "Current focus",
    phase: "automation",
    summary:
      "I’m focused on the overlap of product UI, workflow automation, and systems that reduce manual work.",
  },
];

export function AboutSection() {
  return (
    <section className="site-page">
      <div className="site-container space-y-16">
        <FadeIn>
          <div className="grid gap-12 md:grid-cols-[12rem_minmax(0,1fr)]">
            <div className="hidden md:block">
              <div className="panel overflow-hidden rounded-full p-1">
                <Image
                  src="/assets/profile.jpg"
                  alt="Lord Kelvin Abellana"
                  width={200}
                  height={200}
                  className="block rounded-full object-cover object-top"
                  style={{ width: 200, height: 200 }}
                />
              </div>
            </div>

            <div>
              <p className="eyebrow mb-3">About</p>
              <h1 className="section-heading">A practical builder shaped by engineering, SaaS, and automation.</h1>
              <div className="quiet-text mt-6 max-w-[68ch] space-y-5 text-base leading-7">
                <p>
                  I&apos;m Lord Kelvin Abellana, a frontend developer and automation
                  builder with a Computer Engineering foundation and product
                  ownership experience. I work best where interfaces, operations,
                  and real business workflows meet.
                </p>
                <p>
                  My path started with hardware and embedded systems, then moved
                  into SaaS frontend development, startup MVPs, freelance websites,
                  and automations that turn messy team handoffs into structured
                  systems.
                </p>
                <p>
                  Today, I care about building tools that feel considered: clear
                  enough for users, practical enough for teams, and grounded enough
                  to solve actual work instead of just looking polished.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        <section>
          <FadeIn>
            <p className="eyebrow mb-5">Journey</p>
          </FadeIn>
          <div className="grid gap-4">
            {journey.map((item, index) => {
              const phase = experiencePhases.find((entry) => entry.slug === item.phase);
              return (
                <FadeIn key={`${item.label}-${index}`} delay={index * 60}>
                  <Link
                    href={`/portfolio/experience/${item.phase}`}
                    className="panel panel-hover focusable grid gap-3 rounded-xl p-5 no-underline md:grid-cols-[12rem_minmax(0,1fr)_auto]"
                  >
                    <div>
                      <p className="muted-text text-sm font-medium">
                        {phase?.period ?? "Portfolio"}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">{item.label}</h2>
                      <p className="quiet-text mt-2 text-sm leading-6">{item.summary}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 self-center text-primary" />
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}
