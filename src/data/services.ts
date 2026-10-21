import type { ProjectCaseStudy } from "./portfolio";

export type ServiceKey = "operations" | "video" | "product";

export type Service = {
  key: ServiceKey;
  title: string;
  summary: string;
  deliverables: string[];
  proof: string;
  categories: ProjectCaseStudy["category"][];
};

export const services: Service[] = [
  {
    key: "operations",
    title: "Operations & automation",
    summary:
      "Client portals, scorecards and onboarding automation that replace manual checklists and spreadsheets your team has outgrown.",
    deliverables: [
      "Client portals and KPI dashboards",
      "n8n and Make automation across your tools",
      "A side-by-side run before the switch, then a full handover",
    ],
    proof: "One form now runs a 38-node client onboarding workflow for a Google Ads agency.",
    categories: ["Operations", "Automation"],
  },
  {
    key: "video",
    title: "AI video editing",
    summary:
      "VSLs, short-form ads and testimonials made with an AI editing workflow I built. AI does the heavy lifting; I direct the edit and check every cut against your brand.",
    deliverables: [
      "Long-form VSLs with on-brand motion graphics",
      "Vertical ads with the hook on screen from the first frame",
      "Testimonials matched to your brand's look and sound",
    ],
    proof: "A 35-minute VSL, four ads and two testimonials for Clipt, all from one brand system.",
    categories: ["Video & Motion"],
  },
  {
    key: "product",
    title: "Product & web apps",
    summary:
      "Web apps, MVPs and SaaS interfaces taken from a written spec to production, with tests and a clean handover.",
    deliverables: [
      "Next.js and Supabase apps",
      "SaaS dashboards and UI design in Figma",
      "Websites for service businesses",
    ],
    proof: "Led frontend for a cloud-cost SaaS before moving up to Product Owner.",
    categories: ["Product", "Startup", "Client Work"],
  },
];

export const serviceFilters = [
  { key: "all", label: "All work" },
  ...services.map((s) => ({ key: s.key, label: s.title })),
  { key: "personal", label: "Personal" },
] as const;

export type ServiceFilter = (typeof serviceFilters)[number]["key"];

export function serviceOf(project: ProjectCaseStudy): ServiceFilter {
  if (project.category === "Personal") return "personal";
  return services.find((s) => s.categories.includes(project.category))?.key ?? "product";
}

export function serviceLabel(project: ProjectCaseStudy) {
  const key = serviceOf(project);
  if (key === "personal") return "Personal";
  return services.find((s) => s.key === key)?.title ?? project.category;
}

export function serviceColor(project: ProjectCaseStudy) {
  switch (serviceOf(project)) {
    case "operations": return "var(--teal-fg)";
    case "video": return "var(--coral-fg)";
    case "personal": return "var(--amber-fg)";
    default: return "var(--violet-fg)";
  }
}
