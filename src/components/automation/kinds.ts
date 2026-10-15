import type { WorkflowNodeKind } from "@/data/workflows";

/* Node colours and names, shared by the full canvas and the gallery thumbnails. */

export const KIND_COLOR: Record<WorkflowNodeKind, string> = {
  trigger: "var(--coral-fg)",
  code: "var(--amber-fg)",
  http: "var(--primary)",
  if: "var(--teal-fg)",
  slack: "var(--violet-fg)",
  ai: "var(--violet-fg)",
  noop: "var(--text-tertiary)",
  ads: "var(--status)",
  form: "var(--primary)",
  data: "var(--teal-fg)",
  mail: "var(--coral-fg)",
  chat: "var(--violet-fg)",
};

export const KIND_LABEL: Record<WorkflowNodeKind, string> = {
  trigger: "Trigger",
  code: "Code",
  http: "HTTP request",
  if: "If",
  slack: "Slack",
  ai: "AI",
  noop: "No operation",
  ads: "Google Ads",
  form: "Form",
  data: "Data",
  mail: "Email",
  chat: "Chat",
};
