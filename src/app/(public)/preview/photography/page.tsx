"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeIn,
  fadeInUp,
  fadeInDown,
  staggerContainer,
  slideInLeft,
  slideInRight,
  scaleIn,
  blurIn,
} from "@/lib/animations";
import {
  Camera,
  Menu,
  X,
  ChevronDown,
  Globe,
  Share2,
  Mail,
  Phone,
  MapPin,
  Star,
  Clock,
  Image as ImageIcon,
  Heart,
  ArrowRight,
  Quote,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

type GalleryCategory = "All" | "Wedding" | "Portrait" | "Commercial" | "Event";

interface GalleryItem {
  id: number;
  category: Exclude<GalleryCategory, "All">;
  aspect: string; // tailwind aspect class
  bg: string; // placeholder color
  title: string;
  image?: string; // unsplash photo URL
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, category: "Wedding", aspect: "aspect-[3/4]", bg: "bg-[#d4c5b5]", title: "Garden Ceremony", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80" },
  { id: 2, category: "Portrait", aspect: "aspect-square", bg: "bg-[#c9b99a]", title: "Studio Headshot", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80" },
  { id: 3, category: "Commercial", aspect: "aspect-[4/3]", bg: "bg-[#b8a898]", title: "Product Launch", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80" },
  { id: 4, category: "Wedding", aspect: "aspect-[3/4]", bg: "bg-[#ddd5cb]", title: "First Dance", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80" },
  { id: 5, category: "Event", aspect: "aspect-[4/3]", bg: "bg-[#c4b8a8]", title: "Gala Evening", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80" },
  { id: 6, category: "Portrait", aspect: "aspect-[3/4]", bg: "bg-[#d9cfc3]", title: "Family Session", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80" },
  { id: 7, category: "Commercial", aspect: "aspect-square", bg: "bg-[#bfb09e]", title: "Brand Story", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
  { id: 8, category: "Wedding", aspect: "aspect-[4/3]", bg: "bg-[#e0d6cc]", title: "Reception Details", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80" },
  { id: 9, category: "Event", aspect: "aspect-[3/4]", bg: "bg-[#cbbfaf]", title: "Corporate Awards", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80" },
  { id: 10, category: "Portrait", aspect: "aspect-[4/3]", bg: "bg-[#d1c4b4]", title: "Maternity Glow", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80" },
  { id: 11, category: "Wedding", aspect: "aspect-square", bg: "bg-[#c8bdb0]", title: "Bridal Prep", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80" },
  { id: 12, category: "Commercial", aspect: "aspect-[3/4]", bg: "bg-[#d6cdc2]", title: "Restaurant Menu", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
];

const CATEGORIES: GalleryCategory[] = ["All", "Wedding", "Portrait", "Commercial", "Event"];

interface ServicePackage {
  title: string;
  price: string;
  duration: string;
  photos: string;
  features: string[];
  featured?: boolean;
}

const SERVICES: ServicePackage[] = [
  {
    title: "Portrait Session",
    price: "R1,500",
    duration: "1 hour",
    photos: "20 edited photos",
    features: [
      "Professional studio or on-location",
      "Outfit change included",
      "Online gallery delivery",
      "Print-ready high resolution",
    ],
  },
  {
    title: "Wedding Package",
    price: "R15,000",
    duration: "Full day coverage",
    photos: "300+ edited photos",
    featured: true,
    features: [
      "Pre-wedding consultation",
      "Ceremony & reception coverage",
      "Engagement shoot included",
      "Premium photo album",
      "Second shooter available",
    ],
  },
  {
    title: "Commercial Shoot",
    price: "R3,500",
    duration: "2 hours",
    photos: "50 edited photos",
    features: [
      "Brand consultation",
      "Product or lifestyle shots",
      "Commercial usage license",
      "Fast 5-day turnaround",
    ],
  },
];

interface Testimonial {
  name: string;
  event: string;
  quote: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Thandi & Michael",
    event: "Wedding",
    quote:
      "Sarah captured every emotion of our special day. The photos are absolutely breathtaking \u2014 we relive the magic every time we look at them.",
    rating: 5,
  },
  {
    name: "Naledi Mokoena",
    event: "Portrait Session",
    quote:
      "I\u2019ve never felt so comfortable in front of a camera. Sarah has this incredible ability to bring out your natural beauty and confidence.",
    rating: 5,
  },
  {
    name: "Greenleaf Organics",
    event: "Commercial",
    quote:
      "The product photos Sarah delivered exceeded our expectations. Our online sales jumped 40% after updating our website with her images.",
    rating: 5,
  },
];

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

const WARM = {
  cream: "#f5f0eb",
  dark: "#3d3d3d",
  accent: "#a67c52",
  accentLight: "#c9a87c",
  lightGray: "#e8e2db",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PhotographyPreviewPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const filteredGallery =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: WARM.cream, color: WARM.dark }}>
      {/* ============================================================ */}
      {/*  NAVIGATION                                                  */}
      {/* ============================================================ */}
      <nav className="fixed top-0 right-0 left-0 z-50 transition-colors duration-300" style={{ backgroundColor: `${WARM.cream}ee`, backdropFilter: "blur(12px)" }}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <Camera size={24} style={{ color: WARM.accent }} />
            <span className="font-heading text-lg font-semibold tracking-wide" style={{ color: WARM.dark }}>
              Lens &amp; Light Studio
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium tracking-wide transition-colors duration-200"
                style={{ color: WARM.dark }}
                onMouseEnter={(e) => (e.currentTarget.style.color = WARM.accent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = WARM.dark)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full px-5 py-2 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
              style={{ backgroundColor: WARM.accent }}
            >
              Book Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t md:hidden"
              style={{ backgroundColor: WARM.cream, borderColor: WARM.lightGray }}
            >
              <div className="flex flex-col gap-4 px-6 py-6">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-base font-medium"
                    style={{ color: WARM.dark }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  className="mt-2 rounded-full px-5 py-2.5 text-center text-sm font-medium text-white"
                  style={{ backgroundColor: WARM.accent }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        {/* Subtle background pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${WARM.dark} 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Decorative lines */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="absolute top-1/4 left-1/2 h-px w-48 -translate-x-1/2 md:w-80"
          style={{ backgroundColor: WARM.accentLight, opacity: 0.3 }}
        />

        <motion.div variants={blurIn} initial="hidden" animate="visible" className="relative z-10">
          <p
            className="mb-4 text-xs font-medium uppercase tracking-[0.3em]"
            style={{ color: WARM.accent }}
          >
            Wedding &amp; Portrait Photography
          </p>

          <h1 className="font-heading text-4xl font-light leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Capturing Moments
            <br />
            <span className="italic" style={{ color: WARM.accent }}>
              That Last Forever
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed opacity-60 sm:text-lg">
            Fine art wedding and portrait photography based in Johannesburg.
            Timeless imagery that tells your unique story.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#portfolio"
              className="rounded-full px-8 py-3 text-sm font-medium text-white transition-transform duration-200 hover:scale-105"
              style={{ backgroundColor: WARM.accent }}
            >
              View Portfolio
            </a>
            <a
              href="#contact"
              className="rounded-full border px-8 py-3 text-sm font-medium transition-colors duration-200"
              style={{ borderColor: WARM.accent, color: WARM.accent }}
            >
              Get in Touch
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs uppercase tracking-[0.2em] opacity-40">Scroll</span>
          <ChevronDown size={16} className="opacity-40" />
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/*  PORTFOLIO GALLERY                                           */}
      {/* ============================================================ */}
      <section id="portfolio" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-16 text-center"
          >
            <p
              className="mb-3 text-xs font-medium uppercase tracking-[0.3em]"
              style={{ color: WARM.accent }}
            >
              Selected Work
            </p>
            <h2 className="font-heading text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
              Portfolio
            </h2>
          </motion.div>

          {/* Category filters */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 flex flex-wrap justify-center gap-2"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="rounded-full px-5 py-2 text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: activeCategory === cat ? WARM.accent : "transparent",
                  color: activeCategory === cat ? "#fff" : WARM.dark,
                  border: `1px solid ${activeCategory === cat ? WARM.accent : WARM.lightGray}`,
                }}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Masonry grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="columns-1 gap-4 sm:columns-2 lg:columns-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((item) => (
                <motion.div
                  key={item.id}
                  variants={scaleIn}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                  className="group relative mb-4 cursor-pointer overflow-hidden rounded-lg break-inside-avoid"
                >
                  {/* Photo */}
                  <div
                    className={`${item.aspect} ${item.bg} relative w-full overflow-hidden transition-transform duration-500 group-hover:scale-105`}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        style={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', inset: 0 }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Camera size={32} className="opacity-20" />
                      </div>
                    )}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                    <div className="translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-sm font-medium text-white/70">{item.category}</p>
                      <p className="font-heading text-lg font-medium text-white">{item.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  ABOUT                                                       */}
      {/* ============================================================ */}
      <section id="about" className="px-6 py-24 lg:px-8" style={{ backgroundColor: "#fff" }}>
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          {/* Photo placeholder */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            <div
              className="relative aspect-[3/4] overflow-hidden rounded-2xl"
              style={{ backgroundColor: WARM.lightGray }}
            >
              <img
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=500&q=80"
                alt="Photographer with camera"
                loading="lazy"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
            {/* Decorative frame */}
            <div
              className="absolute -right-4 -bottom-4 -z-10 aspect-[3/4] w-full rounded-2xl"
              style={{ border: `2px solid ${WARM.accentLight}`, opacity: 0.3 }}
            />
          </motion.div>

          {/* Bio */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p
              className="mb-3 text-xs font-medium uppercase tracking-[0.3em]"
              style={{ color: WARM.accent }}
            >
              The Photographer
            </p>
            <h2 className="font-heading text-3xl font-light tracking-tight sm:text-4xl">
              Hi, I&apos;m Sarah
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed opacity-70">
              <p>
                With over 10 years behind the lens, I have dedicated my career to capturing
                the authentic beauty in every moment. Based in Johannesburg, I specialise
                in wedding and portrait photography that feels timeless and true to who you are.
              </p>
              <p>
                My approach is simple: create a relaxed, joyful atmosphere where genuine
                emotions shine through. I believe the best photographs happen when people
                forget the camera is there.
              </p>
              <p>
                When I am not shooting, you will find me exploring Joburg&apos;s vibrant art
                scene, hiking in the Magaliesberg, or experimenting with film photography.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-8">
              <div>
                <p className="font-heading text-3xl font-semibold" style={{ color: WARM.accent }}>
                  500+
                </p>
                <p className="text-sm opacity-50">Sessions Shot</p>
              </div>
              <div className="h-10 w-px" style={{ backgroundColor: WARM.lightGray }} />
              <div>
                <p className="font-heading text-3xl font-semibold" style={{ color: WARM.accent }}>
                  10+
                </p>
                <p className="text-sm opacity-50">Years Experience</p>
              </div>
              <div className="h-10 w-px" style={{ backgroundColor: WARM.lightGray }} />
              <div>
                <p className="font-heading text-3xl font-semibold" style={{ color: WARM.accent }}>
                  150+
                </p>
                <p className="text-sm opacity-50">Weddings</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SERVICES                                                    */}
      {/* ============================================================ */}
      <section id="services" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-16 text-center"
          >
            <p
              className="mb-3 text-xs font-medium uppercase tracking-[0.3em]"
              style={{ color: WARM.accent }}
            >
              Investment
            </p>
            <h2 className="font-heading text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
              Packages &amp; Pricing
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base opacity-60">
              Every package includes a pre-shoot consultation, professional editing, and
              an online gallery with download access.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-8 md:grid-cols-3"
          >
            {SERVICES.map((pkg) => (
              <motion.div
                key={pkg.title}
                variants={fadeInUp}
                className="relative overflow-hidden rounded-2xl border p-8 transition-shadow duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: pkg.featured ? WARM.dark : "#fff",
                  borderColor: pkg.featured ? WARM.dark : WARM.lightGray,
                  color: pkg.featured ? "#fff" : WARM.dark,
                }}
              >
                {pkg.featured && (
                  <div
                    className="absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-medium"
                    style={{ backgroundColor: WARM.accent, color: "#fff" }}
                  >
                    Most Popular
                  </div>
                )}

                <h3 className="font-heading text-xl font-medium">{pkg.title}</h3>
                <p className="mt-4 font-heading text-4xl font-semibold" style={{ color: pkg.featured ? WARM.accentLight : WARM.accent }}>
                  {pkg.price}
                </p>

                <div className="mt-4 flex items-center gap-4 text-sm" style={{ opacity: 0.6 }}>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {pkg.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <ImageIcon size={14} />
                    {pkg.photos}
                  </span>
                </div>

                <ul className="mt-6 space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Heart
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: pkg.featured ? WARM.accentLight : WARM.accent }}
                      />
                      <span style={{ opacity: 0.8 }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-8 block rounded-full py-3 text-center text-sm font-medium transition-opacity duration-200 hover:opacity-90"
                  style={{
                    backgroundColor: pkg.featured ? WARM.accent : "transparent",
                    color: pkg.featured ? "#fff" : WARM.accent,
                    border: `1px solid ${WARM.accent}`,
                  }}
                >
                  Book This Package
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TESTIMONIALS                                                */}
      {/* ============================================================ */}
      <section className="px-6 py-24 lg:px-8" style={{ backgroundColor: "#fff" }}>
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-16 text-center"
          >
            <p
              className="mb-3 text-xs font-medium uppercase tracking-[0.3em]"
              style={{ color: WARM.accent }}
            >
              Kind Words
            </p>
            <h2 className="font-heading text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
              Client Love
            </h2>
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto max-w-3xl"
          >
            <div className="relative rounded-2xl p-8 sm:p-12" style={{ backgroundColor: WARM.cream }}>
              <Quote
                size={40}
                className="absolute top-6 left-6 opacity-10"
                style={{ color: WARM.accent }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  {/* Stars */}
                  <div className="mb-6 flex justify-center gap-1">
                    {Array.from({ length: TESTIMONIALS[activeTestimonial].rating }).map((_, i) => (
                      <Star key={i} size={16} fill={WARM.accent} style={{ color: WARM.accent }} />
                    ))}
                  </div>

                  <p className="font-heading text-lg italic leading-relaxed sm:text-xl" style={{ opacity: 0.8 }}>
                    &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
                  </p>

                  <div className="mt-6">
                    <p className="font-medium">{TESTIMONIALS[activeTestimonial].name}</p>
                    <p className="text-sm opacity-50">{TESTIMONIALS[activeTestimonial].event}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              <div className="mt-8 flex justify-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: activeTestimonial === i ? "2rem" : "0.5rem",
                      backgroundColor: activeTestimonial === i ? WARM.accent : WARM.lightGray,
                    }}
                    aria-label={`View testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CONTACT                                                     */}
      {/* ============================================================ */}
      <section id="contact" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-16 text-center"
          >
            <p
              className="mb-3 text-xs font-medium uppercase tracking-[0.3em]"
              style={{ color: WARM.accent }}
            >
              Let&apos;s Create Together
            </p>
            <h2 className="font-heading text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
              Book Your Session
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base opacity-60">
              Ready to capture your special moments? Fill in the form below and
              I&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-5">
            {/* Form */}
            <motion.form
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-5 lg:col-span-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-current"
                    style={{
                      backgroundColor: "#fff",
                      borderColor: WARM.lightGray,
                    }}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-current"
                    style={{
                      backgroundColor: "#fff",
                      borderColor: WARM.lightGray,
                    }}
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Event Type</label>
                  <select
                    className="w-full appearance-none rounded-lg border px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-current"
                    style={{
                      backgroundColor: "#fff",
                      borderColor: WARM.lightGray,
                    }}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select type
                    </option>
                    <option>Wedding</option>
                    <option>Portrait Session</option>
                    <option>Commercial Shoot</option>
                    <option>Event Coverage</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-current"
                    style={{
                      backgroundColor: "#fff",
                      borderColor: WARM.lightGray,
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">Budget Range</label>
                <select
                  className="w-full appearance-none rounded-lg border px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-current"
                  style={{
                    backgroundColor: "#fff",
                    borderColor: WARM.lightGray,
                  }}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select budget
                  </option>
                  <option>Under R2,000</option>
                  <option>R2,000 - R5,000</option>
                  <option>R5,000 - R15,000</option>
                  <option>R15,000 - R25,000</option>
                  <option>R25,000+</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">Tell Me About Your Vision</label>
                <textarea
                  rows={4}
                  placeholder="Describe the mood, location, or anything else you have in mind..."
                  className="w-full resize-none rounded-lg border px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-current"
                  style={{
                    backgroundColor: "#fff",
                    borderColor: WARM.lightGray,
                  }}
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90 sm:w-auto sm:px-10"
                style={{ backgroundColor: WARM.accent }}
              >
                Send Inquiry
                <ArrowRight size={16} />
              </button>
            </motion.form>

            {/* Contact info */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-8 lg:col-span-2"
            >
              <div>
                <h3 className="font-heading text-lg font-medium">Get in Touch</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-60">
                  Prefer to reach out directly? I&apos;d love to hear from you.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${WARM.accent}15` }}
                  >
                    <Phone size={16} style={{ color: WARM.accent }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm opacity-60">+27 82 123 4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${WARM.accent}15` }}
                  >
                    <Mail size={16} style={{ color: WARM.accent }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm opacity-60">hello@lensandlight.co.za</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${WARM.accent}15` }}
                  >
                    <MapPin size={16} style={{ color: WARM.accent }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Studio</p>
                    <p className="text-sm opacity-60">Rosebank, Johannesburg</p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div>
                <p className="mb-3 text-sm font-medium">Follow Along</p>
                <div className="flex gap-3">
                  {[
                    { icon: Globe, label: "Globe" },
                    { icon: Share2, label: "Facebook" },
                  ].map(({ icon: Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200"
                      style={{ backgroundColor: `${WARM.accent}15` }}
                    >
                      <Icon size={16} style={{ color: WARM.accent }} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FOOTER                                                      */}
      {/* ============================================================ */}
      <footer
        className="border-t px-6 py-12 lg:px-8"
        style={{ borderColor: WARM.lightGray }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <Camera size={20} style={{ color: WARM.accent }} />
            <span className="font-heading text-sm font-semibold tracking-wide">
              Lens &amp; Light Studio
            </span>
          </a>

          {/* Links */}
          <div className="flex gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs transition-colors duration-200"
                style={{ opacity: 0.5 }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Globe">
              <Globe size={16} style={{ opacity: 0.5 }} />
            </a>
            <a href="#" aria-label="Facebook">
              <Share2 size={16} style={{ opacity: 0.5 }} />
            </a>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-7xl text-center">
          <p className="text-xs opacity-40">
            &copy; {new Date().getFullYear()} Lens &amp; Light Studio. All rights reserved.
            &nbsp;|&nbsp; Built with Lekker Layouts
          </p>
        </div>
      </footer>
    </div>
  );
}
