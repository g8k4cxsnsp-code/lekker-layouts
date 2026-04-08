"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/animations";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const serviceOptions = [
  "Starter Website (R3,500)",
  "Premium Website (R4,500)",
  "Monthly Maintenance (R800/mo)",
  "Digital Products",
  "Custom Project",
  "Other",
];

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_N8N_WEBHOOK_BASE || "https://n8n.lekkerlayouts.co.za/webhook"}/contact-form`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.service,
            message: formData.message,
          }),
        }
      );

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            "Thanks for your message! We'll get back to you within 24 hours.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message:
            "Something went wrong. Please try again or WhatsApp us for help.",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message:
          "Could not connect. Please check your internet and try again, or WhatsApp us for help.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappText = encodeURIComponent(SITE_CONFIG.whatsappMessage);
  const whatsappHref = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${whatsappText}`;

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
                  Contact
                </Badge>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
              >
                Get in Touch
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
              >
                Ready to start your project? Have a question? Drop us a message
                and we&apos;ll get back to you within 24 hours.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form + Sidebar */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-12 lg:grid-cols-3"
            >
              {/* Form */}
              <motion.div variants={fadeInUp} className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-10"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="072 123 4567"
                        value={formData.phone}
                        onChange={handleChange}
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">Service Interest</Label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="h-10 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                      >
                        <option value="">Select a service</option>
                        {serviceOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="min-h-32"
                    />
                  </div>

                  {submitStatus && (
                    <div
                      className={cn(
                        "rounded-lg p-3 text-sm",
                        submitStatus.type === "success"
                          ? "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400"
                          : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"
                      )}
                    >
                      {submitStatus.message}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && <ArrowRight size={16} />}
                  </Button>
                </form>
              </motion.div>

              {/* Sidebar */}
              <motion.div variants={fadeInUp} className="space-y-8">
                {/* Contact Info */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    Contact Info
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a
                        href={`mailto:${SITE_CONFIG.email}`}
                        className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <Mail size={18} className="text-primary" />
                        </div>
                        {SITE_CONFIG.email}
                      </a>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Phone size={18} className="text-primary" />
                      </div>
                      +27 XX XXX XXXX
                    </li>
                    <li className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <MapPin size={18} className="text-primary" />
                      </div>
                      South Africa
                    </li>
                  </ul>
                </div>

                {/* WhatsApp CTA */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    Prefer WhatsApp?
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Chat with us directly on WhatsApp for a faster response.
                  </p>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "mt-4 w-full gap-2 bg-[#25D366] text-white hover:bg-[#25D366]/90"
                    )}
                  >
                    <MessageCircle size={18} />
                    Chat on WhatsApp
                  </a>
                </div>
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
