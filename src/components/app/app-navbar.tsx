"use client";

import Link from "next/link";
import { Bell, Search, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { signOut } from "@/lib/actions/auth";

interface AppNavbarProps {
  userName?: string;
}

export function AppNavbar({ userName }: AppNavbarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/30 bg-background/70 px-4 backdrop-blur-xl sm:px-6 lg:pl-72">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <Link
          href="/discover"
          className="flex items-center gap-2 rounded-lg border border-input bg-muted/50 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted"
        >
          <Search size={16} />
          Search businesses...
        </Link>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Link
          href="/notifications"
          className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Bell size={20} />
        </Link>
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            title="Sign out"
          >
            <LogOut size={20} />
          </button>
        </form>
      </div>
    </header>
  );
}
