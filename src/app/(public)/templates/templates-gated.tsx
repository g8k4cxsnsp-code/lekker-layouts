"use client";

import Link from "next/link";
import { Lock, ArrowRight, Sparkles, UserPlus, LogIn } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function TemplatesGated() {
  return (
    <>
      <>
        {/* Hero */}
        <section className="bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="animate-fade-in-up text-center">
              <Badge variant="outline" className="mb-4">
                Templates
              </Badge>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Website Templates
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Professional, custom-coded website templates built with React &
                Next.js. Pick one, we brand it for your business, and you&apos;re
                live in days.
              </p>
            </div>
          </div>
        </section>

        {/* Gated Content */}
        <section className="py-20">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <div className="animate-fade-in-up animate-delay-200 rounded-2xl border-2 border-primary/30 bg-card p-8 sm:p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Lock size={32} className="text-primary" />
              </div>

              <h2 className="mt-6 font-heading text-2xl font-bold text-foreground">
                Create an Account to Access Templates
              </h2>
              <p className="mt-3 text-muted-foreground">
                Sign up for free to browse our full template collection.
                Templates auto-fill with your business details for a
                personalised preview.
              </p>

              <div className="mt-8 space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Auto-filled with your brand",
                    "Live preview before buying",
                    "Custom-coded in React",
                    "Mobile-responsive designs",
                  ].map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm text-foreground"
                    >
                      <Sparkles size={14} className="shrink-0 text-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/register"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "gap-2 px-8 glow-primary"
                  )}
                >
                  <UserPlus size={16} />
                  Join Free
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "gap-2 px-8"
                  )}
                >
                  <LogIn size={16} />
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    </>
  );
}
