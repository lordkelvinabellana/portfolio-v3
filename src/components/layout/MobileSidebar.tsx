"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-background/92 px-4 py-3 backdrop-blur md:hidden"
    >
      <button
        onClick={() => setOpen(true)}
        className="focusable flex h-11 w-11 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        aria-label="Open navigation"
      >
        <Menu className="h-4 w-4" strokeWidth={1.5} />
      </button>

      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">
          Lord Kelvin
        </span>
        <span className="status-dot" title="Open to opportunities" aria-label="Open to opportunities" />
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0 w-60">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Sidebar onNavClick={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
