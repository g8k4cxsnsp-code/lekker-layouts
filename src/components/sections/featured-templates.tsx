"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { TemplatePreviewFrame } from "@/components/ui/template-preview-frame";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { templates } from "@/data/templates";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/animations";

export function FeaturedTemplates() {
  const featured = templates.filter((t) => t.isActive).slice(0, 3);

  return (
    <section className="bg-muted/30 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <motion.div variants={fadeIn}>
            <Badge variant="outline" className="mb-4">
              Featured Templates
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Ready-to-Launch Website Templates
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground"
          >
            Custom-coded in React & Next.js. Pick a template, we brand it for
            your business, and you&apos;re live in days.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {featured.map((template) => (
            <motion.div
              key={template.id}
              variants={fadeInUp}
              className="card-hover group relative overflow-hidden rounded-2xl border border-border/60 bg-card"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <TemplatePreviewFrame
                  src={template.previewUrl}
                  title={template.name}
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-foreground/50 backdrop-blur-sm opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <Link
                    href={template.previewUrl}
                    target="_blank"
                    className={cn(buttonVariants({ size: "sm", variant: "secondary" }), "gap-1 shadow-lg")}
                  >
                    <ExternalLink size={14} />
                    Live Preview
                  </Link>
                  <Link
                    href={`/templates/${template.slug}`}
                    className={cn(buttonVariants({ size: "sm", variant: "outline" }), "gap-1 border-white/30 bg-white/10 text-white shadow-lg hover:bg-white/20 hover:text-white")}
                  >
                    View Details
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      {template.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {template.description}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading text-2xl font-bold text-foreground">
                      R{template.price.toLocaleString()}
                    </span>
                  </div>
                  <Badge
                    variant={template.tier === "premium" ? "default" : "secondary"}
                  >
                    {template.tier === "premium" ? "Premium" : "Starter"}
                  </Badge>
                </div>
                <Link
                  href={`/templates/${template.slug}`}
                  className={cn(buttonVariants(), "mt-5 w-full gap-2")}
                >
                  Get Started
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <Link
            href="/templates"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "gap-2 px-8"
            )}
          >
            View All Templates
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
