"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  BriefcaseBusiness,
  Mail,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

type NavSubItem = {
  href: string;
  label: string;
};

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  subItems?: NavSubItem[];
};

const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  {
    href: "/portfolio",
    label: "Portfolio",
    icon: BriefcaseBusiness,
    subItems: [
      { href: "/portfolio", label: "Overview" },
      { href: "/portfolio/experience", label: "Experience" },
      { href: "/portfolio/projects", label: "Projects" },
      { href: "/portfolio/credentials", label: "Credentials" },
    ],
  },
  { href: "/about", label: "About", icon: User },
  { href: "/contact", label: "Contact", icon: Mail },
];

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const socialLinks = [
  {
    href: "https://linkedin.com/in/lordkelvinabellana",
    label: "LinkedIn",
    Icon: LinkedInIcon,
  },
  {
    href: "https://github.com/lordkelvinabellana",
    label: "GitHub",
    Icon: GitHubIcon,
  },
  {
    href: "https://wa.me/639285583697",
    label: "WhatsApp",
    Icon: MessageCircle,
  },
];

export function Sidebar({ onNavClick }: { onNavClick?: () => void }) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(() => {
    const init = new Set<string>();
    navItems.forEach(({ href, subItems }) => {
      if (subItems && pathname.startsWith(href)) init.add(href);
    });
    return init;
  });

  useEffect(() => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      navItems.forEach(({ href, subItems }) => {
        if (subItems && pathname.startsWith(href)) next.add(href);
      });
      return next;
    });
  }, [pathname]);

  const toggleExpand = (href: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(href)) {
      newExpanded.delete(href);
    } else {
      newExpanded.add(href);
    }
    setExpandedItems(newExpanded);
  };

  const isSubItemActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <div className="flex h-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 px-4 py-5">
        <div className="relative h-8 w-8 shrink-0">
          <Image
            src="/assets/profile.jpg"
            alt="Lord Kelvin"
            fill
            className="rounded-full object-cover object-top"
            style={{ border: "1px solid var(--sidebar-border)" }}
            priority
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p
              className="text-[13px] leading-tight truncate"
              style={{ fontWeight: 600 }}
            >
              Lord Kelvin
            </p>
            <span
              className="status-dot shrink-0"
              title="Open to opportunities"
              aria-label="Open to opportunities"
              role="img"
            />
          </div>
          <p className="text-[11px] truncate mt-0.5 text-muted-foreground">
            Frontend Developer
          </p>
        </div>
      </div>

      <div className="mx-3 h-px bg-sidebar-border" />

      <nav aria-label="Site navigation" className="flex-1 px-2 py-2 space-y-px overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon, subItems }) => {
          const isActive =
            pathname === href || (href !== "/" && pathname.startsWith(href));
          const isExpanded = expandedItems.has(href);
          const hasSubItems = subItems && subItems.length > 0;

          return (
            <div key={href}>
              <div
                className={cn("flex items-center", hasSubItems && "relative")}
              >
                {hasSubItems ? (
                  <>
                    <Link
                      href={href}
                      onClick={onNavClick}
                      className={cn(
                        "focusable flex min-h-11 flex-1 items-center gap-2.5 rounded-md border border-transparent px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-muted-foreground hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground",
                      )}
                      style={{ fontWeight: isActive ? 600 : 500 }}
                      aria-current={pathname === href ? "page" : undefined}
                    >
                      <Icon
                        className="h-3.5 w-3.5 shrink-0"
                        strokeWidth={isActive ? 2 : 1.5}
                      />
                      {label}
                    </Link>
                    <button
                      onClick={() => toggleExpand(href)}
                      className={cn(
                        "focusable ml-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-transparent transition-colors",
                        isActive
                          ? "text-sidebar-accent-foreground hover:bg-sidebar-accent"
                          : "text-muted-foreground hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground",
                      )}
                      aria-label={isExpanded ? `Collapse ${label}` : `Expand ${label}`}
                    >
                      <ChevronRight
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          isExpanded && "rotate-90",
                        )}
                        strokeWidth={1.5}
                      />
                    </button>
                  </>
                ) : (
                  <Link
                    href={href}
                    onClick={onNavClick}
                    className={cn(
                      "focusable flex min-h-11 flex-1 items-center gap-2.5 rounded-md border border-transparent px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-muted-foreground hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground",
                    )}
                    style={{
                      fontWeight: isActive ? 600 : 500,
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon
                      className="h-3.5 w-3.5 shrink-0"
                      strokeWidth={isActive ? 2 : 1.5}
                    />
                    {label}
                  </Link>
                )}
              </div>

              {hasSubItems && isExpanded && (
                <div
                  className="ml-2 mt-1 space-y-px border-l border-sidebar-border/50 pl-2 overflow-hidden"
                  style={{
                    animation: "slide-down 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                >
                  {subItems.map((subItem, idx) => {
                    const isSubActive = isSubItemActive(subItem.href);
                    return (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        onClick={onNavClick}
                        className={cn(
                          "focusable flex min-h-10 items-center rounded-md border border-transparent px-3 py-1.5 text-xs transition-colors",
                          isSubActive
                            ? "bg-sidebar-accent/60 text-sidebar-accent-foreground font-medium"
                            : "text-muted-foreground hover:bg-sidebar-accent/40 hover:text-sidebar-accent-foreground",
                        )}
                        style={{
                          animation: `slide-left 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${idx * 30}ms both`,
                        }}
                        aria-current={isSubActive ? "page" : undefined}
                      >
                        {subItem.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="mx-3 h-px bg-sidebar-border" />

      <div className="px-2 py-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-0.5">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="focusable flex h-11 w-11 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-colors hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
