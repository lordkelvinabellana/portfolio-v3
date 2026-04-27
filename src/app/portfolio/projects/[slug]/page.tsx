import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailSection } from "@/components/projects/ProjectDetailSection";
import { getProjectCaseStudy, projectCaseStudies } from "@/data/portfolio";

export function generateStaticParams() {
  return projectCaseStudies.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectCaseStudy(slug);

  if (!project) {
    return { title: "Project" };
  }

  return {
    title: project.title,
    description: project.overview,
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectCaseStudy(slug);

  if (!project) notFound();

  return <ProjectDetailSection project={project} />;
}
