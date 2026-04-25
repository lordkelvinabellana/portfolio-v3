import { experiences } from "@/data/portfolio";
import { ExperienceCard } from "./ExperienceCard";
import { FadeIn } from "@/components/ui/FadeIn";

export function ExperienceSection() {
  return (
    <section className="site-page">
      <div className="site-container max-w-4xl">
        <FadeIn>
          <p className="eyebrow mb-3">Experience</p>
          <h1 className="section-heading mb-12">
            Work Experience
          </h1>
        </FadeIn>

        <div>
          {experiences.map((item, i) => (
            <FadeIn key={i} delay={i * 80} spring>
              <ExperienceCard item={item} isLast={i === experiences.length - 1} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
