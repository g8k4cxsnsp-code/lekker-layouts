"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code, Zap, BadgeCheck, HeartHandshake, Users } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/animations";

const values = [
  {
    icon: Code,
    title: "Quality Code",
    description:
      "Every template is hand-coded with modern technologies. No bloated page builders, no unnecessary plugins — just clean, performant code.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description:
      "We understand that time is money. Our streamlined process means your website can be live in days, not months.",
  },
  {
    icon: BadgeCheck,
    title: "Affordable Pricing",
    description:
      "Professional websites shouldn't cost a fortune. Our pricing is designed specifically for South African small businesses.",
  },
  {
    icon: HeartHandshake,
    title: "Local Support",
    description:
      "We're proudly South African. Get support from people who understand your market and speak your language.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <motion.div variants={fadeIn}>
                <Badge variant="outline" className="mb-4">
                  About Us
                </Badge>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
              >
                Our Story
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
              >
                Lekker Layouts is a South African web development studio on a
                mission to make professional websites accessible to every small
                business in the country.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto max-w-3xl space-y-6 text-center"
            >
              <motion.h2
                variants={fadeInUp}
                className="font-heading text-3xl font-bold tracking-tight text-foreground"
              >
                Why We Started
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-muted-foreground leading-relaxed"
              >
                Too many South African small businesses are held back by
                expensive, slow, and outdated websites. We saw talented
                entrepreneurs stuck with cookie-cutter page builders or paying
                huge agency fees for simple sites. There had to be a better way.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-muted-foreground leading-relaxed"
              >
                Lekker Layouts was born from a simple idea: deliver hand-coded,
                modern websites at prices that make sense for local businesses.
                Every template we build uses the same technology stack trusted by
                leading tech companies — Next.js, React, and Tailwind CSS —
                giving our clients enterprise-grade performance without the
                enterprise price tag.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-muted-foreground leading-relaxed"
              >
                Based right here in South Africa, we understand the unique
                challenges local businesses face. From load-shedding-proof
                hosting to mobile-first design for data-conscious users, we
                build with our market in mind.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.h2
                variants={fadeInUp}
                className="font-heading text-3xl font-bold tracking-tight text-foreground"
              >
                What We Stand For
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="mx-auto mt-4 max-w-2xl text-muted-foreground"
              >
                Our values guide every decision we make, from the code we write
                to the way we support our clients.
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              {values.map((value) => (
                <motion.div
                  key={value.title}
                  variants={fadeInUp}
                  className="rounded-xl border border-border bg-card p-6 text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <value.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team Placeholder */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.h2
                variants={fadeInUp}
                className="font-heading text-3xl font-bold tracking-tight text-foreground"
              >
                Meet the Team
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="mx-auto mt-4 max-w-2xl text-muted-foreground"
              >
                A small but mighty crew of developers and designers passionate
                about the South African digital landscape.
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex flex-col items-center rounded-xl border border-border bg-card p-8"
                >
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                    <Users size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                    Team Member
                  </h3>
                  <p className="text-sm text-muted-foreground">Role Title</p>
                  <p className="mt-3 text-center text-sm text-muted-foreground">
                    Bio coming soon. We&apos;re building something great behind
                    the scenes.
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.h2
                variants={fadeInUp}
                className="font-heading text-3xl font-bold tracking-tight text-foreground"
              >
                Ready to Work Together?
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="mx-auto mt-4 max-w-2xl text-muted-foreground"
              >
                Let&apos;s chat about how we can help your business stand out
                online. No pressure, no jargon — just honest advice.
              </motion.p>
              <motion.div variants={fadeInUp} className="mt-8">
                <Link
                  href="/contact"
                  className={buttonVariants({ size: "lg" })}
                >
                  Get in Touch
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
