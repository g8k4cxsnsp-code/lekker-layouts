"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "R3,500",
    description:
      "Perfect for small businesses looking for a professional online presence.",
    features: [
      "Single-page website",
      "Mobile responsive design",
      "SEO optimized",
      "Contact form integration",
      "Social media links",
      "1 round of revisions",
      "2-week delivery",
    ],
    highlighted: false,
  },
  {
    name: "Premium",
    price: "R4,500",
    description:
      "For businesses that need more features and a multi-page experience.",
    features: [
      "Multi-page website (up to 5 pages)",
      "Mobile responsive design",
      "SEO optimized",
      "Contact form integration",
      "Social media links",
      "Blog section",
      "Team/About page",
      "2 rounds of revisions",
      "10-day delivery",
    ],
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Maintenance",
    price: "R800",
    period: "/mo",
    description:
      "Keep your website updated, secure, and running smoothly every month.",
    features: [
      "Monthly content updates",
      "Security monitoring",
      "Performance optimization",
      "Uptime monitoring",
      "Priority email support",
      "Monthly analytics report",
    ],
    highlighted: false,
  },
];

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How long does it take to build my website?",
    answer:
      "Starter websites are typically delivered within 2 weeks, and Premium websites within 10 business days from the time we receive all your content and branding materials.",
  },
  {
    question: "What do I need to provide?",
    answer:
      "We'll need your logo, brand colors, copy/text for each page, and any photos or images you want used. We provide a content planner to make this easy.",
  },
  {
    question: "Do I own my website?",
    answer:
      "Yes! You fully own all the code and content. We hand over everything to you upon project completion.",
  },
  {
    question: "Can I update the website myself?",
    answer:
      "Our websites are built with modern code, so updates require some technical knowledge. That's why we offer our monthly maintenance plan to handle all updates for you.",
  },
  {
    question: "Is hosting included?",
    answer:
      "Hosting is not included in the website price, but we'll help you set up affordable hosting (typically R50-R150/month) and handle the deployment for you.",
  },
  {
    question: "What if I need changes after delivery?",
    answer:
      "Each plan includes revision rounds. Additional changes after delivery can be handled through our maintenance plan or on a per-request basis.",
  },
];

export default function PricingPage() {
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
                  Pricing
                </Badge>
              </div>
              <h1
                className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
              >
                Simple, Transparent Pricing
              </h1>
              <p
                className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
              >
                No hidden fees. No surprises. Choose the plan that fits your
                business needs and budget.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className="grid gap-8 lg:grid-cols-3"
            >
              {pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={cn(
                    "relative overflow-hidden rounded-xl border bg-card p-8 transition-all",
                    tier.highlighted
                      ? "border-primary shadow-lg shadow-primary/10"
                      : "border-border hover:border-primary/30 hover:shadow-lg"
                  )}
                >
                  {tier.badge && (
                    <div className="absolute right-4 top-4">
                      <Badge variant="default">{tier.badge}</Badge>
                    </div>
                  )}

                  <h3 className="font-heading text-xl font-semibold text-foreground">
                    {tier.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {tier.description}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="font-heading text-4xl font-bold text-foreground">
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className="text-muted-foreground">
                        {tier.period}
                      </span>
                    )}
                  </div>

                  <ul className="mt-8 space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Check size={12} className="text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className={cn(
                      buttonVariants({
                        variant: tier.highlighted ? "default" : "outline",
                        size: "lg",
                      }),
                      "mt-8 w-full gap-2"
                    )}
                  >
                    Get Started
                    <ArrowRight size={18} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-muted/30 py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div
              className="text-center"
            >
              <div>
                <Badge variant="outline" className="mb-4">
                  FAQ
                </Badge>
              </div>
              <h2
                className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                Frequently Asked Questions
              </h2>
              <p
                className="mx-auto mt-4 max-w-2xl text-muted-foreground"
              >
                Got questions? We&apos;ve got answers.
              </p>
            </div>

            <div
              className="mt-12"
            >
              <Accordion>
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={String(index)}>
                    <AccordionTrigger className="text-left text-base">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </>
    </>
  );
}
