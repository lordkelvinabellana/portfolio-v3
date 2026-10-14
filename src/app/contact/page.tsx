import type { Metadata } from "next";
import { ContactSection } from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Hire Lord Kelvin Abellana for operations systems, automation, web apps, or VSL and ad editing, or get his résumé for a role.",
};

export default function ContactPage() {
  return <ContactSection />;
}
