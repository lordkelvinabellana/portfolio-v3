import type { Metadata } from "next";
import { Barlow_Condensed, Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";
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

export const metadata: Metadata = {
  title: {
    default: "Lord Kelvin Abellana - Portfolio",
    template: "%s - Lord Kelvin Abellana",
  },
  description:
    "Frontend Developer & Automation Builder. Building clean interfaces and streamlining workflows.",
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
            __html: `(function(){try{var t=localStorage.getItem('theme')||'time';var r;if(t==='light')r='light';else if(t==='dark')r='dark';else if(t==='time'){var h=new Date().getHours();r=(h>=6&&h<18)?'light':'dark';}else r=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.classList.add(r);document.documentElement.style.colorScheme=r;}catch(e){}})()`,
          }}
        />
      </head>
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider>
          <div className="flex h-screen overflow-hidden">
            <aside className="hidden md:flex w-60 shrink-0 flex-col fixed inset-y-0 left-0 z-30">
              <Sidebar />
            </aside>

            <div className="flex flex-col flex-1 md:ml-60 overflow-y-auto min-h-screen">
              <MobileSidebar />
              <main className="flex-1">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
