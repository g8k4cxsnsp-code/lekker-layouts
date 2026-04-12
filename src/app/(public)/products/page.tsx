"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, ShoppingBag, Target, Sparkles, Zap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { products } from "@/data/products";

export default function ProductsPage() {
  const activeProducts = products.filter((p) => p.isActive);

  return (
    <>
      {/* Hero */}
        <section className="relative overflow-hidden bg-muted/30 py-20">
          <div className="absolute inset-0 -z-10">
            <div className="absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-primary/[0.05] blur-[100px]" />
            <div className="absolute -left-40 bottom-0 h-[300px] w-[300px] rounded-full bg-accent/[0.05] blur-[100px]" />
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="animate-fade-in-up text-center">
              <Badge variant="outline" className="mb-4 gap-1.5">
                <ShoppingBag size={12} />
                Digital Products
              </Badge>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Personalised Digital Products
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Tell us about your business, and we&apos;ll create tailored
                resources just for you — delivered to your inbox within minutes.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Target size={14} className="text-primary" />
                  </div>
                  100% Personalised
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                    <Zap size={14} className="text-accent" />
                  </div>
                  Delivered in Minutes
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Sparkles size={14} className="text-primary" />
                  </div>
                  AI-Powered
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {activeProducts.map((product) => (
                <div
                  key={product.id}
                  className={cn(
                    "group overflow-hidden rounded-2xl border-2 bg-card transition-all hover:shadow-lg card-hover",
                    product.isBundle
                      ? "border-primary/30 hover:border-primary/50 ring-1 ring-primary/10"
                      : "border-primary/20 hover:border-primary/30"
                  )}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <Image
                      src={product.thumbnailUrl}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-foreground/10 to-transparent" />
                    {/* Badges */}
                    <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                      <Badge variant="secondary" className="gap-1 text-xs">
                        <Target size={10} />
                        Personalised
                      </Badge>
                      {product.isBundle && (
                        <Badge variant="default" className="gap-1 text-xs">
                          <Sparkles size={10} />
                          Best Value
                        </Badge>
                      )}
                    </div>
                    {/* Price overlay */}
                    <div className="absolute bottom-3 right-3">
                      <div className="rounded-lg bg-card/90 px-3 py-1.5 backdrop-blur-sm">
                        {product.originalPrice && (
                          <span className="mr-1.5 text-xs text-muted-foreground line-through">
                            R{product.originalPrice}
                          </span>
                        )}
                        <span className="font-heading text-lg font-bold text-foreground">
                          R{product.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <Badge variant="outline" className="mb-2 text-xs">
                      {product.category}
                    </Badge>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {product.tagline}
                    </p>

                    {/* Delivery time */}
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock size={12} className="text-accent" />
                      {product.estimatedDelivery}
                    </div>

                    {product.isBundle && product.originalPrice && (
                      <div className="mt-3 rounded-lg bg-primary/5 px-3 py-2 text-center text-xs font-medium text-primary">
                        Save R{product.originalPrice - product.price} with the bundle
                      </div>
                    )}

                    <div className="mt-4 flex flex-col gap-2">
                      <Link
                        href={`/order/${product.slug}`}
                        className={cn(buttonVariants(), "w-full gap-2")}
                      >
                        Get Started
                        <ArrowRight size={16} />
                      </Link>
                      <Link
                        href={`/products/${product.slug}`}
                        className={cn(buttonVariants({ variant: "outline" }), "w-full gap-2")}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Need a Full Custom Website?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Love your personalised blueprint and copy? Let us build the
                actual website for you — hand-coded and ready to launch.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/templates"
                  className={cn(buttonVariants({ size: "lg" }), "gap-2 glow-primary")}
                >
                  Browse Website Templates
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
