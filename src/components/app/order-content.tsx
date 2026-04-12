"use client";

import { useState } from "react";
import {
  Check,
  Loader2,
  Crown,
  ShoppingBag,
  Briefcase,
  MapPin,
  Palette,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";

interface OrderContentProps {
  product: Product;
  profile: any;
  isPremium: boolean;
  discount: number;
  finalPrice: number;
}

export function OrderContent({
  product,
  profile,
  isPremium,
  discount,
  finalPrice,
}: OrderContentProps) {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "product",
          productSlug: product.slug,
          productName: product.name,
          amount: finalPrice * 100, // cents
          useProfile: true,
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

  const profileDataPoints = [
    {
      icon: Briefcase,
      label: "Business",
      value: profile.business_name,
    },
    {
      icon: MapPin,
      label: "Location",
      value: profile.location,
    },
    {
      icon: Palette,
      label: "Brand Voice",
      value: profile.brand_voice,
    },
    {
      icon: MessageSquare,
      label: "Audience",
      value: profile.target_audience,
    },
  ].filter((d) => d.value);

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      <div
      >
        {/* Product header */}
        <div
          className="rounded-xl border border-border bg-card p-6"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <ShoppingBag size={24} className="text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="font-heading text-xl font-bold text-foreground">
                {product.name}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {product.tagline}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.deliverables.map((d) => (
                  <Badge key={d.title} variant="secondary" className="text-xs">
                    {d.title}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Profile data summary */}
        <div
          className="mt-4 rounded-xl border border-border bg-card p-5"
        >
          <h3 className="font-heading text-sm font-semibold text-foreground mb-3">
            We&apos;ll customise this using your profile
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {profileDataPoints.map((point) => (
              <div
                key={point.label}
                className="flex items-start gap-2 text-sm"
              >
                <point.icon
                  size={14}
                  className="mt-0.5 shrink-0 text-primary"
                />
                <div>
                  <p className="text-xs text-muted-foreground">
                    {point.label}
                  </p>
                  <p className="text-foreground line-clamp-1">{point.value}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            No forms to fill in — your profile data is used to personalise everything automatically.
          </p>
        </div>

        {/* Price & pay */}
        <div
          className="mt-4 rounded-xl border border-border bg-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">
                  R{finalPrice}
                </span>
                {discount > 0 && (
                  <span className="text-sm text-muted-foreground line-through">
                    R{product.price}
                  </span>
                )}
              </div>
              {isPremium && (
                <div className="mt-1 flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                  <Crown size={12} />
                  15% Premium discount applied
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handlePurchase}
            disabled={loading}
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-4 w-full gap-2 glow-primary"
            )}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Check size={16} />
                Pay R{finalPrice}
              </>
            )}
          </button>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Delivered to your email within {product.estimatedDelivery}. Powered by Yoco.
          </p>
        </div>
      </div>
    </div>
  );
}
