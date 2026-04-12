"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Template } from "@/data/templates";

interface TemplateDetailContentProps {
  template: Template;
}

export function TemplateDetailContent({ template }: TemplateDetailContentProps) {
  return (
    <>
      <>
        {/* Hero */}
        <section className="bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/templates"
              className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft size={16} />
              Back to Templates
            </Link>

            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              {/* Info */}
              <div>
                <Badge variant="outline" className="mb-4">
                  {template.category}
                </Badge>
                <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  {template.name}
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  {template.longDescription}
                </p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-heading text-4xl font-bold text-foreground">
                    R{template.price.toLocaleString()}
                  </span>
                  <Badge
                    variant={
                      template.tier === "premium" ? "default" : "secondary"
                    }
                  >
                    {template.tier === "premium" ? "Premium" : "Starter"}
                  </Badge>
                </div>

                {/* Features */}
                <div className="mt-8">
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    What&apos;s Included
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {template.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Check size={14} className="text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href={`/checkout?type=template&slug=${template.slug}`}
                    className={cn(buttonVariants({ size: "lg" }), "gap-2 glow-primary")}
                  >
                    Pay 50% Deposit — R{Math.round(template.price / 2).toLocaleString()}
                    <ArrowRight size={18} />
                  </Link>
                  <Link
                    href={template.previewUrl}
                    target="_blank"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "gap-2"
                    )}
                  >
                    <ExternalLink size={18} />
                    Live Preview
                  </Link>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  50% deposit to start. Remaining R{Math.round(template.price / 2).toLocaleString()} due on delivery.
                </p>
              </div>

              {/* Live Preview */}
              <div className="relative overflow-hidden rounded-xl border border-border bg-muted">
                <div className="aspect-[4/3] overflow-hidden">
                  <iframe
                    src={template.previewUrl}
                    title={`${template.name} preview`}
                    className="pointer-events-none origin-top-left"
                    style={{
                      width: "1280px",
                      height: "960px",
                      transform: "scale(0.46)",
                      transformOrigin: "top left",
                    }}
                    loading="lazy"
                    tabIndex={-1}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </>
  );
}
