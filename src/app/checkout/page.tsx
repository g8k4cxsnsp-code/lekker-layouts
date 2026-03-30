"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Lock, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/animations";
import { products } from "@/data/products";
import { templates } from "@/data/templates";

function CheckoutForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type"); // "product" or "template"
  const slug = searchParams.get("slug");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);

  // Find the item
  const product = type === "product" ? products.find((p) => p.slug === slug) : null;
  const template = type === "template" ? templates.find((t) => t.slug === slug) : null;
  const item = product || template;

  if (!item || !type) {
    return (
      <div className="py-32 text-center">
        <h1 className="font-heading text-2xl font-bold">Item not found</h1>
        <p className="mt-2 text-muted-foreground">The item you&apos;re trying to purchase doesn&apos;t exist.</p>
        <Link href="/" className={cn(buttonVariants(), "mt-6")}>
          Go Home
        </Link>
      </div>
    );
  }

  const isTemplate = type === "template";
  const fullPrice = item.price;
  const chargeAmount = isTemplate ? Math.round(fullPrice / 2) : fullPrice;
  const remainingBalance = isTemplate ? fullPrice - chargeAmount : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const params = new URLSearchParams({
        type,
        slug: slug!,
        email,
        name,
      });
      router.push(`/checkout/success?${params.toString()}`);
    }, 2000);
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <motion.div variants={fadeIn}>
        <Link
          href={isTemplate ? `/templates/${slug}` : `/products/${slug}`}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back to {item.name}
        </Link>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
          Checkout
        </h1>
        {isTemplate && (
          <Badge variant="outline" className="mt-2">
            50% Deposit
          </Badge>
        )}
      </motion.div>

      {/* Order Summary */}
      <motion.div
        variants={fadeInUp}
        className="mt-8 rounded-xl border border-border bg-card p-6"
      >
        <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Order Summary
        </h2>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="font-heading font-semibold text-foreground">{item.name}</p>
            <p className="text-sm text-muted-foreground">
              {isTemplate ? `${(template as typeof templates[0]).tier === "premium" ? "Premium" : "Starter"} Template` : (product as typeof products[0]).category}
            </p>
          </div>
          <div className="text-right">
            {isTemplate && (
              <p className="text-sm text-muted-foreground line-through">
                R{fullPrice.toLocaleString()}
              </p>
            )}
            <p className="font-heading text-2xl font-bold text-foreground">
              R{chargeAmount.toLocaleString()}
            </p>
            {isTemplate && (
              <p className="text-xs text-muted-foreground">
                50% deposit — R{remainingBalance.toLocaleString()} due on delivery
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Payment Form */}
      <motion.form
        variants={fadeInUp}
        onSubmit={handleSubmit}
        className="mt-8 space-y-6"
      >
        <div className="rounded-xl border border-border bg-card p-6 space-y-5">
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Your Details
          </h2>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Smith"
              className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
            />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 space-y-5">
          <h2 className="flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <CreditCard size={16} />
            Payment Details
          </h2>

          <div>
            <label htmlFor="card" className="block text-sm font-medium text-foreground">
              Card Number
            </label>
            <input
              id="card"
              type="text"
              defaultValue="4242 4242 4242 4242"
              readOnly
              className="mt-1.5 w-full rounded-lg border border-input bg-muted/50 px-4 py-2.5 text-sm text-muted-foreground cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Test mode — no real payment will be processed
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiry" className="block text-sm font-medium text-foreground">
                Expiry Date
              </label>
              <input
                id="expiry"
                type="text"
                defaultValue="12/28"
                readOnly
                className="mt-1.5 w-full rounded-lg border border-input bg-muted/50 px-4 py-2.5 text-sm text-muted-foreground cursor-not-allowed"
              />
            </div>
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-foreground">
                CVV
              </label>
              <input
                id="cvv"
                type="text"
                defaultValue="123"
                readOnly
                className="mt-1.5 w-full rounded-lg border border-input bg-muted/50 px-4 py-2.5 text-sm text-muted-foreground cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Security badges */}
        <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Lock size={14} />
            SSL Encrypted
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} />
            Secure Checkout
          </span>
        </div>

        {/* Pay button */}
        <button
          type="submit"
          disabled={processing}
          className={cn(
            buttonVariants({ size: "lg" }),
            "w-full gap-2 text-base font-semibold glow-primary",
            processing && "opacity-70 cursor-not-allowed"
          )}
        >
          {processing ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Processing...
            </>
          ) : (
            <>
              Pay R{chargeAmount.toLocaleString()}
              {isTemplate && " (50% Deposit)"}
            </>
          )}
        </button>

        <p className="text-center text-xs text-muted-foreground">
          {isTemplate
            ? "You're paying a 50% deposit. The remaining balance is due on delivery of your branded website."
            : "After payment, you'll answer a few questions about your business. Your personalised results will be emailed within minutes."}
        </p>
      </motion.form>
    </motion.div>
  );
}

export default function CheckoutPage() {
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
          <CheckoutForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
