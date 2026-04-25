import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailSection } from "@/components/projects/ProjectDetailSection";
import { getProjectCaseStudy, projectCaseStudies } from "@/data/portfolio";

export function generateStaticParams() {
  return projectCaseStudies.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProjectCaseStudy(params.slug);

  if (!project) {
    return { title: "Project" };
  }

  return {
    title: project.title,
    description: project.overview,
  };
}

export default function ProjectCaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectCaseStudy(params.slug);

  if (!project) notFound();

  return <ProjectDetailSection project={project} />;
}
