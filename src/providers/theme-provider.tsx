"use client";

import { useState, useEffect } from "react";

import { useAtom } from "jotai";

import { themeAtom } from "@/stores/themeStore";

export function ThemeProvider({ 
  children 
}: { 
  children: React.ReactNode;
}) {
  const [theme] = useAtom(themeAtom);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  // Prevent hydration mismatch by not rendering anything until mounted
  if (!mounted) {
    return null;
  }

  return children;
}

export function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom);
  return { theme, setTheme } as const;
}
