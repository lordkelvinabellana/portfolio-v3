import { automations } from "@/data/automations";
import { FadeIn } from "@/components/ui/FadeIn";
import { ServiceGlyph3D } from "@/components/three/Scenes";
import { AutomationsGallery } from "./AutomationsGallery";

export function AutomationsSection() {
  const live = automations.filter((a) => a.live).length;
  return (
    <section className="site-page">
      <div className="site-container space-y-10">
        <FadeIn>
          <header className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] md:gap-10">
            <div className="max-w-2xl">
              <h1 className="section-heading">Automations</h1>
              <p className="quiet-text mt-5 text-lg leading-8">
                {`${automations.length} workflows I've built in n8n, drawn from their real exports with client names taken out. ${live} are running right now. Open one to see the problem it solves and how it runs.`}
              </p>
            </div>
            <ServiceGlyph3D service="operations" className="hidden h-36 md:block md:h-44" />
          </header>
        </FadeIn>
        <FadeIn delay={60}>
          <AutomationsGallery />
        </FadeIn>
      </div>
    </section>
  );
}
