"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { TemplatePreviewFrame } from "@/components/ui/template-preview-frame";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { templates, categories } from "@/data/templates";

interface TemplatesAuthenticatedProps {
  profile: {
    business_name?: string | null;
    full_name?: string | null;
    industry?: string | null;
  };
}

export function TemplatesAuthenticated({ profile }: TemplatesAuthenticatedProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? templates.filter((t) => t.isActive)
      : templates.filter((t) => t.isActive && t.category === activeCategory);

  const businessName = profile.business_name || profile.full_name || "Your Business";
  const industry = profile.industry?.toLowerCase() || "business";

  return (
    <>
      <>
        {/* Hero */}
        <section className="bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="animate-fade-in-up text-center">
              <Badge variant="outline" className="mb-4 gap-1.5">
                <Sparkles size={12} />
                Personalised for {businessName}
              </Badge>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Website Templates for{" "}
                <span className="text-primary">{businessName}</span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Pick a template and we&apos;ll brand it for your {industry} business.
                Your details are auto-filled — you&apos;ll be live in days.
              </p>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="border-b border-border bg-background py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Template Grid */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((template) => {
                const previewWithParams = `${template.previewUrl}?business=${encodeURIComponent(businessName)}`;
                return (
                  <div
                    key={template.id}
                    className="group relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-card transition-all hover:border-primary/40 hover:shadow-lg card-hover"
                  >
                    {/* Live Preview Thumbnail */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                      <TemplatePreviewFrame
                        src={previewWithParams}
                        title={template.name}
                      />
                      {/* Personalised overlay badge */}
                      <div className="absolute left-3 top-3 z-10">
                        <Badge variant="secondary" className="gap-1 text-xs shadow-md">
                          <Sparkles size={10} />
                          Preview for {businessName}
                        </Badge>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center gap-3 bg-foreground/60 opacity-0 transition-opacity group-hover:opacity-100">
                        <Link
                          href={previewWithParams}
                          target="_blank"
                          className={cn(buttonVariants({ size: "sm", variant: "secondary" }), "gap-1")}
                        >
                          <ExternalLink size={14} />
                          Live Preview
                        </Link>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-heading text-lg font-semibold text-foreground">
                            {template.name}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {template.description}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-baseline gap-1">
                          <span className="font-heading text-2xl font-bold text-foreground">
                            R{template.price.toLocaleString()}
                          </span>
                        </div>
                        <Badge
                          variant={
                            template.tier === "premium" ? "default" : "secondary"
                          }
                        >
                          {template.tier === "premium" ? "Premium" : "Starter"}
                        </Badge>
                      </div>
                      <Link
                        href={`/templates/${template.slug}`}
                        className={cn(buttonVariants(), "mt-4 w-full gap-2")}
                      >
                        Get Started with {businessName}
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-lg text-muted-foreground">
                  No templates found in this category yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </section>
      </>
    </>
  );
}
