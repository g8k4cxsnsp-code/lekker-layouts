"use client";

import { motion } from "framer-motion";
import { UserPlus, Briefcase, Users, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fadeIn, fadeInUp, scaleIn, staggerContainer } from "@/lib/animations";

const steps = [
  {
    icon: <UserPlus size={28} />,
    step: "1",
    title: "Create Your Account",
    description:
      "Sign up for free in under a minute. No credit card required.",
  },
  {
    icon: <Briefcase size={28} />,
    step: "2",
    title: "Build Your Profile",
    description:
      "Tell us about your business — industry, services, what makes you unique. This is your digital shopfront.",
  },
  {
    icon: <Users size={28} />,
    step: "3",
    title: "Connect & Share",
    description:
      "Find other SA business owners, send connection requests, post updates, and share deals.",
  },
  {
    icon: <Rocket size={28} />,
    step: "4",
    title: "Grow Your Brand",
    description:
      "Get discovered by other entrepreneurs and customers. Go Premium for boosted visibility.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-accent/[0.04] blur-[100px]" />
      </div>
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
              Getting Started
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            How It Works
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground"
          >
            From sign-up to growing your network in four simple steps.
            No complicated setup, no fees to get started.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              variants={fadeInUp}
              className="relative text-center"
            >
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ originX: 0 }}
                  className="absolute right-0 top-12 hidden h-px w-full translate-x-1/2 bg-gradient-to-r from-border to-transparent lg:block"
                />
              )}

              <motion.div
                variants={scaleIn}
                className="relative mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-2xl border border-border/60 bg-card text-primary shadow-sm"
              >
                {step.icon}
                <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-md shadow-primary/20">
                  {step.step}
                </span>
              </motion.div>
              <h3 className="font-heading text-lg font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mx-auto mt-2.5 max-w-[220px] text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
