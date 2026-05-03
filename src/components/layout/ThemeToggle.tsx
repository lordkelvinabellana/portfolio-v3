"use client";

import { useTheme } from "@/components/theme/ThemeProvider";
import { Moon, Sun, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const CYCLE = ["time", "dark", "light"] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const next = CYCLE[(CYCLE.indexOf(theme as typeof CYCLE[number]) + 1) % CYCLE.length] ?? "time";

  const icon =
    theme === "time" ? <Clock className="h-4 w-4" /> :
    theme === "dark"  ? <Sun className="h-4 w-4" /> :
                        <Moon className="h-4 w-4" />;

  const label =
    theme === "time" ? "Auto (time-based) — click to override" :
    theme === "dark"  ? "Switch to light mode" :
                        "Switch to auto (time-based)";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(next)}
      className="h-11 w-11 text-muted-foreground hover:text-foreground"
      aria-label={label}
      suppressHydrationWarning
    >
      {icon}
    </Button>
  );
}
