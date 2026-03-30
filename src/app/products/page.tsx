"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock, ShoppingBag, Target } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { products } from "@/data/products";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/animations";

export default function ProductsPage() {
  const activeProducts = products.filter((p) => p.isActive);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <motion.div variants={fadeIn}>
                <Badge variant="outline" className="mb-4">
                  <ShoppingBag size={12} className="mr-1" />
                  Digital Products
                </Badge>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
              >
                Personalised Digital Products
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
              >
                Tell us about your business, and we&apos;ll create tailored
                resources just for you — delivered to your inbox within minutes.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            >
              {activeProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={fadeInUp}
                  className={cn(
                    "group overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg",
                    product.isBundle
                      ? "border-primary/30 hover:border-primary/50 ring-1 ring-primary/10"
                      : "border-border hover:border-primary/30"
                  )}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Image
                      src={product.thumbnailUrl}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    {/* Badges */}
                    <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                      <Badge variant="secondary" className="gap-1 text-xs">
                        <Target size={10} />
                        Personalised
                      </Badge>
                      {product.isBundle && (
                        <Badge variant="default" className="text-xs">
                          Best Value
                        </Badge>
                      )}
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
                      <Clock size={12} />
                      {product.estimatedDelivery}
                    </div>

                    {/* Price */}
                    <div className="mt-3 flex items-baseline gap-2">
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          R{product.originalPrice}
                        </span>
                      )}
                      <span className="font-heading text-2xl font-bold text-foreground">
                        R{product.price}
                      </span>
                      {product.isBundle && product.originalPrice && (
                        <Badge variant="default" className="text-xs">
                          Save R{product.originalPrice - product.price}
                        </Badge>
                      )}
                    </div>

                    <div className="mt-4 flex flex-col gap-2">
                      <Link
                        href={`/checkout?type=product&slug=${product.slug}`}
                        className={cn(buttonVariants(), "w-full gap-2")}
                      >
                        Get Started — R{product.price}
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
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.h2
                variants={fadeInUp}
                className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                Need a Full Custom Website?
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
              >
                Love your personalised blueprint and copy? Let us build the
                actual website for you — hand-coded and ready to launch.
              </motion.p>
              <motion.div variants={fadeIn} className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/templates"
                  className={cn(buttonVariants({ size: "lg" }), "gap-2")}
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
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
