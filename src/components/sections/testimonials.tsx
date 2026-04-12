"use client";

import { Quote, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    name: "Thabo M.",
    business: "Mobile Detailing, Johannesburg",
    quote:
      "I signed up to see what it was about and within a week I had three new connections who referred clients to me. This is LinkedIn but for real SA hustlers.",
    initials: "TM",
    rating: 5,
  },
  {
    name: "Lerato K.",
    business: "Beauty Salon, Pretoria",
    quote:
      "Finally a platform that gets small business in South Africa. I love posting my deals and seeing other businesses grow alongside mine.",
    initials: "LK",
    rating: 5,
  },
  {
    name: "James vR.",
    business: "Photography, Cape Town",
    quote:
      "The website blueprint I bought was already filled in with my business info from my profile. Saved me hours. Brilliant concept.",
    initials: "JR",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge variant="outline" className="mb-4">
            Community
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            What Business Owners Say
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Real entrepreneurs, real results.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative rounded-2xl border border-border/60 bg-card p-7 transition-shadow hover:shadow-md card-hover"
            >
              <Quote
                size={40}
                className="absolute right-6 top-6 text-primary/10"
              />

              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.business}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
