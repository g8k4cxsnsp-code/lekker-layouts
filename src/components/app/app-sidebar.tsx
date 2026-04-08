"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Newspaper,
  Search,
  MessageCircle,
  ShoppingBag,
  Crown,
  Bell,
  User,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LekkerLogo } from "@/components/ui/navbar";

const navItems = [
  { label: "Feed", href: "/feed", icon: Newspaper },
  { label: "My Network", href: "/connections", icon: Users },
  { label: "Discover", href: "/discover", icon: Search },
  { label: "Messages", href: "/messages", icon: MessageCircle },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Products", href: "/tools", icon: ShoppingBag },
  { label: "Premium", href: "/premium", icon: Crown },
];

const bottomItems = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:border-border/30 lg:bg-background">
        {/* Logo */}
        <div className="flex h-16 items-center px-6 border-b border-border/30">
          <Link href="/feed">
            <LekkerLogo />
          </Link>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom items */}
        <div className="border-t border-border/30 px-3 py-4 space-y-1">
          {bottomItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Mobile bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-border/30 bg-background/95 backdrop-blur-xl lg:hidden">
        {[
          { label: "Feed", href: "/feed", icon: Newspaper },
          { label: "Discover", href: "/discover", icon: Search },
          { label: "Messages", href: "/messages", icon: MessageCircle },
          { label: "Alerts", href: "/notifications", icon: Bell },
          { label: "Profile", href: "/profile", icon: User },
        ].map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 text-xs transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon size={22} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
