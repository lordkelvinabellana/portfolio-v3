import type { Metadata } from "next";
import { AutomationsSection } from "@/components/automation/AutomationsSection";

export const metadata: Metadata = {
  title: "Automations",
  description:
    "n8n workflows by Lord Kelvin Abellana: client onboarding and reporting for a Google Ads agency, AI agents and assistants, and scheduled pipelines with their own alerts.",
};

export default function AutomationsPage() {
  return <AutomationsSection />;
}
