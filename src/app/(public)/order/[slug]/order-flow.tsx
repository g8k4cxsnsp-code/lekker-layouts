"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ClipboardList,
  CreditCard,
  Loader2,
  AlertCircle,
  ShieldCheck,
  Lock,
  Sparkles,
  Clock,
  Mail,
  MessageCircle,
  CheckCircle2,
  User,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fadeIn, fadeInUp, staggerContainer, popIn } from "@/lib/animations";
import { SITE_CONFIG } from "@/lib/constants";
import { QuestionnaireSection } from "@/components/questionnaire/questionnaire-section";
import { QuestionnaireProgress } from "@/components/questionnaire/questionnaire-progress";
import type { Product } from "@/data/products";

interface OrderFlowProps {
  product: Product;
}

type FlowStep = "questionnaire" | "details" | "payment" | "processing" | "success" | "error";

export function OrderFlow({ product }: OrderFlowProps) {
  const searchParams = useSearchParams();
  const wasCancelled = searchParams.get("cancelled") === "true";

  const sections = product.questionnaire;
  const totalQuestionnaireSteps = sections.length;

  // Questionnaire state
  const [currentSection, setCurrentSection] = useState(0);
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Contact details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Flow state
  const [flowStep, setFlowStep] = useState<FlowStep>("questionnaire");
  const [errorMessage, setErrorMessage] = useState("");
  const [orderId] = useState(() => Date.now().toString(36).toUpperCase().slice(-6));

  // Storage key for auto-save
  const storageKey = `order-${product.slug}`;

  // Load saved progress
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.values) setValues(parsed.values);
        if (typeof parsed.section === "number") setCurrentSection(parsed.section);
        if (parsed.name) setName(parsed.name);
        if (parsed.email) setEmail(parsed.email);
      }
    } catch {
      // Ignore
    }
  }, [storageKey]);

  // Auto-save progress
  const saveProgress = useCallback(() => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ values, section: currentSection, name, email })
      );
    } catch {
      // Ignore
    }
  }, [storageKey, values, currentSection, name, email]);

  useEffect(() => {
    const timer = setTimeout(saveProgress, 500);
    return () => clearTimeout(timer);
  }, [saveProgress]);

  // Show cancelled message
  useEffect(() => {
    if (wasCancelled) {
      setFlowStep("questionnaire");
      setErrorMessage("Payment was cancelled. Your answers are saved — you can try again when you're ready.");
    }
  }, [wasCancelled]);

  // Field change handler
  const handleChange = (fieldId: string, value: string | string[]) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[fieldId];
      return next;
    });
  };

  // Validation
  const validateSection = (sectionIndex: number): boolean => {
    const section = sections[sectionIndex];
    const newErrors: Record<string, string> = {};

    for (const field of section.fields) {
      if (!field.required) continue;
      const val = values[field.id];

      if (field.type === "multi-select") {
        if (!Array.isArray(val) || val.length === 0) {
          newErrors[field.id] = "Please select at least one option.";
        }
      } else {
        if (!val || (typeof val === "string" && !val.trim())) {
          newErrors[field.id] = "This field is required.";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAllSections = (): boolean => {
    const allErrors: Record<string, string> = {};
    for (const section of sections) {
      for (const field of section.fields) {
        if (!field.required) continue;
        const val = values[field.id];
        if (field.type === "multi-select") {
          if (!Array.isArray(val) || val.length === 0) {
            allErrors[field.id] = "Please select at least one option.";
          }
        } else {
          if (!val || (typeof val === "string" && !val.trim())) {
            allErrors[field.id] = "This field is required.";
          }
        }
      }
    }
    setErrors(allErrors);
    return Object.keys(allErrors).length === 0;
  };

  // Navigation
  const handleNextSection = () => {
    if (validateSection(currentSection)) {
      if (currentSection < totalQuestionnaireSteps - 1) {
        setCurrentSection((prev) => prev + 1);
      } else {
        // All questionnaire sections done — go to details step
        setFlowStep("details");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBackSection = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToQuestionnaire = () => {
    setFlowStep("questionnaire");
    setCurrentSection(totalQuestionnaireSteps - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Payment
  const handlePay = async () => {
    if (!name.trim() || !email.trim()) {
      setErrors({ name: !name.trim() ? "Required" : "", email: !email.trim() ? "Required" : "" });
      return;
    }

    if (!validateAllSections()) {
      setFlowStep("questionnaire");
      setCurrentSection(0);
      return;
    }

    setFlowStep("processing");
    setErrorMessage("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: product.slug,
          customerName: name,
          customerEmail: email,
          responses: values,
          orderId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Checkout failed");
      }

      // Clear saved data before redirecting to Yoco
      localStorage.removeItem(storageKey);

      // Redirect to Yoco payment page
      window.location.href = data.redirectUrl;
    } catch (error) {
      setFlowStep("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  // Compute progress for the top bar
  const progressSteps = [
    ...sections.map((s) => s.title),
    "Your Details",
    "Payment",
  ];
  const currentProgressStep =
    flowStep === "questionnaire"
      ? currentSection
      : flowStep === "details"
        ? totalQuestionnaireSteps
        : totalQuestionnaireSteps + 1;

  // ─── Success State ──────────────────────────────────────────────
  // (This is shown after redirect back from /order/[slug]/success, not here.
  //  But we include a processing state for the redirect.)

  if (flowStep === "processing") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:px-8 text-center">
        <Loader2 size={48} className="mx-auto animate-spin text-primary" />
        <h2 className="mt-6 font-heading text-xl font-bold text-foreground">
          Setting up your payment...
        </h2>
        <p className="mt-2 text-muted-foreground">
          You&apos;ll be redirected to our secure payment page in a moment.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Back link */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible">
        <Link
          href={`/products/${product.slug}`}
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back to {product.name}
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="mb-2"
      >
        <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Get Your {product.name}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Tell us about your business, then complete payment. Your personalised results will be emailed {product.estimatedDelivery.toLowerCase()}.
        </p>
      </motion.div>

      {/* Progress bar */}
      <div className="my-8">
        <QuestionnaireProgress
          currentStep={currentProgressStep}
          totalSteps={progressSteps.length}
          stepLabels={progressSteps}
        />
      </div>

      {/* Cancelled / Error banner */}
      {(wasCancelled || flowStep === "error") && errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-destructive" />
          <div className="text-sm">
            <p className="font-medium text-destructive">{errorMessage}</p>
            <p className="mt-1 text-muted-foreground">
              You can also{" "}
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Hi! I'm trying to purchase the ${product.name} but ran into an issue. Can you help?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline"
              >
                WhatsApp us
              </a>{" "}
              for help.
            </p>
          </div>
        </motion.div>
      )}

      {/* ─── Questionnaire Step ──────────────────────────────── */}
      {flowStep === "questionnaire" && (
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <div className="rounded-xl border border-border bg-card p-6">
            <QuestionnaireSection
              section={sections[currentSection]}
              values={values}
              onChange={handleChange}
              errors={errors}
            />
          </div>

          <div className="mt-6 flex gap-3">
            {currentSection > 0 && (
              <button
                type="button"
                onClick={handleBackSection}
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
              >
                <ArrowLeft size={16} />
                Back
              </button>
            )}
            <div className="flex-1" />
            <button
              type="button"
              onClick={handleNextSection}
              className={cn(buttonVariants({ size: "lg" }), "gap-2")}
            >
              {currentSection < totalQuestionnaireSteps - 1 ? "Next" : "Continue to Details"}
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      )}

      {/* ─── Details Step ────────────────────────────────────── */}
      {flowStep === "details" && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Contact info card */}
          <motion.div variants={fadeInUp} className="rounded-xl border border-border bg-card p-6 space-y-5">
            <div className="flex items-center gap-2">
              <User size={18} className="text-primary" />
              <h2 className="font-heading text-lg font-semibold text-foreground">
                Your Details
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Where should we send your personalised {product.name}?
            </p>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => ({ ...prev, name: "" }));
                }}
                placeholder="John Smith"
                className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-destructive">{errors.name}</p>
              )}
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
                placeholder="john@example.com"
                className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-destructive">{errors.email}</p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">
                Your results will be emailed here {product.estimatedDelivery.toLowerCase()}.
              </p>
            </div>
          </motion.div>

          {/* Order summary card */}
          <motion.div variants={fadeInUp} className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Order Summary
            </h2>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="font-heading font-semibold text-foreground">{product.name}</p>
                <p className="text-sm text-muted-foreground">{product.category}</p>
              </div>
              <div className="text-right">
                {product.originalPrice && (
                  <p className="text-sm text-muted-foreground line-through">
                    R{product.originalPrice}
                  </p>
                )}
                <p className="font-heading text-2xl font-bold text-foreground">
                  R{product.price}
                </p>
              </div>
            </div>

            {/* What you get summary */}
            <div className="mt-4 border-t border-border pt-4">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                What you&apos;ll receive
              </p>
              <ul className="space-y-1.5">
                {product.deliverables.slice(0, 4).map((d) => (
                  <li key={d.title} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check size={14} className="shrink-0 text-primary" />
                    {d.title}
                  </li>
                ))}
                {product.deliverables.length > 4 && (
                  <li className="text-sm text-muted-foreground">
                    + {product.deliverables.length - 4} more
                  </li>
                )}
              </ul>
            </div>
          </motion.div>

          {/* Security badges */}
          <motion.div variants={fadeIn} className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Lock size={14} />
              SSL Encrypted
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} />
              Secure Payment via Yoco
            </span>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={fadeIn} className="flex gap-3">
            <button
              type="button"
              onClick={handleBackToQuestionnaire}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <div className="flex-1" />
            <button
              type="button"
              onClick={handlePay}
              className={cn(buttonVariants({ size: "lg" }), "gap-2 glow-primary")}
            >
              <CreditCard size={16} />
              Pay R{product.price}
            </button>
          </motion.div>

          <p className="text-center text-xs text-muted-foreground">
            You&apos;ll be redirected to Yoco&apos;s secure payment page. After payment, your personalised results will be emailed {product.estimatedDelivery.toLowerCase()}.
          </p>
        </motion.div>
      )}

      {/* ─── Error State ─────────────────────────────────────── */}
      {flowStep === "error" && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center py-8"
        >
          <motion.div variants={fadeInUp}>
            <AlertCircle size={48} className="mx-auto text-destructive" />
            <h2 className="mt-4 font-heading text-xl font-bold text-foreground">
              Something went wrong
            </h2>
            <p className="mt-2 text-muted-foreground">{errorMessage}</p>
            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setFlowStep("details");
                  setErrorMessage("");
                }}
                className={cn(buttonVariants({ size: "lg" }), "gap-2")}
              >
                Try Again
              </button>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Hi! I'm trying to purchase the ${product.name} but got an error: ${errorMessage}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
              >
                <MessageCircle size={16} />
                WhatsApp Us for Help
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
