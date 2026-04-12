"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
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
      <>
        {/* Hero */}
        <section className="bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className="text-center"
            >
              <div>
                <Badge variant="outline" className="mb-4">
                  FAQ
                </Badge>
              </div>
              <h1
                className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
              >
                Frequently Asked Questions
              </h1>
              <p
                className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
              >
                Got questions? We&apos;ve got answers. If you can&apos;t find
                what you&apos;re looking for, feel free to reach out.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div
              className="space-y-4"
            >
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-border bg-card"
                >
                  <button
                    onClick={() => toggle(index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-heading text-base font-semibold text-foreground">
                      {faq.question}
                    </span>
                    <div
                    >
                      <ChevronDown
                        size={20}
                        className="shrink-0 text-muted-foreground"
                      />
                    </div>
                  </button>
                  {openIndex === index && (
                      <div
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className="text-center"
            >
              <h2
                className="font-heading text-3xl font-bold tracking-tight text-foreground"
              >
                Still Have Questions?
              </h2>
              <p
                className="mx-auto mt-4 max-w-2xl text-muted-foreground"
              >
                We&apos;re here to help. Drop us a message and we&apos;ll get
                back to you as soon as possible.
              </p>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className={buttonVariants({ size: "lg" })}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    </>
  );
}
