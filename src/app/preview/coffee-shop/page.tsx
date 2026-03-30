"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeIn,
  fadeInUp,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
  blurIn,
} from "@/lib/animations";

/* ------------------------------------------------------------------ */
/*  Color tokens                                                       */
/* ------------------------------------------------------------------ */
const colors = {
  cream: "#faf6f0",
  brown: "#6f4e37",
  espresso: "#3c2415",
  accent: "#c78f4a",
  lightBrown: "#d4b896",
  warmGray: "#a89279",
  white: "#ffffff",
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const navLinks = ["Menu", "About", "Location", "Contact"];

const menuCategories = [
  {
    name: "Hot Drinks",
    icon: "☕",
    items: [
      { name: "Espresso", price: "R28", desc: "Rich double shot" },
      { name: "Cappuccino", price: "R38", desc: "Velvety foam & espresso" },
      { name: "Flat White", price: "R38", desc: "Smooth microfoam blend" },
      { name: "Chai Latte", price: "R42", desc: "Spiced & steamed" },
    ],
  },
  {
    name: "Cold Drinks",
    icon: "🧊",
    items: [
      { name: "Iced Latte", price: "R42", desc: "Chilled espresso & milk" },
      { name: "Cold Brew", price: "R45", desc: "24-hour steeped" },
      { name: "Smoothie", price: "R48", desc: "Seasonal fruit blend" },
    ],
  },
  {
    name: "Food",
    icon: "🥐",
    items: [
      { name: "Croissant", price: "R35", desc: "Buttery & flaky" },
      { name: "Avocado Toast", price: "R65", desc: "Sourdough, feta, seeds" },
      { name: "Granola Bowl", price: "R55", desc: "Yoghurt, honey, berries" },
    ],
  },
];

const galleryImages = [
  { label: "Latte Art", bg: "linear-gradient(135deg, #d4b896 0%, #6f4e37 100%)", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80" },
  { label: "Interior", bg: "linear-gradient(135deg, #c78f4a 0%, #3c2415 100%)", image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80" },
  { label: "Pastries", bg: "linear-gradient(135deg, #faf6f0 0%, #c78f4a 100%)", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80" },
  { label: "Coffee Beans", bg: "linear-gradient(135deg, #3c2415 0%, #6f4e37 100%)", image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80" },
  { label: "Outdoor Seating", bg: "linear-gradient(135deg, #a89279 0%, #d4b896 100%)", image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80" },
  { label: "Barista", bg: "linear-gradient(135deg, #6f4e37 0%, #c78f4a 100%)", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80" },
];

const instagramPosts = [
  { bg: "linear-gradient(135deg, #c78f4a 0%, #6f4e37 100%)", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80" },
  { bg: "linear-gradient(135deg, #3c2415 0%, #d4b896 100%)", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80" },
  { bg: "linear-gradient(135deg, #faf6f0 0%, #a89279 100%)", image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&q=80" },
  { bg: "linear-gradient(135deg, #6f4e37 0%, #3c2415 100%)", image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&q=80" },
  { bg: "linear-gradient(135deg, #d4b896 0%, #c78f4a 100%)", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80" },
  { bg: "linear-gradient(135deg, #a89279 0%, #6f4e37 100%)", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80" },
];

const hours = [
  { day: "Monday – Friday", time: "7:00 AM – 5:00 PM" },
  { day: "Saturday", time: "8:00 AM – 4:00 PM" },
  { day: "Sunday", time: "8:00 AM – 2:00 PM" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function CoffeeShopPreview() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Hot Drinks");

  return (
    <div style={{ backgroundColor: colors.cream, color: colors.espresso }}>
      {/* ============================================================ */}
      {/*  NAVIGATION                                                  */}
      {/* ============================================================ */}
      <nav
        style={{ backgroundColor: `${colors.cream}ee`, backdropFilter: "blur(12px)" }}
        className="fixed top-0 left-0 right-0 z-50 border-b"
      >
        <div
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
          style={{ borderColor: `${colors.lightBrown}40` }}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 text-xl font-bold tracking-tight" style={{ color: colors.espresso }}>
            <span className="text-2xl">☕</span>
            <span>
              Bean <span style={{ color: colors.accent }}>&amp;</span> Brew
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: colors.brown }}
              >
                {link}
              </a>
            ))}
            <a
              href="#menu"
              className="rounded-full px-5 py-2 text-sm font-semibold text-white transition-transform hover:scale-105"
              style={{ backgroundColor: colors.brown }}
            >
              Order Now
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex flex-col gap-1.5 md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span
              className="block h-0.5 w-6 rounded-full transition-transform"
              style={{
                backgroundColor: colors.espresso,
                transform: mobileOpen ? "rotate(45deg) translateY(8px)" : "none",
              }}
            />
            <span
              className="block h-0.5 w-6 rounded-full transition-opacity"
              style={{
                backgroundColor: colors.espresso,
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-0.5 w-6 rounded-full transition-transform"
              style={{
                backgroundColor: colors.espresso,
                transform: mobileOpen ? "rotate(-45deg) translateY(-8px)" : "none",
              }}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden md:hidden"
              style={{ backgroundColor: colors.cream }}
            >
              <div className="flex flex-col gap-4 px-6 py-6">
                {navLinks.map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    className="text-base font-medium"
                    style={{ color: colors.brown }}
                  >
                    {link}
                  </a>
                ))}
                <a
                  href="#menu"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 inline-block rounded-full px-5 py-2.5 text-center text-sm font-semibold text-white"
                  style={{ backgroundColor: colors.brown }}
                >
                  Order Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section
        className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
        style={{
          background: `linear-gradient(160deg, ${colors.cream} 0%, #f0e6d6 40%, ${colors.lightBrown}40 100%)`,
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-10"
          style={{ backgroundColor: colors.brown }}
        />
        <div
          className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full opacity-10"
          style={{ backgroundColor: colors.accent }}
        />

        <div className="relative z-10 mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:py-32">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6"
          >
            <motion.span
              variants={fadeIn}
              className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
              style={{ backgroundColor: `${colors.accent}20`, color: colors.accent }}
            >
              Artisan Coffee &middot; Stellenbosch
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ color: colors.espresso }}
            >
              Crafted with Love,
              <br />
              <span style={{ color: colors.brown }}>Brewed to Perfection</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="max-w-xl text-base leading-relaxed sm:text-lg"
              style={{ color: colors.warmGray }}
            >
              Discover single-origin specialty coffee in the heart of Stellenbosch.
              Every cup is a celebration of craft, community, and care.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-4 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#menu"
                className="rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
                style={{
                  backgroundColor: colors.brown,
                  boxShadow: `0 8px 30px ${colors.brown}40`,
                }}
              >
                View Our Menu
              </a>
              <a
                href="#about"
                className="rounded-full border-2 px-8 py-3.5 text-sm font-semibold transition-colors hover:bg-white/60"
                style={{ borderColor: colors.brown, color: colors.brown }}
              >
                Our Story
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeIn}
              className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-medium"
              style={{ color: colors.warmGray }}
            >
              <span className="flex items-center gap-1.5">
                <span className="text-base">⭐</span> 4.9 on Google
              </span>
              <span className="hidden h-4 w-px sm:block" style={{ backgroundColor: colors.lightBrown }} />
              <span className="flex items-center gap-1.5">
                <span className="text-base">🌱</span> Ethically Sourced
              </span>
              <span className="hidden h-4 w-px sm:block" style={{ backgroundColor: colors.lightBrown }} />
              <span className="flex items-center gap-1.5">
                <span className="text-base">🏆</span> Est. 2019
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 60L48 54C96 48 192 36 288 36C384 36 480 48 576 54C672 60 768 60 864 54C960 48 1056 36 1152 36C1248 36 1344 48 1392 54L1440 60V120H0V60Z"
              fill={colors.cream}
            />
          </svg>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  MENU                                                        */}
      {/* ============================================================ */}
      <section id="menu" className="py-20 sm:py-28" style={{ backgroundColor: colors.cream }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center"
          >
            <motion.span
              variants={fadeIn}
              className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
              style={{ backgroundColor: `${colors.accent}20`, color: colors.accent }}
            >
              Our Menu
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: colors.espresso }}
            >
              Something for Every Taste
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-3 max-w-lg text-base"
              style={{ color: colors.warmGray }}
            >
              From rich espresso to fresh pastries, everything is made with love.
            </motion.p>
          </motion.div>

          {/* Category tabs */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            {menuCategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className="rounded-full px-5 py-2.5 text-sm font-medium transition-all"
                style={{
                  backgroundColor: activeCategory === cat.name ? colors.brown : `${colors.brown}10`,
                  color: activeCategory === cat.name ? colors.white : colors.brown,
                }}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </motion.div>

          {/* Menu items */}
          <AnimatePresence mode="wait">
            {menuCategories
              .filter((c) => c.name === activeCategory)
              .map((cat) => (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                  className="mx-auto mt-10 grid max-w-3xl gap-4"
                >
                  {cat.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between rounded-2xl border p-5 transition-shadow hover:shadow-md"
                      style={{
                        backgroundColor: colors.white,
                        borderColor: `${colors.lightBrown}30`,
                      }}
                    >
                      <div>
                        <h3 className="text-base font-semibold" style={{ color: colors.espresso }}>
                          {item.name}
                        </h3>
                        <p className="mt-0.5 text-sm" style={{ color: colors.warmGray }}>
                          {item.desc}
                        </p>
                      </div>
                      <span
                        className="rounded-full px-4 py-1.5 text-sm font-bold"
                        style={{ backgroundColor: `${colors.accent}15`, color: colors.accent }}
                      >
                        {item.price}
                      </span>
                    </div>
                  ))}
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  ABOUT / STORY                                               */}
      {/* ============================================================ */}
      <section
        id="about"
        className="py-20 sm:py-28"
        style={{ backgroundColor: colors.white }}
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* About photo */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl"
          >
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80"
              alt="Barista preparing coffee"
              loading="lazy"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
            {/* Decorative badge */}
            <div
              className="absolute bottom-4 left-4 rounded-xl px-4 py-2 text-xs font-bold text-white"
              style={{ backgroundColor: `${colors.espresso}cc` }}
            >
              Since 2019
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.span
              variants={fadeIn}
              className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
              style={{ backgroundColor: `${colors.accent}20`, color: colors.accent }}
            >
              Our Story
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: colors.espresso }}
            >
              More Than Just Coffee
            </motion.h2>
            <motion.div variants={fadeInUp} className="mt-6 space-y-4 text-base leading-relaxed" style={{ color: colors.warmGray }}>
              <p>
                Bean &amp; Brew was born in 2019 from a simple belief: great coffee brings people together.
                What started as a tiny roastery on a quiet Stellenbosch side street has grown into a
                beloved community gathering place.
              </p>
              <p>
                We source single-origin beans directly from small-scale farmers in Ethiopia, Colombia,
                and Guatemala, paying well above fair-trade prices. Every batch is roasted in-house to
                bring out the unique character of each origin.
              </p>
              <p>
                Whether you are a first-time visitor or a daily regular, we want you to feel at home.
                Pull up a chair, stay awhile.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-6">
              {[
                { num: "50K+", label: "Cups Served" },
                { num: "12", label: "Origins" },
                { num: "4.9★", label: "Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-extrabold" style={{ color: colors.brown }}>
                    {stat.num}
                  </div>
                  <div className="text-xs font-medium" style={{ color: colors.warmGray }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  GALLERY                                                     */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: colors.cream }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center"
          >
            <motion.span
              variants={fadeIn}
              className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
              style={{ backgroundColor: `${colors.accent}20`, color: colors.accent }}
            >
              Gallery
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: colors.espresso }}
            >
              A Peek Inside
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-5"
          >
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.label}
                variants={scaleIn}
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl"
              >
                <img
                  src={img.image}
                  alt={img.label}
                  loading="lazy"
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
                <div className="absolute inset-0 flex flex-col items-end justify-end bg-gradient-to-t from-black/50 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-xs font-medium tracking-wide text-white">{img.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  LOCATION & HOURS                                            */}
      {/* ============================================================ */}
      <section
        id="location"
        className="py-20 sm:py-28"
        style={{ backgroundColor: colors.white }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center"
          >
            <motion.span
              variants={fadeIn}
              className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
              style={{ backgroundColor: `${colors.accent}20`, color: colors.accent }}
            >
              Visit Us
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: colors.espresso }}
            >
              Find Your Way Here
            </motion.h2>
          </motion.div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Map placeholder */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-auto lg:min-h-[380px]"
              style={{ backgroundColor: `${colors.lightBrown}30` }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" style={{ color: colors.warmGray }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.4 7 11.5 7.3 11.8a1 1 0 0 0 1.4 0C13 21.5 20 15.4 20 10a8 8 0 0 0-8-8Z" />
                </svg>
                <span className="text-sm font-medium">Map – 45 Church Street, Stellenbosch</span>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-8"
            >
              {/* Address */}
              <motion.div variants={fadeInUp}>
                <h3 className="text-lg font-bold" style={{ color: colors.espresso }}>Address</h3>
                <p className="mt-1 text-base" style={{ color: colors.warmGray }}>
                  45 Church Street
                  <br />
                  Stellenbosch, 7600
                  <br />
                  South Africa
                </p>
              </motion.div>

              {/* Hours */}
              <motion.div variants={fadeInUp}>
                <h3 className="text-lg font-bold" style={{ color: colors.espresso }}>Opening Hours</h3>
                <div className="mt-3 space-y-2">
                  {hours.map((h) => (
                    <div key={h.day} className="flex items-center justify-between rounded-xl px-4 py-2.5" style={{ backgroundColor: `${colors.cream}` }}>
                      <span className="text-sm font-medium" style={{ color: colors.espresso }}>
                        {h.day}
                      </span>
                      <span className="text-sm font-semibold" style={{ color: colors.brown }}>
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Contact */}
              <motion.div variants={fadeInUp} id="contact">
                <h3 className="text-lg font-bold" style={{ color: colors.espresso }}>Contact</h3>
                <div className="mt-2 space-y-1 text-sm" style={{ color: colors.warmGray }}>
                  <p>
                    <span className="font-medium" style={{ color: colors.espresso }}>Phone:</span>{" "}
                    +27 21 883 1234
                  </p>
                  <p>
                    <span className="font-medium" style={{ color: colors.espresso }}>Email:</span>{" "}
                    hello@beanandbrew.co.za
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  INSTAGRAM FEED                                              */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: colors.cream }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center"
          >
            <motion.span
              variants={fadeIn}
              className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
              style={{ backgroundColor: `${colors.accent}20`, color: colors.accent }}
            >
              Follow Us
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: colors.espresso }}
            >
              @beanandbrew
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
          >
            {instagramPosts.map((post, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl"
              >
                <img
                  src={post.image}
                  alt={`Instagram post ${i + 1}`}
                  loading="lazy"
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 text-white/0 transition-all group-hover:bg-black/30 group-hover:text-white/90">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA BANNER                                                  */}
      {/* ============================================================ */}
      <section
        className="py-20 sm:py-24"
        style={{
          background: `linear-gradient(135deg, ${colors.espresso} 0%, ${colors.brown} 100%)`,
        }}
      >
        <motion.div
          variants={blurIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-3xl px-4 text-center sm:px-6"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready for the Perfect Cup?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base" style={{ color: `${colors.lightBrown}` }}>
            Swing by our Stellenbosch cafe or browse our menu. We cannot wait to welcome you.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#menu"
              className="rounded-full px-8 py-3.5 text-sm font-semibold transition-transform hover:scale-105"
              style={{ backgroundColor: colors.accent, color: colors.white }}
            >
              View Menu
            </a>
            <a
              href="#location"
              className="rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Get Directions
            </a>
          </div>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/*  FOOTER                                                      */}
      {/* ============================================================ */}
      <footer
        className="py-12"
        style={{ backgroundColor: colors.espresso }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <a href="#" className="flex items-center gap-2 text-lg font-bold text-white">
                <span className="text-xl">☕</span>
                Bean <span style={{ color: colors.accent }}>&amp;</span> Brew
              </a>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: `${colors.lightBrown}99` }}>
                Artisan coffee, lovingly crafted in Stellenbosch since 2019.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h4>
              <ul className="mt-3 space-y-2">
                {navLinks.map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: `${colors.lightBrown}99` }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Hours</h4>
              <ul className="mt-3 space-y-2 text-sm" style={{ color: `${colors.lightBrown}99` }}>
                {hours.map((h) => (
                  <li key={h.day}>
                    <span className="text-white/80">{h.day}</span>
                    <br />
                    {h.time}
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Follow Us</h4>
              <div className="mt-3 flex gap-3">
                {["Instagram", "Facebook", "TikTok"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white transition-transform hover:scale-110"
                    style={{ backgroundColor: `${colors.brown}` }}
                    title={social}
                  >
                    {social[0]}
                  </a>
                ))}
              </div>
              <p className="mt-4 text-sm" style={{ color: `${colors.lightBrown}99` }}>
                45 Church Street
                <br />
                Stellenbosch, 7600
              </p>
            </div>
          </div>

          <div
            className="mt-10 border-t pt-6 text-center text-xs"
            style={{ borderColor: `${colors.brown}40`, color: `${colors.lightBrown}60` }}
          >
            &copy; {new Date().getFullYear()} Bean &amp; Brew. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
