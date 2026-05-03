import Image from "next/image";
import { techGroups } from "@/data/portfolio";
import { FadeIn } from "@/components/ui/FadeIn";

const bentoCols: Record<string, string> = {
  "Frontend Frameworks & Styling": "md:col-span-2",
  "Programming Languages": "md:col-span-2",
  "Workflow Automation & Integrations": "md:col-span-3",
  "Analytics & Visualization": "md:col-span-1",
  "Developer Tools": "md:col-span-2",
  "Design & Collaboration Tools": "md:col-span-2",
};

export function TechStackSection() {
  return (
    <section className="site-page">
      <div className="site-container">
        <FadeIn>
          <p className="eyebrow mb-3">Capabilities</p>
          <h1 className="section-heading mb-12">Skills &amp; Tools</h1>
        </FadeIn>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {techGroups.map((group, gi) => (
            <FadeIn
              key={group.label}
              delay={gi * 60}
              spring
              className={bentoCols[group.label] ?? "md:col-span-2"}
            >
              <section className="panel h-full rounded-xl p-5">
                <h2 className="eyebrow mb-4">{group.label}</h2>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((tech) => (
                    <div
                      key={tech.name}
                      className="flex cursor-default items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2"
                    >
                      <Image
                        src={tech.logo}
                        alt=""
                        aria-hidden="true"
                        width={18}
                        height={18}
                        className="shrink-0 object-contain"
                        unoptimized
                      />
                      <span className="text-[13px] font-medium">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
