"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-foreground py-20 sm:py-24 lg:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/20">
            <Sparkles size={28} className="text-primary" />
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-background sm:text-4xl lg:text-5xl">
            Ready to Grow Your Business?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-background/70">
            Join South African entrepreneurs who are building their networks,
            sharing their stories, and growing their brands on Lekker Layouts.
            It&apos;s completely free to get started.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className={cn(
                buttonVariants({ size: "lg" }),
                "gap-2 px-8 text-base font-semibold glow-primary"
              )}
            >
              Create Free Account
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/products"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-background/20 px-8 text-base font-semibold text-background hover:bg-background/10 hover:text-background"
              )}
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
