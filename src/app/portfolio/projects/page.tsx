import type { Metadata } from "next";
import { WorkSection } from "@/components/projects/WorkSection";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Project case studies across SaaS product work, freelance websites, startup MVPs, automation, and personal tools.",
};

export default function PortfolioProjectsPage() {
  return <WorkSection />;
}
