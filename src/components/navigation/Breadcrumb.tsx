"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  if (items.length === 0) {
    return null;
  }

  const lastItem = items[items.length - 1];
  const backItem = items[items.length - 2];

  if (!backItem) {
    return null;
  }

  return (
    <div className={cn("flex items-center gap-2 mb-6 text-sm", className)}>
      <Link
        href={backItem.href}
        className="focusable group flex items-center gap-1.5 rounded-md border border-transparent px-2 py-1.5 text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        {backItem.label}
      </Link>
      <span className="text-muted-foreground/50">/</span>
      <span className="font-medium text-foreground">{lastItem.label}</span>
    </div>
  );
}
