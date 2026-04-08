"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import { fadeInUp, staggerContainer } from "@/lib/animations";
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

export default function PremiumPage() {
  const [loading, setLoading] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  // Check premium status on mount
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

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "premium",
          amount: 9900, // R99 in cents
          name: "Lekker Layouts Premium — 30 Days",
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

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950/30">
            <Crown size={32} className="text-amber-500" />
          </div>
          <h1 className="mt-4 font-heading text-2xl font-bold text-foreground">
            Lekker Layouts Premium
          </h1>
          <p className="mt-2 text-muted-foreground">
            Get more visibility, save on products, and stand out from the crowd.
          </p>
        </motion.div>

        {/* Price card */}
        <motion.div
          variants={fadeInUp}
          className="mt-8 rounded-2xl border-2 border-amber-500/30 bg-card p-6 text-center"
        >
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl font-bold text-foreground">R99</span>
            <span className="text-muted-foreground">/month</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            One-time payment for 30 days of Premium access
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
                "mt-4 w-full gap-2 bg-amber-500 hover:bg-amber-600 text-white glow-primary"
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
        </motion.div>

        {/* Benefits */}
        <motion.div
          variants={staggerContainer}
          className="mt-8 grid gap-4 sm:grid-cols-2"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={fadeInUp}
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
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
