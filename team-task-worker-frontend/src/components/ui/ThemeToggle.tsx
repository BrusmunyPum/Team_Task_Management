"use client";

import { useEffect, useState } from "react";
import { AppIcon } from "@/components/ui/AppIcon";

type ThemeMode = "light" | "dark";

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem("teamtask-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setTheme(getInitialTheme()));

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!theme) {
      return;
    }

    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("teamtask-theme", theme);
  }, [theme]);

  const visibleTheme = theme ?? "light";
  const nextTheme = visibleTheme === "dark" ? "light" : "dark";

  return (
    <button
      className="icon-button topbar-icon theme-toggle"
      type="button"
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      onClick={() => setTheme(nextTheme)}
    >
      <AppIcon name={visibleTheme === "dark" ? "sun" : "moon"} />
    </button>
  );
}
