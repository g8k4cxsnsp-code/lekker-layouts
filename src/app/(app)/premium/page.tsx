"use client";

import { useState, useEffect } from "react";
import {
  Crown,
  Search,
  Percent,
  BadgeCheck,
  Sparkles,
  Loader2,
  Check,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const benefits = [
  {
    icon: Search,
    title: "Boosted Visibility",
    description:
      "Your profile appears at the top of Discover searches so more businesses find you first.",
  },
  {
    icon: Percent,
    title: "15% Off All Products",
    description:
      "Save on every digital product purchase — Website Blueprints, Social Media Kits, and more.",
  },
  {
    icon: BadgeCheck,
    title: "Premium Badge",
    description:
      "Stand out with a gold crown badge on your profile, posts, and messages.",
  },
  {
    icon: Sparkles,
    title: "Priority Support",
    description:
      "Get faster responses and dedicated help from the Lekker Layouts team.",
  },
];

type BillingPeriod = "monthly" | "yearly";

const plans = {
  monthly: {
    price: "R249",
    period: "/month",
    description: "Billed monthly — cancel anytime",
    amount: 24900,
    name: "Lekker Layouts Premium — Monthly",
  },
  yearly: {
    price: "R2,000",
    period: "/year",
    description: "Billed annually — save R988/year",
    amount: 200000,
    name: "Lekker Layouts Premium — 12 Months",
  },
};

export default function PremiumPage() {
  const [loading, setLoading] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [billing, setBilling] = useState<BillingPeriod>("monthly");

  useEffect(() => {
    const check = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_premium, premium_expires_at")
        .eq("id", user.id)
        .single();

      if (profile?.is_premium) {
        setIsPremium(true);
      }
    };
    check();
  }, []);

  const handleSubscribe = async () => {
    setLoading(true);
    const plan = plans[billing];

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "premium",
          amount: plan.amount,
          name: plan.name,
        }),
      });

      const data = await res.json();
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    } catch {
      setLoading(false);
    }
  };

  const plan = plans[billing];

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      <div
      >
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950/30">
            <Crown size={32} className="text-amber-500" />
          </div>
          <h1 className="mt-4 font-heading text-2xl font-bold text-foreground">
            Lekker Layouts Premium
          </h1>
          <p className="mt-2 text-muted-foreground">
            Get more visibility, save on products, and stand out from the crowd.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="mt-8 flex items-center justify-center gap-1 rounded-full bg-muted p-1">
          <button
            onClick={() => setBilling("monthly")}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-all",
              billing === "monthly"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-all",
              billing === "yearly"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Yearly
            <span className="ml-1.5 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
              Save R988
            </span>
          </button>
        </div>

        {/* Price card */}
        <div
          className="mt-6 rounded-2xl border-2 border-amber-500/30 bg-card p-6 text-center"
        >
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl font-bold text-foreground">{plan.price}</span>
            <span className="text-muted-foreground">{plan.period}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {plan.description}
          </p>

          {isPremium ? (
            <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-green-50 py-3 text-sm font-medium text-green-700 dark:bg-green-950/30 dark:text-green-400">
              <Check size={16} />
              You&apos;re a Premium member
            </div>
          ) : (
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-4 w-full gap-2 bg-amber-500 hover:bg-amber-600 text-white glow-amber"
              )}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Crown size={16} />
                  Upgrade to Premium
                </>
              )}
            </button>
          )}
        </div>

        {/* Benefits */}
        <div
          className="mt-8 grid gap-4 sm:grid-cols-2"
        >
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-950/30">
                <benefit.icon size={20} className="text-amber-500" />
              </div>
              <h3 className="mt-3 font-heading text-sm font-semibold text-foreground">
                {benefit.title}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
