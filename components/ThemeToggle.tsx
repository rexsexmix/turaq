"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-border bg-surface-secondary text-text-primary transition duration-200 hover:scale-105 hover:bg-surface focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface"
      aria-label={isDark ? "Переключить на светлую тему" : "Переключить на тёмную тему"}
    >
      {isDark ? <Moon className="h-5 w-5" aria-hidden /> : <Sun className="h-5 w-5" aria-hidden />}
    </button>
  );
}
