"use client";

import { Suspense } from "react";
import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Sparkles,
  Clock,
  Mail,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fadeIn, fadeInUp, staggerContainer, popIn } from "@/lib/animations";
import { products } from "@/data/products";
import { SITE_CONFIG } from "@/lib/constants";

function SuccessContent() {
  const searchParams = useSearchParams();
  const params = useParams();
  const slug = params.slug as string;
  const orderId = searchParams.get("orderId") || "";
  const email = searchParams.get("email") || "your email";
  const name = searchParams.get("name") || "";
  const status = searchParams.get("status");

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="py-32 text-center">
        <h1 className="font-heading text-2xl font-bold">Order not found</h1>
        <Link href="/products" className={cn(buttonVariants(), "mt-6")}>
          Browse Products
        </Link>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hi! I just purchased the ${product.name} (Order #LL-${orderId}). Just confirming everything went through!`
  );
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8"
    >
      {/* Success icon */}
      <motion.div variants={popIn} className="flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle2 size={40} className="text-green-600 dark:text-green-400" />
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="mt-8 text-center">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Payment Confirmed!
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Your personalised <strong className="text-foreground">{product.name}</strong> is being created.
        </p>
        {orderId && (
          <p className="mt-1 text-sm text-muted-foreground">
            Order <span className="font-mono font-medium text-foreground">#LL-{orderId}</span>
          </p>
        )}
      </motion.div>

      {/* Expired notice */}
      {status === "expired" && (
        <motion.div
          variants={fadeIn}
          className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/30"
        >
          <p className="text-center text-sm text-amber-800 dark:text-amber-200">
            Your payment was confirmed but the session timed out. WhatsApp us with your order number if you don&apos;t receive your email within 30 minutes.
          </p>
        </motion.div>
      )}

      {/* Timeline */}
      <motion.div variants={fadeInUp} className="mt-8 space-y-4">
        {[
          {
            icon: <Sparkles size={18} />,
            title: "Analysing your business",
            description: "We're reviewing your answers and researching your industry.",
          },
          {
            icon: <Clock size={18} />,
            title: "Creating your deliverables",
            description: `Your personalised ${product.name} is being put together.`,
          },
          {
            icon: <Mail size={18} />,
            title: `Delivered ${product.estimatedDelivery.toLowerCase()}`,
            description: `Everything will be sent to ${email}. Check your inbox (and spam folder).`,
          },
        ].map((step, i) => (
          <div
            key={step.title}
            className="flex gap-4 rounded-lg border border-border bg-card p-4 text-left"
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
      </motion.div>

      {/* Actions */}
      <motion.div variants={fadeInUp} className="mt-8 flex flex-col gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full gap-2")}
        >
          <MessageCircle size={18} />
          Questions? WhatsApp Us
        </a>
        <Link
          href="/products"
          className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "w-full gap-2")}
        >
          Browse More Products
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function OrderSuccessPage() {
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
