"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, CornerDownRight, Download, Menu } from "lucide-react";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";
import { RESUME_FILENAME, RESUME_HREF, socialLinks } from "./social";
import { cn } from "@/lib/utils";

/* Work is grouped by service, with the n8n gallery under operations, so every
   kind of work sits one level down instead of some getting their own top link. */
const workGroups = [
  {
    href: "/work?service=operations",
    label: "Operations & automation",
    blurb: "Client portals, scorecards and onboarding automation",
    tone: "var(--teal-fg)",
    sub: { href: "/automations", label: "n8n workflow gallery" },
  },
  { href: "/work?service=video", label: "AI video editing", blurb: "VSLs, ads and testimonials, edited with AI", tone: "var(--coral-fg)" },
  { href: "/work?service=product", label: "Product & web apps", blurb: "Web apps, MVPs and SaaS interfaces", tone: "var(--violet-fg)" },
  { href: "/work?service=personal", label: "Personal projects", blurb: "Hatstand, Portably and other things I build", tone: "var(--amber-fg)" },
];

const navItems = [
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
  const workActive = isActive(pathname, "/work") || isActive(pathname, "/automations");

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

        <NavigationMenu.Root aria-label="Main" className="ml-auto hidden md:block">
          <NavigationMenu.List className="flex items-center gap-1">
            <NavigationMenu.Item>
              <NavigationMenu.Trigger
                className={cn(
                  "focusable inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors data-[popup-open]:text-foreground",
                  workActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                Work
                <NavigationMenu.Icon className="transition-transform duration-200 data-[popup-open]:rotate-180">
                  <ChevronDown className="h-3.5 w-3.5" />
                </NavigationMenu.Icon>
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="w-[22rem] p-2">
                <ul className="space-y-0.5">
                  {workGroups.map((group) => (
                    <li key={group.href}>
                      <NavigationMenu.Link
                        render={<Link href={group.href} />}
                        className="focusable block rounded-lg px-3 py-2.5 no-underline transition-colors hover:bg-accent"
                      >
                        <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                          <span className="h-2 w-2 rounded-full" style={{ background: group.tone }} aria-hidden="true" />
                          {group.label}
                        </span>
                        <span className="mt-0.5 block pl-4 text-xs leading-5 text-muted-foreground">{group.blurb}</span>
                      </NavigationMenu.Link>
                      {group.sub && (
                        <NavigationMenu.Link
                          render={<Link href={group.sub.href} />}
                          className="focusable ml-7 flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground no-underline transition-colors hover:bg-accent hover:text-foreground"
                        >
                          <CornerDownRight className="h-3 w-3" aria-hidden="true" /> {group.sub.label}
                        </NavigationMenu.Link>
                      )}
                    </li>
                  ))}
                </ul>
                <NavigationMenu.Link
                  render={<Link href="/work" />}
                  className="focusable mt-1.5 flex items-center justify-between rounded-lg border-t border-border px-3 pt-3 pb-2 text-sm font-semibold text-primary no-underline hover:text-foreground"
                >
                  All work <ArrowRight className="h-3.5 w-3.5" />
                </NavigationMenu.Link>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            {navItems.map(({ href, label }) => {
              const active = isActive(pathname, href);
              return (
                <NavigationMenu.Item key={href}>
                  <NavigationMenu.Link
                    render={<Link href={href} />}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "focusable inline-flex rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {label}
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              );
            })}
          </NavigationMenu.List>
          <NavigationMenu.Portal>
            {/* The ::before strip bridges the gap under the trigger so the menu stays open on the way down */}
            <NavigationMenu.Positioner
              sideOffset={8}
              align="start"
              collisionPadding={16}
              className="z-50 before:absolute before:inset-x-0 before:-top-2 before:h-2 before:content-['']"
            >
              <NavigationMenu.Popup className="panel origin-[var(--transform-origin)] rounded-xl transition-[opacity,transform] duration-200 ease-out data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
                <NavigationMenu.Viewport />
              </NavigationMenu.Popup>
            </NavigationMenu.Positioner>
          </NavigationMenu.Portal>
        </NavigationMenu.Root>

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
            <SheetLink href="/" label="Home" current={pathname === "/"} onNavigate={() => setOpen(false)} />
            <p className="mt-3 px-3 text-xs font-medium text-muted-foreground">Work</p>
            <SheetLink href="/work" label="All work" current={pathname === "/work"} onNavigate={() => setOpen(false)} />
            {workGroups.map((group) => (
              <div key={group.href}>
                <SheetLink href={group.href} label={group.label} tone={group.tone} onNavigate={() => setOpen(false)} />
                {group.sub && (
                  <SheetLink href={group.sub.href} label={group.sub.label} current={isActive(pathname, group.sub.href)} nested onNavigate={() => setOpen(false)} />
                )}
              </div>
            ))}
            <div className="my-2 border-t border-border" />
            {navItems.map(({ href, label }) => (
              <SheetLink key={href} href={href} label={label} current={isActive(pathname, href)} onNavigate={() => setOpen(false)} />
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

function SheetLink({
  href,
  label,
  tone,
  nested = false,
  current = false,
  onNavigate,
}: {
  href: string;
  label: string;
  tone?: string;
  nested?: boolean;
  current?: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={current ? "page" : undefined}
      className={cn(
        "focusable flex min-h-11 items-center gap-2.5 rounded-md px-3 font-medium transition-colors hover:bg-accent aria-[current=page]:bg-accent",
        nested ? "ml-5 text-sm text-muted-foreground" : "text-base text-foreground",
      )}
    >
      {tone && <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: tone }} aria-hidden="true" />}
      {nested && <CornerDownRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
      {label}
    </Link>
  );
}
