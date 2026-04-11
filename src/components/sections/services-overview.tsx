"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Crown, ShoppingBag, ArrowRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/animations";

const offerings = [
  {
    icon: <Users size={28} />,
    title: "Free Membership",
    description:
      "Everything you need to start building your business network.",
    features: [
      "Full business profile",
      "Connect with entrepreneurs",
      "Post updates & deals",
      "Direct messaging",
    ],
    price: "Free",
    period: "forever",
    cta: "Join Now",
    href: "/register",
    highlight: true,
    badge: "Most Popular",
  },
  {
    icon: <Crown size={28} />,
    title: "Premium",
    description:
      "Boost your presence and stand out from the crowd.",
    features: [
      "Top of search results",
      "Premium verified badge",
      "15% off all products",
      "Priority support",
    ],
    price: "R249",
    period: "/month",
    cta: "Go Premium",
    href: "/register",
    highlight: false,
  },
  {
    icon: <ShoppingBag size={28} />,
    title: "Digital Products",
    description:
      "Personalised business tools delivered to your inbox.",
    features: [
      "Website blueprints",
      "Social media kits",
      "Copy packs",
      "Personalised to your brand",
    ],
    price: "From R149",
    period: "",
    cta: "Browse Products",
    href: "/products",
    highlight: false,
  },
];

export function ServicesOverview() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
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
              Membership
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Choose Your Path
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground"
          >
            Start free and upgrade when you&apos;re ready. No lock-in, no hidden fees.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 grid gap-8 lg:grid-cols-3"
        >
          {offerings.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className={cn(
                "relative flex flex-col rounded-2xl border-2 p-8 transition-shadow hover:shadow-lg",
                item.highlight
                  ? "border-primary/30 bg-primary text-primary-foreground"
                  : "border-primary/20 bg-card"
              )}
            >
              {item.badge && (
                <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                  {item.badge}
                </span>
              )}

              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-full",
                  item.highlight ? "bg-primary-foreground/10" : "bg-primary/10 text-primary"
                )}
              >
                {item.icon}
              </div>

              <h3 className="mt-5 font-heading text-xl font-bold">
                {item.title}
              </h3>
              <p
                className={cn(
                  "mt-2 text-sm leading-relaxed",
                  item.highlight
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground"
                )}
              >
                {item.description}
              </p>

              <div className="mt-6">
                <span className="font-heading text-3xl font-bold">
                  {item.price}
                </span>
                {item.period && (
                  <span className={cn(
                    "text-sm",
                    item.highlight ? "text-primary-foreground/60" : "text-muted-foreground"
                  )}>
                    {item.period}
                  </span>
                )}
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check size={16} className={cn(
                      "shrink-0",
                      item.highlight ? "text-accent" : "text-primary"
                    )} />
                    <span className={item.highlight ? "text-primary-foreground/90" : "text-foreground"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={item.href}
                className={cn(
                  buttonVariants({
                    variant: item.highlight ? "secondary" : "default",
                    size: "lg",
                  }),
                  "mt-6 gap-2"
                )}
              >
                {item.cta}
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
