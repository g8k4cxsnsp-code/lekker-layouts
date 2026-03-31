"use client";

import { useCallback, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleTheme = useCallback(() => {
    setIsAnimating(true);
    document.documentElement.classList.add("theme-transition");
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
      setIsAnimating(false);
    }, 700);
  }, [resolvedTheme, setTheme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`relative overflow-hidden transition-transform duration-300 ${isAnimating ? "scale-90" : "scale-100"}`}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-500 ease-out dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-500 ease-out dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
