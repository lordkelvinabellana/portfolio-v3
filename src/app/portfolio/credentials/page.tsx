import type { Metadata } from "next";
import { CredentialsSection } from "@/components/credentials/CredentialsSection";

export const metadata: Metadata = {
  title: "Credentials",
  description:
    "Certifications, badges, training, and recognitions for Lord Kelvin Abellana.",
};

export default function PortfolioCredentialsPage() {
  return <CredentialsSection />;
}
