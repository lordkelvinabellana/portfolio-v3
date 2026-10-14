import type { Metadata } from "next";
import { Barlow_Condensed, Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://portfolio-v3-roan-omega.vercel.app";
const SITE_DESCRIPTION =
  "Operations systems, automation and video editing for agencies and growing brands: client portals, scorecards, onboarding automation, VSLs and short-form ads.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Lord Kelvin Abellana",
    title: "Portfolio: operations systems, automation and video editing",
    description:
      "Case studies with real numbers, live n8n workflows, and VSL and ad work for agencies and growing brands.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Lord Kelvin Abellana: systems that run your business, videos that sell it" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.jpg"],
  },
  title: {
    default: "Lord Kelvin Abellana - Portfolio",
    template: "%s - Lord Kelvin Abellana",
  },
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${barlowCondensed.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'time';var r;if(t==='light')r='light';else if(t==='dark')r='dark';else if(t==='time'){var h=new Date().getHours();r=(h>=6&&h<18)?'light':'dark';}else r=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.classList.add(r);document.documentElement.style.colorScheme=r;if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion');}catch(e){}})()`,
          }}
        />
      </head>
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
