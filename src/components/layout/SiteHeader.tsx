"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Download, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";
import { RESUME_FILENAME, RESUME_HREF, socialLinks } from "./social";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/work", label: "Work" },
  { href: "/automations", label: "Automations" },
  { href: "/#services", label: "Services" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
];

function isActive(pathname: string, href: string) {
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header sticky top-0 z-40 border-b border-border">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="mx-auto flex h-16 w-full max-w-[72rem] items-center gap-6 px-[clamp(1.25rem,4vw,3.5rem)]">
        <Link href="/" className="focusable flex shrink-0 items-center gap-2.5 rounded-md no-underline">
          <span className="relative h-8 w-8 overflow-hidden rounded-full border border-border">
            <Image src="/assets/profile.jpg" alt="" fill sizes="32px" className="object-cover object-top" priority />
          </span>
          <span className="text-sm font-semibold leading-tight">
            Lord Kelvin Abellana
          </span>
        </Link>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-1 md:flex">
          {navItems.map(({ href, label }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "focusable rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <ThemeToggle />
          <a
            href={RESUME_HREF}
            download={RESUME_FILENAME}
            className="focusable hidden min-h-10 items-center gap-1.5 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground lg:inline-flex"
          >
            <Download className="h-3.5 w-3.5" /> Résumé
          </a>
          <Link
            href="/contact"
            className="focusable hidden min-h-10 items-center rounded-md border border-primary bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:inline-flex"
          >
            Hire me
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="focusable flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" strokeWidth={1.6} />
          </button>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-72 p-0">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <nav aria-label="Main" className="flex flex-col gap-1 p-4 pt-14">
            {[{ href: "/", label: "Home" }, ...navItems].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={isActive(pathname, href) || (href === "/" && pathname === "/") ? "page" : undefined}
                className="focusable flex min-h-11 items-center rounded-md px-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto space-y-3 border-t border-border p-4">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="focusable flex min-h-11 items-center justify-center rounded-md border border-primary bg-primary text-sm font-semibold text-primary-foreground"
            >
              Hire me
            </Link>
            <a
              href={RESUME_HREF}
              download={RESUME_FILENAME}
              className="focusable flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-secondary text-sm font-semibold text-secondary-foreground"
            >
              <Download className="h-4 w-4" /> Download résumé
            </a>
            <div className="flex justify-center gap-1 pt-1">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="focusable flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
