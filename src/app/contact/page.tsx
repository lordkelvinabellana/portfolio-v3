import type { Metadata } from "next";
import { ContactPageView } from "@/components/portfolio/PortfolioViews";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Lord Kelvin Abellana for frontend, product, automation, hiring, or freelance opportunities.",
};

export default function ContactPage() {
  return <ContactPageView />;
}
