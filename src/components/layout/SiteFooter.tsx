import Link from "next/link";
import { CV_FILENAME, CV_HREF, EMAIL, RESUME_FILENAME, RESUME_HREF, socialLinks } from "./social";

const links = [
  { href: "/work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid w-full max-w-[72rem] gap-10 px-[clamp(1.25rem,4vw,3.5rem)] py-12 md:grid-cols-[minmax(0,1fr)_auto_auto]">
        <div className="max-w-sm space-y-3">
          <p className="font-semibold">Lord Kelvin Abellana</p>
          <p className="quiet-text text-sm leading-6">
            Operations systems, automation and AI video editing for agencies and growing brands. Based in the Philippines, working remotely.
          </p>
          <a href={`mailto:${EMAIL}`} className="focusable inline-block rounded-sm text-sm font-semibold text-primary hover:text-foreground">
            {EMAIL}
          </a>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 text-sm md:grid-cols-1 md:gap-y-2">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="focusable flex min-h-11 items-center rounded-sm text-muted-foreground hover:text-foreground md:min-h-0">
              {label}
            </Link>
          ))}
        </nav>

        <div className="space-y-3 text-sm">
          <div className="flex gap-1">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="focusable flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <div className="flex flex-col md:gap-1.5">
            <a href={RESUME_HREF} download={RESUME_FILENAME} className="focusable flex min-h-11 items-center rounded-sm text-muted-foreground hover:text-foreground md:min-h-0">
              Download résumé (PDF)
            </a>
            <a href={CV_HREF} download={CV_FILENAME} className="focusable flex min-h-11 items-center rounded-sm text-muted-foreground hover:text-foreground md:min-h-0">
              Download full CV (PDF)
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[72rem] px-[clamp(1.25rem,4vw,3.5rem)] pb-8">
        <p className="muted-text text-xs">© 2026 Lord Kelvin Abellana</p>
      </div>
    </footer>
  );
}
