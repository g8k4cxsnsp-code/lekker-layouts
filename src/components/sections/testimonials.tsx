"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/animations";

const testimonials = [
  {
    name: "Foambox Detailing",
    role: "Auto Detailing, Cape Town",
    quote:
      "The process was incredibly smooth. I selected my template, had a quick meeting, and within two days my website was live. It looks amazing and loads so fast!",
    rating: 5,
    initials: "FD",
  },
  {
    name: "Sarah van der Berg",
    role: "Photographer, Johannesburg",
    quote:
      "I needed a portfolio that showcased my work beautifully. Lekker Layouts delivered exactly that — clean, fast, and my clients love it.",
    rating: 5,
    initials: "SV",
  },
  {
    name: "James Naidoo",
    role: "Financial Advisor, Durban",
    quote:
      "As a wealth manager, I needed a site that looked professional and trustworthy. The team understood my needs perfectly. Highly recommend!",
    rating: 5,
    initials: "JN",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/3 h-[400px] w-[400px] rounded-full bg-primary/[0.03] blur-[100px]" />
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
              Testimonials
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground"
          >
            Real businesses, real results. Here&apos;s what our clients have to
            say about working with us.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={fadeInUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="card-hover relative rounded-2xl border border-border/60 bg-card p-8"
            >
              <Quote
                size={40}
                className="absolute right-6 top-6 text-primary/[0.06]"
              />
              <div className="mb-5 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.3, ease: [0.175, 0.885, 0.32, 1.275] }}
                  >
                    <Star
                      size={18}
                      className="fill-amber-400 text-amber-400"
                    />
                  </motion.span>
                ))}
              </div>
              <p className="text-[0.95rem] leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-heading text-sm font-bold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
