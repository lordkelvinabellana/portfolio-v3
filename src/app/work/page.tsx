import type { Metadata } from "next";
import { WorkSection } from "@/components/projects/WorkSection";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies and projects across SaaS product work, automation systems, startup MVPs, and freelance websites.",
};

export default function WorkPage() {
  return <WorkSection basePath="/work" showBreadcrumb={false} />;
}
