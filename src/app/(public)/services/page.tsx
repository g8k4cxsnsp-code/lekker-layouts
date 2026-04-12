"use client";

import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Wrench,
  ShoppingBag,
  MessageSquare,
  Palette,
  Rocket,
  CheckCircle2,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const services: Service[] = [
  {
    icon: <Code2 size={28} />,
    title: "Website Development",
    description:
      "Custom-coded websites built with React and Next.js. No WordPress, no page builders. Pure performance and flexibility.",
    features: [
      "Custom React & Next.js code",
      "Mobile-first responsive design",
      "SEO optimization built-in",
      "Fast load times & Core Web Vitals",
      "Contact form integration",
      "Analytics setup",
    ],
  },
  {
    icon: <Wrench size={28} />,
    title: "Monthly Maintenance",
    description:
      "Keep your website running smoothly with regular updates, security monitoring, and performance optimization.",
    features: [
      "Monthly content updates",
      "Security patches & monitoring",
      "Performance optimization",
      "Uptime monitoring & alerts",
      "Priority email support",
      "Monthly analytics report",
    ],
  },
  {
    icon: <ShoppingBag size={28} />,
    title: "Digital Products",
    description:
      "Ready-made tools and templates to help you build your brand and grow your business online.",
    features: [
      "Social media template packs",
      "Brand identity starter kits",
      "Website content planners",
      "Business launch bundles",
      "Instant Canva template access",
      "Lifetime access",
    ],
  },
];

interface ProcessStep {
  step: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const processSteps: ProcessStep[] = [
  {
    step: 1,
    icon: <MessageSquare size={24} />,
    title: "Discovery Call",
    description:
      "We chat about your business, goals, and vision. We&apos;ll figure out the best template and plan for you.",
  },
  {
    step: 2,
    icon: <Palette size={24} />,
    title: "Design & Brand",
    description:
      "We customize your chosen template with your branding, colors, fonts, and content to make it uniquely yours.",
  },
  {
    step: 3,
    icon: <Code2 size={24} />,
    title: "Build & Refine",
    description:
      "We build your site with clean, modern code. You review it and we refine until it&apos;s perfect.",
  },
  {
    step: 4,
    icon: <Rocket size={24} />,
    title: "Launch",
    description:
      "We deploy your website, set up analytics, and hand over everything. You&apos;re live and ready to grow.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <>
        {/* Hero */}
        <section className="bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className="text-center"
            >
              <div>
                <Badge variant="outline" className="mb-4">
                  Our Services
                </Badge>
              </div>
              <h1
                className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
              >
                Everything You Need to Go Online
              </h1>
              <p
                className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
              >
                From custom websites to ongoing maintenance and digital
                products, we provide end-to-end solutions for South African
                businesses.
              </p>
            </div>
          </div>
        </section>

        {/* Services Detail */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className="space-y-16"
            >
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className={cn(
                    "grid gap-8 lg:grid-cols-2 lg:items-center",
                    index % 2 !== 0 && "lg:grid-flow-dense"
                  )}
                >
                  <div className={cn(index % 2 !== 0 && "lg:col-start-2")}>
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {service.icon}
                    </div>
                    <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground">
                      {service.title}
                    </h2>
                    <p className="mt-3 text-lg text-muted-foreground">
                      {service.description}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <CheckCircle2
                            size={18}
                            className="shrink-0 text-primary"
                          />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className={cn(
                      "flex items-center justify-center rounded-xl border border-border bg-muted/50 p-12",
                      index % 2 !== 0 && "lg:col-start-1"
                    )}
                  >
                    <div className="text-center text-muted-foreground">
                      <div className="flex justify-center">{service.icon}</div>
                      <p className="mt-4 font-heading text-lg font-semibold">
                        {service.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className="text-center"
            >
              <div>
                <Badge variant="outline" className="mb-4">
                  How It Works
                </Badge>
              </div>
              <h2
                className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                Our Process
              </h2>
              <p
                className="mx-auto mt-4 max-w-2xl text-muted-foreground"
              >
                From first contact to launch, here&apos;s how we work together
                to bring your website to life.
              </p>
            </div>

            <div
              className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            >
              {processSteps.map((step) => (
                <div
                  key={step.step}
                  className="relative rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-primary/30 hover:shadow-lg"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    {step.step}
                  </div>
                  <div className="mt-4 flex justify-center text-primary">
                    {step.icon}
                  </div>
                  <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className="rounded-2xl bg-primary px-8 py-16 text-center text-primary-foreground sm:px-16"
            >
              <h2
                className="font-heading text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Ready to Get Started?
              </h2>
              <p
                className="mx-auto mt-4 max-w-2xl text-primary-foreground/80"
              >
                Let&apos;s build something great together. Get in touch and
                we&apos;ll have your website up and running in no time.
              </p>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" }),
                    "gap-2"
                  )}
                >
                  Contact Us
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    </>
  );
}
