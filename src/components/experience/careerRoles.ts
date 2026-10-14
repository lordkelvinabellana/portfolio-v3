import { experiencePhases } from "@/data/portfolio";

/* Which kind of work each phase was, for the colours on the 3D career path. */
const KIND: Record<string, "operations" | "video" | "product"> = {
  "penguin-ops": "operations",
  stakra: "operations",
  clipt: "video",
  "retail-group": "operations",
  flexiwork: "product",
  ardexa: "product",
  clix: "operations",
  alphaus: "product",
  automation: "operations",
  freelance: "product",
  renthive: "product",
  college: "product",
  personal: "product",
};

export const careerRoles = experiencePhases.map((phase) => ({
  kind: KIND[phase.slug] ?? "product",
  current: /present/i.test(phase.period),
}));

export const careerIndex = (slug: string) => experiencePhases.findIndex((phase) => phase.slug === slug);
