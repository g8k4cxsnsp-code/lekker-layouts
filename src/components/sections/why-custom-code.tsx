"use client";

import { motion } from "framer-motion";
import { Search, Users, MessageCircle, Crown, ShoppingBag, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fadeIn, fadeInUp, staggerContainerFast } from "@/lib/animations";

const benefits = [
  {
    icon: <Search size={24} />,
    title: "Get Discovered",
    description:
      "Create a detailed business profile and show up when other entrepreneurs search for your industry.",
  },
  {
    icon: <Users size={24} />,
    title: "Build Your Network",
    description:
      "Connect with business owners across South Africa. Share insights, refer clients, and collaborate.",
  },
  {
    icon: <MessageCircle size={24} />,
    title: "Direct Messaging",
    description:
      "Chat privately with your connections. Discuss partnerships, share advice, and close deals.",
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Share Your Journey",
    description:
      "Post updates, announce deals, and celebrate milestones. Build your brand story in public.",
  },
  {
    icon: <Crown size={24} />,
    title: "Go Premium",
    description:
      "Boost your visibility in search, get a verified badge, and unlock discounts on business tools.",
  },
  {
    icon: <ShoppingBag size={24} />,
    title: "Business Tools",
    description:
      "Access website blueprints, social media kits, and copy packs — all personalised to your brand.",
  },
];

export function WhyCustomCode() {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-20 sm:py-24 lg:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/3 h-[400px] w-[400px] rounded-full bg-primary/[0.03] blur-[100px]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <motion.div variants={fadeIn}>
            <Badge variant="outline" className="mb-4">
              Platform Features
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Everything You Need to Grow
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground"
          >
            One platform to connect, communicate, and build your business
            presence online. Built specifically for SA entrepreneurs.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-border/60 bg-card p-7 transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                {benefit.icon}
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
