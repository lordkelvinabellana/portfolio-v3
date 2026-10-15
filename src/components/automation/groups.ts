import type { AUTOMATION_GROUPS } from "@/data/automations";

export type AutomationGroup = (typeof AUTOMATION_GROUPS)[number];

export const GROUP_INFO: Record<AutomationGroup, { label: string; color: string; intro: string; link?: { href: string; label: string } }> = {
  "Client operations for a Google Ads agency": {
    label: "Client operations",
    color: "var(--primary)",
    intro:
      "Workflows that run a Google Ads agency's client operations across Typeform, ClickUp, Slack, Shopify and Google Ads, built at Penguin Ops. The client stays anonymous.",
    link: { href: "/work/google-ads-agency-operations", label: "Read the case study" },
  },
  "AI agents and assistants": {
    label: "AI agents",
    color: "var(--violet-fg)",
    intro: "Agents with memory and tools, from the bot in the corner of this page to a Telegram assistant that runs a calendar and an inbox.",
  },
  "Pipelines, intake and alerts": {
    label: "Pipelines and alerts",
    color: "var(--teal-fg)",
    intro: "Scheduled and event-driven flows with validation, de-duplication and their own error alerts.",
  },
};
