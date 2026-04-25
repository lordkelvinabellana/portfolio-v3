import type { Metadata } from "next";
import { ExperienceIndexSection } from "@/components/experience/ExperienceIndexSection";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Experience phases across engineering, SaaS product work, freelance projects, startup work, and automation.",
};

export default function PortfolioExperiencePage() {
  return <ExperienceIndexSection />;
}
