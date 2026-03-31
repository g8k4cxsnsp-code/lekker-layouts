"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-foreground py-20 sm:py-24 lg:py-28 text-background">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute left-1/2 top-0 h-px w-[600px] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Ready to Launch Your Website?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-xl text-lg text-background/60"
          >
            Stop losing customers to competitors with better websites. Get a
            professional, custom-coded site that works as hard as you do.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/templates"
              className={cn(
                buttonVariants({ size: "lg" }),
                "gap-2 px-8 py-3 text-base font-semibold glow-primary"
              )}
            >
              Browse Templates
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-background/20 px-8 py-3 text-base font-semibold text-background hover:bg-background/10"
              )}
            >
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
