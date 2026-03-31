"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, Wrench, ShoppingBag, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/animations";

const services = [
  {
    icon: <Code2 size={28} />,
    title: "Custom Website",
    description:
      "Choose from our library of hand-coded templates. We brand it with your logo, colors, content, and images. A professional website without the hassle.",
    price: "From R3,500",
    href: "/templates",
    cta: "Browse Templates",
    highlight: true,
  },
  {
    icon: <Wrench size={28} />,
    title: "Monthly Maintenance",
    description:
      "We keep your site secure, fast, and up to date. Includes backups, updates, and one hour of cosmetic changes per month.",
    price: "R800/month",
    href: "/services",
    cta: "Learn More",
    highlight: false,
  },
  {
    icon: <ShoppingBag size={28} />,
    title: "Digital Products",
    description:
      "Brand kits, social media templates, content planners, and more. Get instant Canva access and start building your brand today.",
    price: "From R99",
    href: "/products",
    cta: "Shop Products",
    highlight: false,
  },
];

export function ServicesOverview() {
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
              What We Offer
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Everything You Need to Get Online
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            From a full website to digital branding tools — we&apos;ve got you
            covered.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeInUp}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`relative rounded-xl border p-6 sm:p-8 transition-shadow hover:shadow-lg ${
                service.highlight
                  ? "border-primary/30 bg-card shadow-sm"
                  : "border-border bg-card"
              }`}
            >
              {service.highlight && (
                <div className="absolute -top-3 left-6">
                  <Badge>Most Popular</Badge>
                </div>
              )}
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                {service.icon}
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <p className="mt-4 font-heading text-2xl font-bold text-foreground">
                {service.price}
              </p>
              <Link href={service.href} className={cn(buttonVariants({ variant: service.highlight ? "default" : "outline" }), "mt-6 w-full gap-2")}>
                  {service.cta}
                  <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
