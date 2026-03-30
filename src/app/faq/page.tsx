"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/animations";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is a website template?",
    answer:
      "A website template is a pre-built website design that you can customise with your own content, images, and branding. Our templates are hand-coded with modern technologies like Next.js and Tailwind CSS, giving you a fast, professional site without starting from scratch.",
  },
  {
    question: "Can I customise the templates myself?",
    answer:
      "Yes! All our templates come with clean, well-documented code that any developer can modify. If you're not technical, we also offer customisation services where we handle the changes for you at an affordable rate.",
  },
  {
    question: "How much do your templates cost?",
    answer:
      "Our starter templates begin at R3,500 and premium templates are R4,500. These are once-off purchases with no recurring fees. We also offer monthly maintenance packages starting at R800/month if you need ongoing updates and support.",
  },
  {
    question: "How long does it take to get my website live?",
    answer:
      "Template-based websites can typically be live within a few days once we receive your content. Custom projects vary depending on scope, but most are completed within 2 to 4 weeks.",
  },
  {
    question: "Do I need hosting? Is that included?",
    answer:
      "Hosting is not included in the template price, but we can recommend affordable, reliable hosting options suited to the South African market. We also offer hosting setup as part of our maintenance packages.",
  },
  {
    question: "Will my website work on mobile phones?",
    answer:
      "Absolutely. Every template we build is fully responsive and mobile-first. We design with South African users in mind, ensuring fast load times and a great experience even on slower data connections.",
  },
  {
    question: "What happens after I buy a template?",
    answer:
      "After purchase, you'll receive Canva template links via email. Click any link to open it in Canva — a free copy is added to your account that you can edit however you want. We also provide a setup guide and are available to answer any questions. Our team is just a WhatsApp message away.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Due to the digital nature of our products, refunds are generally not offered once template files have been delivered. However, if there is a verified defect that we cannot fix, we will provide a full refund. Custom project refunds are handled on a case-by-case basis.",
  },
  {
    question: "Can you build a completely custom website for my business?",
    answer:
      "Yes! In addition to our templates, we offer fully custom web development services. Get in touch via our contact page and we'll put together a tailored quote based on your requirements.",
  },
  {
    question: "Do you provide ongoing maintenance and updates?",
    answer:
      "We do. Our monthly maintenance packages include content updates, security patches, performance monitoring, and priority support. This is ideal for businesses that want a hands-off experience after launch.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
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
                  FAQ
                </Badge>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
              >
                Frequently Asked Questions
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
              >
                Got questions? We&apos;ve got answers. If you can&apos;t find
                what you&apos;re looking for, feel free to reach out.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="rounded-xl border border-border bg-card"
                >
                  <button
                    onClick={() => toggle(index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-heading text-base font-semibold text-foreground">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <ChevronDown
                        size={20}
                        className="shrink-0 text-muted-foreground"
                      />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
                Still Have Questions?
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="mx-auto mt-4 max-w-2xl text-muted-foreground"
              >
                We&apos;re here to help. Drop us a message and we&apos;ll get
                back to you as soon as possible.
              </motion.p>
              <motion.div variants={fadeInUp} className="mt-8">
                <Link
                  href="/contact"
                  className={buttonVariants({ size: "lg" })}
                >
                  Contact Us
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
