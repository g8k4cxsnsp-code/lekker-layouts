"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fadeIn, fadeInUp, scaleIn, staggerContainer } from "@/lib/animations";

const testimonials = [
  {
    name: "Thabo M.",
    business: "Mobile Detailing, Johannesburg",
    quote:
      "I signed up to see what it was about and within a week I had three new connections who referred clients to me. This is LinkedIn but for real SA hustlers.",
    initials: "TM",
    rating: 5,
  },
  {
    name: "Lerato K.",
    business: "Beauty Salon, Pretoria",
    quote:
      "Finally a platform that gets small business in South Africa. I love posting my deals and seeing other businesses grow alongside mine.",
    initials: "LK",
    rating: 5,
  },
  {
    name: "James vR.",
    business: "Photography, Cape Town",
    quote:
      "The website blueprint I bought was already filled in with my business info from my profile. Saved me hours. Brilliant concept.",
    initials: "JR",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-20 sm:py-24 lg:py-28">
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
              Community
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            What Business Owners Say
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground"
          >
            Real entrepreneurs, real results.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="relative rounded-2xl border border-border/60 bg-card p-7 transition-shadow hover:shadow-md"
            >
              <Quote
                size={40}
                className="absolute right-6 top-6 text-primary/10"
              />

              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <motion.div
                    key={i}
                    variants={scaleIn}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star
                      size={16}
                      className="fill-amber-400 text-amber-400"
                    />
                  </motion.div>
                ))}
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.business}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
