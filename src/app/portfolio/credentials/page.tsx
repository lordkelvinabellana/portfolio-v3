import type { Metadata } from "next";
import { CredentialsPageView } from "@/components/portfolio/PortfolioViews";

export const metadata: Metadata = {
  title: "Credentials",
  description:
    "Certifications, badges, training, and recognitions for Lord Kelvin Abellana.",
};

export default function PortfolioCredentialsPage() {
  return <CredentialsPageView />;
}
