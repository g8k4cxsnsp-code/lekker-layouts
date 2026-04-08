"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Car,
  Droplets,
  Sparkles,
  Shield,
  Star,
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  ChevronRight,
  Award,
  Users,
  ThumbsUp,
  Mail,
  Globe,
  Camera,
} from "lucide-react";
import {
  fadeIn,
  fadeInUp,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/animations";

// ─── Animated Section Wrapper ────────────────────────────────────────────────
function AnimatedSection({
  children,
  className = "",
  variants = fadeInUp,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: typeof fadeInUp;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const navLinks = ["Home", "Services", "Gallery", "About", "Contact"];

const services = [
  {
    icon: Droplets,
    title: "Exterior Wash",
    price: "R350",
    description:
      "Thorough hand wash, wheel cleaning, tyre dressing, and streak-free window finish.",
  },
  {
    icon: Car,
    title: "Full Detail",
    price: "R1,200",
    description:
      "Complete interior & exterior detail including upholstery cleaning, polish, and wax protection.",
  },
  {
    icon: Sparkles,
    title: "Paint Correction",
    price: "R2,500",
    description:
      "Multi-stage machine polishing to remove swirl marks, scratches, and restore factory-level gloss.",
  },
  {
    icon: Shield,
    title: "Ceramic Coating",
    price: "R4,500",
    description:
      "Professional-grade 9H ceramic coating for long-lasting paint protection and hydrophobic shine.",
  },
];

const testimonials = [
  {
    name: "David Muller",
    text: "Absolutely blown away by the paint correction on my black BMW. ShineWorks brought it back to showroom condition. Highly recommend!",
    rating: 5,
  },
  {
    name: "Thandi Nkosi",
    text: "Best detailing service in Cape Town. The ceramic coating on my Polo has been incredible \u2014 water just beads right off. Worth every rand.",
    rating: 5,
  },
  {
    name: "Marco van Wyk",
    text: "I bring my bakkie here every month. The guys are professional, thorough, and the price is very fair. Five stars all round.",
    rating: 5,
  },
];

// ─── Navigation ──────────────────────────────────────────────────────────────

function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#1a1a2e]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500">
            <Car className="h-5 w-5 text-[#1a1a2e]" />
          </div>
          <span className="text-lg font-bold text-white">
            ShineWorks <span className="text-amber-400">Detailing</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-gray-300 transition-colors hover:text-amber-400"
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-semibold text-[#1a1a2e] transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/25"
          >
            Book Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-gray-300 transition-colors hover:text-amber-400 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-white/10 bg-[#1a1a2e]/95 backdrop-blur-xl md:hidden"
        >
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-base font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-amber-400"
              >
                {link}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 block rounded-lg bg-amber-500 px-3 py-2.5 text-center text-base font-semibold text-[#1a1a2e] transition-all hover:bg-amber-400"
            >
              Book Now
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#1a1a2e] pt-16"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=1200&q=80"
          alt="Car being detailed and polished"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </div>
      <div className="absolute inset-0 bg-[#1a1a2e]/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(245,158,11,0.12),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(217,119,6,0.08),_transparent_60%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.div variants={fadeIn}>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-400">
              <Sparkles className="h-4 w-4" />
              Premium Auto Detailing in Cape Town
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mx-auto max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Your Car Deserves{" "}
            <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 bg-clip-text text-transparent">
              the Best
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl"
          >
            Professional detailing services that restore, protect, and enhance your
            vehicle. From a quick wash to full ceramic coating, we deliver
            showroom-quality results every time.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-8 py-3.5 text-base font-semibold text-[#1a1a2e] shadow-lg shadow-amber-500/25 transition-all hover:bg-amber-400 hover:shadow-xl hover:shadow-amber-500/30"
            >
              Book Now
              <ChevronRight className="h-4 w-4" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-amber-500/40 hover:bg-white/10"
            >
              View Services
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={fadeIn}
            className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-gray-500"
          >
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              4.9 Rating
            </span>
            <span className="hidden h-4 w-px bg-gray-700 sm:block" />
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-amber-400" />
              2,000+ Cars Detailed
            </span>
            <span className="hidden h-4 w-px bg-gray-700 sm:block" />
            <span className="flex items-center gap-1.5">
              <Award className="h-4 w-4 text-amber-400" />
              5 Years Experience
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t from-[#0f0f23] to-transparent" />
    </section>
  );
}

// ─── Services Section ────────────────────────────────────────────────────────

function ServicesSection() {
  return (
    <section id="services" className="relative bg-[#0f0f23] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-400">
            Our Services
          </span>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            What We <span className="text-amber-400">Offer</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            From a basic exterior wash to a full ceramic coating, we have a
            package to suit every need and budget.
          </p>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={fadeInUp}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-6 transition-all duration-300 hover:border-amber-500/30 hover:bg-white/[0.06]">
                {/* Icon */}
                <div className="mb-5 inline-flex rounded-xl bg-amber-500/10 p-3 text-amber-400 transition-colors group-hover:bg-amber-500/20">
                  <service.icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-gray-400">
                  {service.description}
                </p>

                {/* Price */}
                <div className="mt-auto">
                  <span className="text-2xl font-bold text-amber-400">
                    {service.price}
                  </span>
                </div>

                {/* Hover glow */}
                <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-amber-500/5 blur-2xl transition-all duration-500 group-hover:bg-amber-500/10" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Before & After Gallery ──────────────────────────────────────────────────

function GallerySection() {
  const galleryItems = [
    {
      title: "Full Exterior Detail",
      image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80",
      imageAlt: "Clean car exterior after detailing",
      beforeLabel: "Dull, swirl-marked paint",
      afterLabel: "Mirror-finish gloss restored",
    },
    {
      title: "Interior Deep Clean",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
      imageAlt: "Clean car interior",
      beforeLabel: "Stained upholstery & dash",
      afterLabel: "Factory-fresh interior",
    },
    {
      title: "Paint Correction",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80",
      imageAlt: "Sports car with flawless paint",
      beforeLabel: "Oxidation & deep scratches",
      afterLabel: "Flawless, glossy finish",
    },
  ];

  return (
    <section id="gallery" className="relative bg-[#1a1a2e] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-400">
            Our Work
          </span>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Before & <span className="text-amber-400">After</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            See the transformation for yourself. Every vehicle gets our full
            attention to detail.
          </p>
        </AnimatedSection>

        <div className="grid gap-8 md:grid-cols-3">
          {galleryItems.map((item, index) => (
            <AnimatedSection key={item.title} variants={scaleIn}>
              <div className="overflow-hidden rounded-2xl border border-white/5">
                {/* Photo with overlay labels */}
                <div className="relative aspect-[16/9]">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    loading="lazy"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between">
                    <span className="rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur-sm">
                      {item.beforeLabel}
                    </span>
                    <span className="rounded-full bg-amber-500/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      {item.afterLabel}
                    </span>
                  </div>
                </div>
                {/* Caption */}
                <div className="bg-white/[0.03] p-4 text-center">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ───────────────────────────────────────────────────────────

function WhyChooseUs() {
  const features = [
    {
      icon: Award,
      title: "Premium Products",
      description:
        "We use only top-tier, professional-grade products from trusted brands like Gyeon, Koch Chemie, and Gtechniq.",
    },
    {
      icon: Users,
      title: "Experienced Team",
      description:
        "Our skilled detailers have years of hands-on experience and are trained in the latest techniques.",
    },
    {
      icon: ThumbsUp,
      title: "Satisfaction Guaranteed",
      description:
        "Not happy with the result? We will re-do it at no extra cost. Your satisfaction is our top priority.",
    },
  ];

  return (
    <section id="about" className="relative bg-[#0f0f23] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-400">
            Why Us
          </span>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Why Choose <span className="text-amber-400">ShineWorks</span>
          </h2>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid gap-8 md:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={fadeInUp}>
              <div className="group relative h-full rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-8 text-center transition-all duration-300 hover:border-amber-500/20">
                <div className="mx-auto mb-6 inline-flex rounded-2xl bg-amber-500/10 p-4 text-amber-400 transition-colors group-hover:bg-amber-500/20">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Testimonials ────────────────────────────────────────────────────────────

function TestimonialsSection() {
  return (
    <section className="relative bg-[#1a1a2e] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-400">
            Testimonials
          </span>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            What Our <span className="text-amber-400">Clients Say</span>
          </h2>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.name} variants={fadeInUp}>
              <div className="h-full rounded-2xl border border-white/5 bg-white/[0.03] p-6">
                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="mb-6 text-sm leading-relaxed text-gray-300 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20 text-sm font-bold text-amber-400">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <span className="text-sm font-medium text-white">
                    {testimonial.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Contact / Booking Section ───────────────────────────────────────────────

function ContactSection() {
  return (
    <section id="contact" className="relative bg-[#0f0f23] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-400">
            Get In Touch
          </span>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Book Your <span className="text-amber-400">Detail</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Fill out the form below and we will get back to you within a few
            hours to confirm your booking.
          </p>
        </AnimatedSection>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <AnimatedSection variants={slideInLeft} className="lg:col-span-3">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-5 rounded-2xl border border-white/5 bg-white/[0.03] p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. John Smith"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 082 123 4567"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-300">
                    Service
                  </label>
                  <select className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30">
                    <option value="" className="bg-[#1a1a2e]">
                      Select a service
                    </option>
                    <option value="exterior" className="bg-[#1a1a2e]">
                      Exterior Wash (R350)
                    </option>
                    <option value="full" className="bg-[#1a1a2e]">
                      Full Detail (R1,200)
                    </option>
                    <option value="paint" className="bg-[#1a1a2e]">
                      Paint Correction (R2,500)
                    </option>
                    <option value="ceramic" className="bg-[#1a1a2e]">
                      Ceramic Coating (R4,500)
                    </option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-300">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your vehicle and any specific concerns..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-amber-500 py-3.5 text-base font-semibold text-[#1a1a2e] shadow-lg shadow-amber-500/25 transition-all hover:bg-amber-400 hover:shadow-xl hover:shadow-amber-500/30 sm:w-auto sm:px-10"
              >
                Request Booking
              </button>
            </form>
          </AnimatedSection>

          {/* Sidebar info */}
          <AnimatedSection variants={slideInRight} className="lg:col-span-2">
            <div className="space-y-6">
              {/* Contact info cards */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6">
                <h3 className="mb-5 text-lg font-semibold text-white">
                  Contact Info
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-amber-500/10 p-2 text-amber-400">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Address</p>
                      <p className="text-sm text-gray-400">
                        23 Voortrekker Road
                        <br />
                        Parow, Cape Town, 7500
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-amber-500/10 p-2 text-amber-400">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Phone</p>
                      <p className="text-sm text-gray-400">021 555 0199</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-amber-500/10 p-2 text-amber-400">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Email</p>
                      <p className="text-sm text-gray-400">
                        info@shineworks.co.za
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business hours */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6">
                <h3 className="mb-5 text-lg font-semibold text-white">
                  Business Hours
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-amber-500/10 p-2 text-amber-400">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-1.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Mon - Fri</span>
                        <span className="font-medium text-white">
                          07:30 - 17:00
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Saturday</span>
                        <span className="font-medium text-white">
                          08:00 - 14:00
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Sunday</span>
                        <span className="font-medium text-white">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a1a] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500">
                <Car className="h-5 w-5 text-[#1a1a2e]" />
              </div>
              <span className="text-lg font-bold text-white">
                ShineWorks <span className="text-amber-400">Detailing</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500">
              Cape Town&apos;s trusted auto detailing professionals. Bringing
              your vehicle back to showroom condition since 2021.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wider text-gray-300 uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-sm text-gray-500 transition-colors hover:text-amber-400"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & address */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wider text-gray-300 uppercase">
              Follow Us
            </h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-all hover:border-amber-500/30 hover:text-amber-400"
                aria-label="Facebook"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-all hover:border-amber-500/30 hover:text-amber-400"
                aria-label="Instagram"
              >
                <Camera className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              23 Voortrekker Road, Parow
              <br />
              Cape Town, 7500
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 text-center">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} ShineWorks Detailing. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function AutoDetailingPreview() {
  return (
    <div className="min-h-screen bg-[#0f0f23] text-white antialiased">
      <Nav />
      <main>
        <HeroSection />
        <ServicesSection />
        <GallerySection />
        <WhyChooseUs />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
