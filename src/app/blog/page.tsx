"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/animations";

export default function BlogPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
  };

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
                  Blog
                </Badge>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
              >
                Blog
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
              >
                Tips, tutorials, and insights on web development, design, and
                growing your online presence in South Africa.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Coming Soon */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto max-w-lg text-center"
            >
              <motion.div
                variants={fadeInUp}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
              >
                <Newspaper size={36} className="text-primary" />
              </motion.div>

              <motion.h2
                variants={fadeInUp}
                className="mt-6 font-heading text-2xl font-bold tracking-tight text-foreground"
              >
                Coming Soon
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="mt-4 text-muted-foreground"
              >
                We&apos;re working on some great content. Check back soon!
              </motion.p>

              {/* Newsletter Subscribe */}
              <motion.div
                variants={fadeInUp}
                className="mt-10 rounded-xl border border-border bg-card p-6"
              >
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  Get Notified
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Subscribe to our newsletter and be the first to know when we
                  publish new articles.
                </p>

                {submitted ? (
                  <p className="mt-4 text-sm font-medium text-primary">
                    Thanks for subscribing! We&apos;ll keep you posted.
                  </p>
                ) : (
                  <form
                    onSubmit={handleSubscribe}
                    className="mt-4 flex flex-col gap-3 sm:flex-row"
                  >
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-10 flex-1"
                    />
                    <Button type="submit" className="h-10">
                      Subscribe
                    </Button>
                  </form>
                )}
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
