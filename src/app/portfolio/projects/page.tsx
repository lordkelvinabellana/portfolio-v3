import { Suspense } from "react";
import type { Metadata } from "next";
import { WorkGrid, WorkSection } from "@/components/projects/WorkSection";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies in operations systems and automation, VSL and ad editing, and product and web apps.",
};

export default function PortfolioProjectsPage() {
  return (
    <Suspense fallback={<WorkGrid active="all" />}>
      <WorkSection />
    </Suspense>
  );
}
