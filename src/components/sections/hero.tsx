"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, Briefcase, TrendingUp } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { cn } from "@/lib/utils";
import { fadeInUp, blurIn, popIn, staggerContainer, float } from "@/lib/animations";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-grid">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-background" />
        <motion.div
          variants={float}
          initial="hidden"
          animate="visible"
          className="absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-primary/[0.07] blur-[100px]"
        />
        <motion.div
          variants={float}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
          className="absolute -bottom-40 -left-20 h-[500px] w-[500px] rounded-full bg-accent/[0.07] blur-[100px]"
        />
        <div className="absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-primary/[0.04] blur-[80px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-36 lg:px-8 lg:py-44">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          {/* Headline */}
          <motion.h1
            variants={blurIn}
            className="font-heading text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem] lg:leading-[1.05]"
          >
            Where SA Businesses{" "}
            <span className="animate-gradient bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Grow Together
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            The networking hub for South African small business owners.
            Connect with other entrepreneurs, share your journey, get discovered,
            and access tools to grow your brand — all in one place.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/register"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "gap-2 px-8 py-3 text-base font-semibold glow-primary"
                )}
              >
                Join Free
                <ArrowRight size={18} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "px-8 py-3 text-base font-semibold"
                )}
              >
                Log In
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={popIn}
            className="mx-auto mt-20 grid max-w-2xl grid-cols-3 gap-8 rounded-2xl border border-border/60 bg-card/50 p-8 shadow-sm backdrop-blur-sm"
          >
            {[
              { icon: <Users size={22} />, label: "Business owners", counter: <>Free to join</> },
              { icon: <Briefcase size={22} />, label: "Industries", counter: <><AnimatedCounter target={10} duration={1} />+</> },
              { icon: <TrendingUp size={22} />, label: "Grow your brand", counter: <>100%</> },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <span className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  {item.counter}
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
