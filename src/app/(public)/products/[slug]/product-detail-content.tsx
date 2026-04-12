"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  ClipboardList,
  HelpCircle,
  Mail,
  Package,
  ShoppingBag,
  Sparkles,
  Target,
  Zap,
  LayoutDashboard,
  FileText,
  Palette,
  Type,
  Search,
  TrendingUp,
  PenLine,
  Hash,
  Calendar,
  AtSign,
  Layers,
  MousePointerClick,
  MessageSquare,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";

interface ProductDetailContentProps {
  product: Product;
}

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  FileText,
  Palette,
  Type,
  Search,
  TrendingUp,
  PenLine,
  Hash,
  Calendar,
  AtSign,
  Layers,
  MousePointerClick,
  MessageSquare,
  Globe,
};

const faqs = [
  {
    question: "How does the personalisation work?",
    answer:
      "After purchase, you fill out a short questionnaire about your business — your industry, audience, goals, and preferences. We use your answers to create deliverables that are 100% tailored to your specific business. No generic templates.",
  },
  {
    question: "How long until I receive my results?",
    answer:
      "Most orders are delivered within 15-30 minutes. You'll receive everything via email. Check your inbox and spam folder if you don't see it right away.",
  },
  {
    question: "What if I'm not happy with the results?",
    answer:
      "We want you to be thrilled. If something doesn't look right or needs adjusting, WhatsApp us and we'll make revisions at no extra cost.",
  },
  {
    question: "Can I update my answers later?",
    answer:
      "If you realise you want to change something after submitting, just WhatsApp us with your order number and the updates. We'll regenerate your deliverables.",
  },
  {
    question: "What format will I receive?",
    answer:
      "Everything is delivered as a professionally formatted PDF document via email. The content is ready to use — hand it to your web developer, designer, or use it yourself.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "Due to the personalised nature of these products, we cannot offer refunds once your deliverables have been generated. However, we'll happily make revisions if you're not satisfied.",
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Tell Us About Your Business",
    description: "Answer a quick 5-minute questionnaire about your business, audience, and goals.",
    icon: ClipboardList,
  },
  {
    step: 2,
    title: "Pay Securely",
    description: "Complete your payment through Yoco's secure checkout. South African cards and instant EFT supported.",
    icon: ShoppingBag,
  },
  {
    step: 3,
    title: "Receive Your Results",
    description: "Your personalised deliverables are emailed to you within minutes. No generic templates.",
    icon: Mail,
  },
];

export function ProductDetailContent({ product }: ProductDetailContentProps) {
  const questionnaireFields = product.questionnaire.flatMap((s) => s.fields);
  const questionnaireTopics = product.questionnaire.map((s) => s.title);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
          >
            <div>
              <Link
                href="/products"
                className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft size={16} />
                Back to Products
              </Link>
            </div>

            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              {/* Product Info */}
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">{product.category}</Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Target size={10} />
                    Personalised
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Clock size={10} />
                    {product.estimatedDelivery}
                  </Badge>
                </div>

                <h1
                  className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
                >
                  {product.name}
                </h1>

                <p
                  className="mt-4 text-lg text-muted-foreground"
                >
                  {product.description}
                </p>

                <div
                  className="mt-6 flex items-baseline gap-3"
                >
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      R{product.originalPrice}
                    </span>
                  )}
                  <span className="font-heading text-4xl font-bold text-foreground">
                    R{product.price}
                  </span>
                  {product.isBundle && (
                    <Badge variant="default" className="text-xs">
                      Save R{(product.originalPrice ?? 0) - product.price}
                    </Badge>
                  )}
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href={`/order/${product.slug}`}
                    className={cn(buttonVariants({ size: "lg" }), "gap-2 glow-primary")}
                  >
                    Get Started — R{product.price}
                    <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="/contact"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "gap-2"
                    )}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* Product Image */}
              <div
                className="relative overflow-hidden rounded-xl border border-border bg-muted"
              >
                <div className="aspect-square">
                  <Image
                    src={product.thumbnailUrl}
                    alt={`${product.name} preview`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="border-b border-border py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4"
          >
            {[
              { icon: Sparkles, label: "Expert-Crafted" },
              { icon: Target, label: "Personalised to Your Business" },
              { icon: Zap, label: "Delivered in Minutes" },
              { icon: ShieldCheck, label: "Free Revisions Guarantee" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-2"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon size={20} className="text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Receive */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
          >
            <div className="flex items-center gap-3 mb-2">
              <Package size={24} className="text-primary" />
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
                What You&apos;ll Receive
              </h2>
            </div>
            <p className="mb-8 text-muted-foreground">
              Everything is personalised to your specific business, industry, and goals.
            </p>

            <div
              className="grid gap-4 sm:grid-cols-2"
            >
              {product.deliverables.map((deliverable) => {
                const IconComponent = iconMap[deliverable.icon] || FileText;
                return (
                  <div
                    key={deliverable.title}
                    className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <IconComponent size={18} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">
                        {deliverable.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {deliverable.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
          >
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
                How It Works
              </h2>
              <p className="mt-3 text-muted-foreground">
                Get your personalised results in three simple steps.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {howItWorks.map((step) => (
                <div
                  key={step.step}
                  className="relative text-center"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <step.icon size={28} className="text-primary" />
                  </div>
                  <div className="mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {step.step}
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Questionnaire Preview */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
          >
            <div className="flex items-center gap-3 mb-2">
              <ClipboardList size={24} className="text-primary" />
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
                We&apos;ll Ask You About
              </h2>
            </div>
            <p className="mb-8 text-muted-foreground">
              After purchase, a quick questionnaire helps us personalise everything.
              Takes about 5 minutes.
            </p>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {questionnaireTopics.map((topic) => (
                <div
                  key={topic}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check size={14} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{topic}</span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              {questionnaireFields.length} questions total — mostly multiple choice for quick completion.
            </p>
          </div>
        </div>
      </section>

      {/* Bundle Upsell (only on individual product pages) */}
      {!product.isBundle && (
        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className="rounded-xl border border-primary/20 bg-card p-8 text-center"
            >
              <div>
                <Badge variant="default" className="mb-4">
                  Best Value
                </Badge>
              </div>
              <h2
                className="font-heading text-2xl font-bold text-foreground sm:text-3xl"
              >
                Get Everything for R499
              </h2>
              <p className="mt-3 text-muted-foreground">
                The Complete Digital Launch Kit includes your Website Blueprint,
                Social Media Starter Kit, and Website Copy Pack — all personalised
                to your business. Save R248 compared to buying separately.
              </p>
              <div className="mt-6">
                <Link
                  href="/products/complete-digital-launch-kit"
                  className={cn(buttonVariants({ size: "lg" }), "gap-2")}
                >
                  View the Complete Bundle
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className={cn("py-16", product.isBundle && "bg-muted/30")}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
          >
            <div className="flex items-center gap-3 mb-2">
              <HelpCircle size={24} className="text-primary" />
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
                Frequently Asked Questions
              </h2>
            </div>
            <p className="mb-8 text-muted-foreground">
              Common questions about our personalised products.
            </p>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-lg border border-border bg-card p-6"
                >
                  <h3 className="font-heading font-semibold text-foreground">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={cn("py-20", !product.isBundle && "bg-muted/30")}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="text-center"
          >
            <div>
              <Sparkles size={32} className="mx-auto mb-4 text-primary" />
            </div>
            <h2
              className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Ready to Get Started?
            </h2>
            <p
              className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
            >
              {product.isBundle
                ? "Get everything you need to launch your business online — personalised to your brand."
                : `Get your personalised ${product.name} and take the next step for your business.`}
            </p>
            <div
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href={`/order/${product.slug}`}
                className={cn(buttonVariants({ size: "lg" }), "gap-2 glow-primary")}
              >
                Get Started — R{product.price}
                <ArrowRight size={18} />
              </Link>
              {!product.isBundle && (
                <Link
                  href="/products/complete-digital-launch-kit"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "gap-2"
                  )}
                >
                  Or Get the Complete Bundle & Save
                  <Package size={18} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
