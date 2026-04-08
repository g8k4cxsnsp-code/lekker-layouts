"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Crown,
  Package,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { Product } from "@/data/products";

interface AppProductsContentProps {
  products: Product[];
  isPremium: boolean;
}

export function AppProductsContent({
  products,
  isPremium,
}: AppProductsContentProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeInUp} className="mb-6">
          <h1 className="font-heading text-2xl font-bold text-foreground">
            Digital Products
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Business tools personalised to your brand using your profile data.
            {isPremium
              ? " You get 15% off as a Premium member!"
              : " Go Premium for 15% off all products."}
          </p>
        </motion.div>

        {!isPremium && (
          <motion.div
            variants={fadeInUp}
            className="mb-6 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/20"
          >
            <Crown size={20} className="shrink-0 text-amber-500" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                Premium members save 15% on all products
              </p>
              <p className="text-xs text-muted-foreground">
                Upgrade for R99/month to unlock discounts and more.
              </p>
            </div>
            <Link
              href="/premium"
              className={cn(
                buttonVariants({ size: "sm", variant: "outline" }),
                "shrink-0 gap-1.5 border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-950/40"
              )}
            >
              <Crown size={14} />
              Go Premium
            </Link>
          </motion.div>
        )}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-4 sm:grid-cols-2"
        >
          {products.map((product) => {
            const discountedPrice = isPremium
              ? Math.round(product.price * 0.85)
              : null;

            return (
              <motion.div
                key={product.id}
                variants={fadeInUp}
                className="group rounded-xl border border-border bg-card transition-shadow hover:shadow-md"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Package size={20} className="text-primary" />
                    </div>
                    {isPremium && (
                      <Badge className="gap-1 bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
                        <Sparkles size={10} />
                        15% off
                      </Badge>
                    )}
                  </div>

                  <h3 className="mt-3 font-heading text-base font-bold text-foreground">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {product.tagline}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {product.deliverables.slice(0, 3).map((d) => (
                      <Badge
                        key={d.title}
                        variant="secondary"
                        className="text-xs"
                      >
                        {d.title}
                      </Badge>
                    ))}
                    {product.deliverables.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{product.deliverables.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading text-xl font-bold text-foreground">
                        R{(discountedPrice || product.price).toLocaleString()}
                      </span>
                      {discountedPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          R{product.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/shop/${product.slug}`}
                      className={cn(
                        buttonVariants({ size: "sm" }),
                        "gap-1.5"
                      )}
                    >
                      Get Started
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="mt-8 rounded-xl border border-border bg-card p-6 text-center"
        >
          <Sparkles size={24} className="mx-auto text-primary" />
          <h3 className="mt-2 font-heading text-base font-semibold text-foreground">
            Personalised to your brand
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Every product is generated using your business profile — your
            industry, audience, brand voice, and services. No generic templates.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
