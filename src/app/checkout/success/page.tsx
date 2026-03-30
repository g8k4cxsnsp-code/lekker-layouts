"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  Calendar,
  Paintbrush,
  Rocket,
} from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/animations";
import { products } from "@/data/products";
import { templates } from "@/data/templates";
import { SITE_CONFIG } from "@/lib/constants";
import { QuestionnaireForm } from "@/components/questionnaire/questionnaire-form";

function SuccessContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const slug = searchParams.get("slug");
  const email = searchParams.get("email") || "your email";
  const name = searchParams.get("name") || "";
  const [orderId] = React.useState(() => Date.now().toString(36).toUpperCase().slice(-6));

  const product = type === "product" ? products.find((p) => p.slug === slug) : null;
  const template = type === "template" ? templates.find((t) => t.slug === slug) : null;
  const item = product || template;

  if (!item) {
    return (
      <div className="py-32 text-center">
        <h1 className="font-heading text-2xl font-bold">Order not found</h1>
        <Link href="/" className={cn(buttonVariants(), "mt-6")}>
          Go Home
        </Link>
      </div>
    );
  }

  const isTemplate = type === "template";
  const depositAmount = isTemplate ? Math.round(item.price / 2) : item.price;

  // ─── Product flow: Payment confirmed + Questionnaire ───────────
  if (!isTemplate && product) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Compact payment confirmation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30"
        >
          <CheckCircle2 size={20} className="shrink-0 text-green-600 dark:text-green-400" />
          <div className="flex-1 text-sm">
            <span className="font-medium text-green-800 dark:text-green-200">
              Payment of R{depositAmount.toLocaleString()} confirmed.
            </span>
            <span className="ml-2 text-green-700/70 dark:text-green-300/70">
              Order #LL-{orderId}
            </span>
          </div>
        </motion.div>

        {/* Questionnaire heading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            One more step — tell us about your business
          </h1>
          <p className="mt-2 text-muted-foreground">
            This takes about 5 minutes. Your personalised{" "}
            <strong className="text-foreground">{product.name}</strong> will be
            emailed to <strong className="text-foreground">{email}</strong>{" "}
            {product.estimatedDelivery.toLowerCase()}.
          </p>
        </motion.div>

        {/* Questionnaire form */}
        <QuestionnaireForm
          product={product}
          customerName={name}
          customerEmail={email}
          orderId={orderId}
        />

        {/* Test mode notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/30"
        >
          <p className="text-center text-sm text-amber-800 dark:text-amber-200">
            This is a test transaction — no real payment was processed.
          </p>
        </motion.div>
      </div>
    );
  }

  // ─── Template flow: unchanged ──────────────────────────────────

  const whatsappMessage = `Hi! I'm ${name}. I just paid my 50% deposit (R${depositAmount.toLocaleString()}) for the ${item.name} template. When can we schedule the branding meeting?`;
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8"
    >
      {/* Success icon */}
      <motion.div variants={fadeIn} className="flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle2 size={40} className="text-green-600 dark:text-green-400" />
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="mt-8 text-center">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Deposit Received!
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Your 50% deposit of R{depositAmount.toLocaleString()} for the {item.name} template has been confirmed.
        </p>
      </motion.div>

      {/* Order details card */}
      <motion.div
        variants={fadeInUp}
        className="mt-8 rounded-xl border border-border bg-card p-6"
      >
        <div className="flex items-center justify-between border-b border-border pb-4">
          <span className="text-sm text-muted-foreground">Order</span>
          <span className="font-mono text-sm text-foreground">#LL-{orderId}</span>
        </div>
        <div className="flex items-center justify-between border-b border-border py-4">
          <span className="text-sm text-muted-foreground">Item</span>
          <span className="text-sm font-semibold text-foreground">{item.name}</span>
        </div>
        <div className="flex items-center justify-between border-b border-border py-4">
          <span className="text-sm text-muted-foreground">Amount paid</span>
          <span className="font-heading text-lg font-bold text-foreground">
            R{depositAmount.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-border py-4">
          <span className="text-sm text-muted-foreground">Remaining balance</span>
          <span className="text-sm text-muted-foreground">
            R{(item.price - depositAmount).toLocaleString()} due on delivery
          </span>
        </div>
        <div className="flex items-center justify-between pt-4">
          <span className="text-sm text-muted-foreground">Confirmation sent to</span>
          <span className="text-sm text-foreground">{email}</span>
        </div>
      </motion.div>

      {/* Template: Next steps */}
      <motion.div variants={fadeInUp} className="mt-8">
        <h2 className="font-heading text-lg font-semibold text-foreground">
          What Happens Next
        </h2>
        <div className="mt-4 space-y-4">
          {[
            {
              icon: <Calendar size={20} />,
              title: "Schedule a Meeting",
              description:
                "We'll reach out within 24 hours to schedule your branding meeting. Or message us on WhatsApp now!",
            },
            {
              icon: <Paintbrush size={20} />,
              title: "We Brand Everything",
              description:
                "Share your logo, colors, content, and photos. Our team customizes the template to match your brand.",
            },
            {
              icon: <Rocket size={20} />,
              title: "Launch in Days",
              description:
                "Your website goes live. You review, we refine, and the remaining balance is due on delivery.",
            },
          ].map((step, i) => (
            <div
              key={step.title}
              className="flex gap-4 rounded-lg border border-border bg-card p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {step.icon}
              </div>
              <div>
                <p className="font-heading text-sm font-semibold text-foreground">
                  {i + 1}. {step.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* WhatsApp CTA */}
      <motion.div variants={fadeIn} className="mt-8 flex flex-col gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ size: "lg" }), "w-full gap-2")}
        >
          <MessageCircle size={18} />
          Schedule Meeting via WhatsApp
        </a>
        <Link
          href="/templates"
          className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "w-full gap-2")}
        >
          Continue Browsing
          <ArrowRight size={16} />
        </Link>
      </motion.div>

      {/* Test mode notice */}
      <motion.div
        variants={fadeIn}
        className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/30"
      >
        <p className="text-center text-sm text-amber-800 dark:text-amber-200">
          This is a test transaction — no real payment was processed.
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-32">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          }
        >
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
