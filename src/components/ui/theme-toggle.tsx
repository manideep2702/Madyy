"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const html = document.documentElement;
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = stored ? stored === "dark" : prefersDark;
    if (initialDark) html.classList.add("dark");
    else html.classList.remove("dark");
    setIsDark(initialDark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    const html = document.documentElement;
    if (next) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-xs font-medium shadow-sm transition-colors hover:bg-muted",
        className
      )}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
      <span>{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}

