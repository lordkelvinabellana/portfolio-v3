import type { Metadata } from "next";
import { PortfolioHub } from "@/components/portfolio/PortfolioViews";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "A structured hub for Lord Kelvin Abellana's experience, project case studies, and credentials.",
};

export default function PortfolioPage() {
  return <PortfolioHub />;
}
