import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AutomationDetail } from "@/components/automation/AutomationDetail";
import { automations } from "@/data/automations";
import { automationStories } from "@/data/automationStories";

export function generateStaticParams() {
  return automations.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const automation = automations.find((a) => a.id === id);
  if (!automation) return { title: "Automation" };
  const story = automationStories[id];
  return {
    title: automation.title,
    description: story ? `${story.short} ${story.problem}` : automation.caption,
  };
}

export default async function AutomationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const automation = automations.find((a) => a.id === id);
  if (!automation) notFound();
  return <AutomationDetail automation={automation} />;
}
