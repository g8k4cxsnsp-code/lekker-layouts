"use client";

import { CheckCircle2, Clock, Mail, MessageCircle, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";
import type { Product } from "@/data/products";
import Link from "next/link";

interface QuestionnaireSubmittedProps {
  product: Product;
  email: string;
}

export function QuestionnaireSubmitted({ product, email }: QuestionnaireSubmittedProps) {
  const whatsappMessage = encodeURIComponent(
    `Hi! I just purchased the ${product.name} and submitted my questionnaire. Just confirming everything went through!`
  );
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div
      className="text-center"
    >
      <div className="flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle2 size={40} className="text-green-600 dark:text-green-400" />
        </div>
      </div>

      <h2
        className="mt-6 font-heading text-2xl font-bold text-foreground sm:text-3xl"
      >
        Your personalised {product.name} is being created!
      </h2>

      <p className="mt-3 text-muted-foreground">
        You&apos;ll receive your results at <strong className="text-foreground">{email}</strong>
      </p>

      {/* Timeline */}
      <div className="mt-8 space-y-4">
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
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3">
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
        </Link>
      </div>
    </div>
  );
}
