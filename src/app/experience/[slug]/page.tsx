import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExperienceDetailSection } from "@/components/experience/ExperienceDetailSection";
import { experiencePhases, getExperiencePhase } from "@/data/portfolio";

export function generateStaticParams() {
  return experiencePhases.map((phase) => ({ slug: phase.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const phase = getExperiencePhase(slug);

  if (!phase) {
    return { title: "Experience" };
  }

  return {
    title: phase.title,
    description: phase.summary,
  };
}

export default async function ExperiencePhasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const phase = getExperiencePhase(slug);

  if (!phase) notFound();

  return <ExperienceDetailSection phase={phase} />;
}
