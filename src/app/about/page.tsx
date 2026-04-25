import type { Metadata } from "next";
import { AboutSection } from "@/components/about/AboutSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Lord Kelvin Abellana, a frontend developer and automation builder with product ownership experience.",
};

export default function AboutPage() {
  return <AboutSection />;
}
