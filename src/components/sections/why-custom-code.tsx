"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Search, Palette, Gauge, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fadeIn, fadeInUp, staggerContainer, staggerContainerFast } from "@/lib/animations";

const benefits = [
  {
    icon: <Zap size={24} />,
    title: "Lightning Fast",
    description: "Static sites load in under 1 second. No bloated plugins or slow databases.",
  },
  {
    icon: <Search size={24} />,
    title: "SEO Optimized",
    description: "Built-in SEO best practices. Google loves fast, well-structured sites.",
  },
  {
    icon: <Shield size={24} />,
    title: "Ultra Secure",
    description: "No WordPress vulnerabilities. Static sites have almost zero attack surface.",
  },
  {
    icon: <Palette size={24} />,
    title: "Fully Customizable",
    description: "Real code means limitless customization. No theme restrictions or plugin conflicts.",
  },
  {
    icon: <Gauge size={24} />,
    title: "Perfect Lighthouse Scores",
    description: "Consistently scoring 95+ on Google Lighthouse for performance, SEO, and accessibility.",
  },
  {
    icon: <Code2 size={24} />,
    title: "Clean Code You Own",
    description: "Professional-grade code. No vendor lock-in. You own everything.",
  },
];

export function WhyCustomCode() {
  return (
    <section className="relative py-20 sm:py-24 lg:py-28">
      <div className="absolute inset-0 -z-10 bg-grid" />
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
              Why Custom Code?
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            WordPress Can&apos;t Compete
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground"
          >
            Our templates are built with the same technology used by the
            world&apos;s top companies. Here&apos;s why that matters for your
            business.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 sm:mt-16 grid gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={fadeInUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="card-hover group rounded-2xl border border-border/60 bg-card p-6 sm:p-8"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/20">
                {benefit.icon}
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">
                {benefit.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
