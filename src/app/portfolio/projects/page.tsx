import type { Metadata } from "next";
import { ProjectsIndex } from "@/components/portfolio/PortfolioViews";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Project case studies across SaaS product work, freelance websites, startup MVPs, automation, and personal tools.",
};

export default function PortfolioProjectsPage() {
  return <ProjectsIndex />;
}
