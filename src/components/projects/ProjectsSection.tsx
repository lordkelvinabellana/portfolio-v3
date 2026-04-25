"use client";

import { octoProjects, freelanceProjects, automationProjects } from "@/data/portfolio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectCard } from "./ProjectCard";
import { CertificationsGrid } from "./CertificationsGrid";
import { FadeIn } from "@/components/ui/FadeIn";

const tabs = [
  { value: "octo", label: "Octo", projects: octoProjects },
  { value: "freelance", label: "Freelance", projects: freelanceProjects },
  { value: "automation", label: "Automation", projects: automationProjects },
];

export function ProjectsSection() {
  return (
    <section className="site-page">
      <div className="site-container">
        <FadeIn>
          <p className="eyebrow mb-3">Selected work</p>
          <h1 className="section-heading mb-10">
            Projects
          </h1>
        </FadeIn>

        <FadeIn delay={60}>
          <Tabs defaultValue="octo">
            <TabsList
              className="panel mb-8 h-auto gap-1 rounded-lg p-1"
            >
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="min-h-10 px-3"
                  style={{ borderRadius: 5, fontSize: 14, fontWeight: 600 }}
                >
                  {tab.label}
                  <span className="muted-text ml-1.5 text-xs font-medium">
                    {tab.projects.length}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {tab.projects.map((project, i) => (
                    <FadeIn key={i} delay={i * 60} spring>
                      <ProjectCard project={project} />
                    </FadeIn>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </FadeIn>

        <CertificationsGrid />
      </div>
    </section>
  );
}
