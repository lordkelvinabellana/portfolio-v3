import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExperienceDetail } from "@/components/portfolio/PortfolioViews";
import { experiencePhases, getExperiencePhase } from "@/data/portfolio";

export function generateStaticParams() {
  return experiencePhases.map((phase) => ({ slug: phase.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const phase = getExperiencePhase(params.slug);

  if (!phase) {
    return { title: "Experience" };
  }

  return {
    title: phase.title,
    description: phase.summary,
  };
}

export default function ExperiencePhasePage({
  params,
}: {
  params: { slug: string };
}) {
  const phase = getExperiencePhase(params.slug);

  if (!phase) notFound();

  return <ExperienceDetail phase={phase} />;
}
