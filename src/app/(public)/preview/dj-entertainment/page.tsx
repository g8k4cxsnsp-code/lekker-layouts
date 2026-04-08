"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  fadeIn,
  fadeInUp,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
  popIn,
  blurIn,
} from "@/lib/animations";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Events", "Music", "Gallery", "Book Me"] as const;

const STATS = [
  { value: "500+", label: "Events" },
  { value: "8", label: "Years" },
  { value: "50+", label: "Venues" },
];

const EVENTS = [
  {
    date: "March 30",
    day: "SAT",
    title: "Saturday Night Live",
    venue: "Club Havana",
    location: "Umhlanga",
    type: "Club Night",
  },
  {
    date: "April 5",
    day: "SAT",
    title: "Corporate Awards Dinner",
    venue: "Hilton Hotel",
    location: "Durban",
    type: "Corporate",
  },
  {
    date: "April 12",
    day: "SAT",
    title: "Smith & Jones Wedding",
    venue: "The Venue",
    location: "Ballito",
    type: "Wedding",
  },
];

const MIXES = [
  {
    title: "Deep House Sunset",
    genre: "Deep House",
    duration: "58:24",
    bpm: "122 BPM",
  },
  {
    title: "Hip-Hop Heat Vol. 3",
    genre: "Hip-Hop / R&B",
    duration: "1:12:06",
    bpm: "95 BPM",
  },
  {
    title: "Commercial Bangers",
    genre: "Commercial / Dance",
    duration: "45:30",
    bpm: "128 BPM",
  },
];

const PACKAGES = [
  {
    name: "House Party",
    price: "R2,500",
    color: "cyan" as const,
    features: [
      "4 hours of non-stop music",
      "Basic sound setup",
      "Pre-event consultation",
      "Custom playlist curation",
    ],
  },
  {
    name: "Wedding / Corporate",
    price: "R5,500",
    color: "purple" as const,
    popular: true,
    features: [
      "6 hours of entertainment",
      "Full sound & lighting setup",
      "MC services included",
      "Pre-event consultation",
      "Custom playlist curation",
      "Wireless microphone",
    ],
  },
  {
    name: "Festival / Large Event",
    price: "R12,000",
    color: "pink" as const,
    features: [
      "8+ hours of entertainment",
      "Premium sound system",
      "Full lighting & effects rig",
      "MC services included",
      "Backup equipment on-site",
      "2x pre-event consultations",
      "Visual/LED screen setup",
    ],
  },
];

const EVENT_TYPES = [
  "Wedding",
  "Corporate Event",
  "Birthday / House Party",
  "Club Night",
  "Festival",
  "Other",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const neonColor = {
  purple: "#8b5cf6",
  cyan: "#06b6d4",
  pink: "#ec4899",
} as const;

function glowStyle(color: keyof typeof neonColor, intensity = 0.4) {
  const c = neonColor[color];
  return {
    boxShadow: `0 0 20px ${c}${Math.round(intensity * 255)
      .toString(16)
      .padStart(2, "0")}, 0 0 60px ${c}${Math.round(intensity * 0.4 * 255)
      .toString(16)
      .padStart(2, "0")}`,
  };
}

// ─── Components ──────────────────────────────────────────────────────────────

function SectionHeading({
  title,
  subtitle,
  accent = "purple",
}: {
  title: string;
  subtitle?: string;
  accent?: keyof typeof neonColor;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="mb-12 text-center md:mb-16"
    >
      <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl">
        {title}
      </h2>
      <div
        className="mx-auto mb-4 h-1 w-20 rounded-full"
        style={{ background: neonColor[accent] }}
      />
      {subtitle && (
        <p className="mx-auto max-w-xl text-base text-gray-400 md:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DJEntertainmentPreview() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    venue: "",
    additionalInfo: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white antialiased">
      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <motion.nav
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="fixed top-0 right-0 left-0 z-50 border-b border-white/5 bg-[#0d0d0d]/90 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a
            href="#"
            className="text-xl font-black tracking-widest uppercase"
            style={{
              background: `linear-gradient(135deg, ${neonColor.purple}, ${neonColor.cyan})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            DJ NOVA
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="relative rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
                style={{ transition: "color 0.2s, text-shadow 0.3s" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.textShadow = `0 0 12px ${neonColor.purple}80`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.textShadow =
                    "none";
                }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#book-me"
            className="hidden rounded-full px-5 py-2 text-sm font-semibold text-white transition-all hover:scale-105 md:inline-flex"
            style={{
              background: `linear-gradient(135deg, ${neonColor.purple}, ${neonColor.pink})`,
              ...glowStyle("purple", 0.25),
            }}
          >
            Book Now
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`h-0.5 w-6 bg-white transition-all ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-6 bg-white transition-all ${mobileMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-6 bg-white transition-all ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-white/5 bg-[#0d0d0d]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link}
                </a>
              ))}
              <a
                href="#book-me"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 rounded-full px-5 py-3 text-center text-sm font-semibold text-white"
                style={{
                  background: `linear-gradient(135deg, ${neonColor.purple}, ${neonColor.pink})`,
                }}
              >
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1571266028243-d220c6cd1e46?w=1200&q=80"
            alt="DJ performing at turntables"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
          <div className="absolute inset-0 bg-[#0d0d0d]/75" />
        </div>
        {/* Background effects */}
        <div className="absolute inset-0">
          <div
            className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
            style={{ background: neonColor.purple }}
          />
          <div
            className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full opacity-15 blur-[100px]"
            style={{ background: neonColor.cyan }}
          />
          <div
            className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-[80px]"
            style={{ background: neonColor.pink }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={fadeIn}
              className="mb-4 text-sm font-semibold tracking-[0.3em] uppercase md:text-base"
              style={{ color: neonColor.cyan }}
            >
              Durban&apos;s Premier DJ &amp; Entertainment
            </motion.p>
            <motion.h1
              variants={blurIn}
              className="mb-6 text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
            >
              <span className="block">Bringing the</span>
              <span
                className="block"
                style={{
                  background: `linear-gradient(135deg, ${neonColor.purple}, ${neonColor.cyan}, ${neonColor.pink})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "200% 200%",
                  animation: "gradient-shift 6s ease infinite",
                }}
              >
                Energy
              </span>
              <span className="block">to Every Event</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mb-10 max-w-2xl text-base text-gray-400 sm:text-lg md:text-xl"
            >
              Professional DJ services for weddings, corporate events, and clubs
              across Durban and KwaZulu-Natal. Let&apos;s make your event
              unforgettable.
            </motion.p>
            <motion.div
              variants={popIn}
              className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <a
                href="#book-me"
                className="inline-flex rounded-full px-8 py-4 text-base font-bold text-white transition-all hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${neonColor.purple}, ${neonColor.pink})`,
                  ...glowStyle("purple", 0.5),
                }}
              >
                Book Me Now
              </a>
              <a
                href="#music"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-medium text-white transition-all hover:border-white/40 hover:bg-white/5"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                Listen to Mixes
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1.5 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/20 pt-2">
            <div className="h-2 w-1 rounded-full bg-white/60" />
          </div>
        </motion.div>
      </section>

      {/* ── About ──────────────────────────────────────────────────────── */}
      <section id="about" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Image placeholder */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl lg:mx-0"
            >
              <img
                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80"
                alt="DJ equipment and turntables"
                loading="lazy"
                style={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', inset: 0 }}
              />
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${neonColor.purple}30, ${neonColor.cyan}30, ${neonColor.pink}30)`,
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4" style={{ display: 'none' }}>
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${neonColor.purple}, ${neonColor.cyan})`,
                  }}
                >
                  <svg
                    className="h-10 w-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-500">
                  DJ Nova Photo
                </p>
              </div>
              {/* Neon border effect */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                  border: `1px solid ${neonColor.purple}40`,
                  boxShadow: `inset 0 0 30px ${neonColor.purple}10`,
                }}
              />
            </motion.div>

            {/* Bio text */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <p
                className="mb-2 text-sm font-semibold tracking-[0.2em] uppercase"
                style={{ color: neonColor.cyan }}
              >
                About Me
              </p>
              <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                Hey, I&apos;m DJ Nova
              </h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  With over 8 years behind the decks, I&apos;ve turned up the
                  energy at 500+ events across Durban and KwaZulu-Natal. From
                  intimate weddings to packed-out clubs, I bring the perfect vibe
                  every single time.
                </p>
                <p>
                  I specialise in house, hip-hop, and commercial mixes, blending
                  genres to keep every crowd moving. Whether it&apos;s an
                  elegant corporate dinner or a high-energy festival set, I read
                  the room and deliver an unforgettable experience.
                </p>
                <p>
                  Based in Durban, available across KZN and South Africa for
                  your next event.
                </p>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {STATS.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={popIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 text-center"
                  >
                    <p
                      className="text-2xl font-black md:text-3xl"
                      style={{ color: neonColor.purple }}
                    >
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs font-medium tracking-wider text-gray-500 uppercase">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ────────────────────────────────────────────── */}
      <section
        id="events"
        className="relative py-20 md:py-28"
        style={{ background: "#111111" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Upcoming Events"
            subtitle="Catch me live at these upcoming gigs. Click to RSVP or get tickets."
            accent="cyan"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-4"
          >
            {EVENTS.map((event) => (
              <motion.div
                key={event.title}
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all hover:border-cyan-400/30 hover:bg-white/[0.07]"
              >
                <div className="flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center sm:gap-6 md:p-6">
                  {/* Date */}
                  <div
                    className="flex min-w-[80px] flex-col items-center rounded-lg px-4 py-3"
                    style={{ background: `${neonColor.cyan}15` }}
                  >
                    <span
                      className="text-xs font-bold tracking-wider uppercase"
                      style={{ color: neonColor.cyan }}
                    >
                      {event.day}
                    </span>
                    <span className="text-lg font-black text-white">
                      {event.date.split(" ")[1]}
                    </span>
                    <span className="text-xs text-gray-400">
                      {event.date.split(" ")[0]}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">
                      {event.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      {event.venue} &middot; {event.location}
                    </p>
                  </div>

                  {/* Tag + CTA */}
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-gray-400">
                      {event.type}
                    </span>
                    <a
                      href="#"
                      className="rounded-full px-5 py-2 text-sm font-semibold text-white transition-all hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${neonColor.cyan}, ${neonColor.purple})`,
                      }}
                    >
                      RSVP
                    </a>
                  </div>
                </div>

                {/* Hover glow line at bottom */}
                <div
                  className="h-[2px] w-0 transition-all duration-500 group-hover:w-full"
                  style={{
                    background: `linear-gradient(90deg, ${neonColor.cyan}, ${neonColor.purple})`,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Music / Mixes ──────────────────────────────────────────────── */}
      <section id="music" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Latest Mixes"
            subtitle="Stream my latest DJ sets and mixes. Available on SoundCloud and Mixcloud."
            accent="pink"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {MIXES.map((mix) => (
              <motion.div
                key={mix.title}
                variants={scaleIn}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all hover:border-pink-400/30"
              >
                {/* Waveform placeholder */}
                <div
                  className="relative flex h-48 items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${neonColor.pink}10, ${neonColor.purple}10)`,
                  }}
                >
                  {/* Fake waveform bars */}
                  <div className="flex items-end gap-[3px]">
                    {Array.from({ length: 30 }).map((_, i) => {
                      const h =
                        Math.sin(i * 0.4) * 30 + Math.random() * 20 + 15;
                      return (
                        <div
                          key={i}
                          className="w-[3px] rounded-full opacity-40 transition-opacity group-hover:opacity-70"
                          style={{
                            height: `${h}px`,
                            background: `linear-gradient(to top, ${neonColor.pink}, ${neonColor.purple})`,
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* Play button overlay */}
                  <button
                    className="absolute flex h-16 w-16 items-center justify-center rounded-full text-white transition-all hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${neonColor.pink}, ${neonColor.purple})`,
                      ...glowStyle("pink", 0.4),
                    }}
                    aria-label={`Play ${mix.title}`}
                  >
                    <svg
                      className="ml-1 h-7 w-7"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-white">{mix.title}</h3>
                  <div className="mt-2 flex items-center gap-3 text-sm text-gray-400">
                    <span>{mix.genre}</span>
                    <span className="h-1 w-1 rounded-full bg-gray-600" />
                    <span>{mix.duration}</span>
                    <span className="h-1 w-1 rounded-full bg-gray-600" />
                    <span>{mix.bpm}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Gallery ────────────────────────────────────────────────────── */}
      <section
        id="gallery"
        className="relative py-20 md:py-28"
        style={{ background: "#111111" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Gallery"
            subtitle="Highlights from events, gigs, and behind the decks."
            accent="purple"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4"
          >
            {(() => {
              const galleryColors = [
                neonColor.purple,
                neonColor.cyan,
                neonColor.pink,
              ];
              const labels = [
                "Club Night",
                "Wedding Set",
                "Festival Stage",
                "Corporate Event",
                "Behind the Decks",
                "Crowd Energy",
                "Sound Check",
                "VIP Lounge",
              ];
              const galleryPhotos = [
                "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&q=80",
                "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80",
                "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
                "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80",
                "https://images.unsplash.com/photo-1571266028243-d220c6cd1e46?w=600&q=80",
                "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&q=80",
                "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80",
                "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
              ];
              return Array.from({ length: 8 }).map((_, i) => {
                const color = galleryColors[i % 3];
                return (
                  <motion.div
                    key={i}
                    variants={scaleIn}
                    className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl"
                  >
                    <img
                      src={galleryPhotos[i]}
                      alt={labels[i]}
                      loading="lazy"
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />

                    {/* Neon border on hover */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-xl border-2 border-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"
                      style={{
                        borderColor: color,
                        boxShadow: `0 0 20px ${color}30, inset 0 0 20px ${color}10`,
                      }}
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="text-xs font-semibold text-white">
                        {labels[i]}
                      </span>
                    </div>
                  </motion.div>
                );
              });
            })()}
          </motion.div>
        </div>
      </section>

      {/* ── Packages ───────────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Packages"
            subtitle="Transparent pricing for every occasion. Custom packages also available on request."
            accent="cyan"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {PACKAGES.map((pkg) => (
              <motion.div
                key={pkg.name}
                variants={fadeInUp}
                className={`group relative overflow-hidden rounded-2xl border bg-white/5 p-6 transition-all md:p-8 ${
                  pkg.popular
                    ? "border-purple-500/40"
                    : "border-white/10 hover:border-white/20"
                }`}
                style={pkg.popular ? glowStyle("purple", 0.15) : undefined}
              >
                {pkg.popular && (
                  <div
                    className="absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${neonColor.purple}, ${neonColor.pink})`,
                    }}
                  >
                    Most Popular
                  </div>
                )}

                <p
                  className="text-sm font-semibold tracking-wider uppercase"
                  style={{ color: neonColor[pkg.color] }}
                >
                  {pkg.name}
                </p>
                <p className="mt-3 text-4xl font-black text-white">
                  {pkg.price}
                </p>
                <p className="mt-1 text-sm text-gray-500">per event</p>

                <div className="my-6 h-px bg-white/10" />

                <ul className="space-y-3">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-gray-300"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0"
                        fill="none"
                        stroke={neonColor[pkg.color]}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#book-me"
                  className={`mt-8 block w-full rounded-full py-3 text-center text-sm font-bold transition-all hover:scale-[1.02] ${
                    pkg.popular ? "text-white" : "text-white"
                  }`}
                  style={
                    pkg.popular
                      ? {
                          background: `linear-gradient(135deg, ${neonColor.purple}, ${neonColor.pink})`,
                          ...glowStyle("purple", 0.3),
                        }
                      : {
                          background: "rgba(255,255,255,0.1)",
                          border: "1px solid rgba(255,255,255,0.15)",
                        }
                  }
                >
                  Get Started
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Booking Form ───────────────────────────────────────────────── */}
      <section
        id="book-me"
        className="relative py-20 md:py-28"
        style={{ background: "#111111" }}
      >
        {/* Background glow */}
        <div
          className="absolute top-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 opacity-10 blur-[120px]"
          style={{
            background: `linear-gradient(135deg, ${neonColor.purple}, ${neonColor.cyan})`,
          }}
        />

        <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
          <SectionHeading
            title="Book Me"
            subtitle="Ready to make your event legendary? Fill in the details below and I'll get back to you within 24 hours."
            accent="purple"
          />

          <motion.form
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Name + Email */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30"
                />
              </div>
            </div>

            {/* Phone + Event Type */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="073 123 4567"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">
                  Event Type
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  className="w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30"
                >
                  <option value="" className="bg-[#1a1a1a]">
                    Select event type
                  </option>
                  {EVENT_TYPES.map((type) => (
                    <option key={type} value={type} className="bg-[#1a1a1a]">
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Event Date + Venue */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">
                  Event Date
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">
                  Venue
                </label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  placeholder="Venue name & location"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30"
                />
              </div>
            </div>

            {/* Additional Info */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">
                Additional Info
              </label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                rows={4}
                placeholder="Tell me about your event, music preferences, special requests..."
                className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full py-4 text-base font-bold text-white transition-all hover:scale-[1.02]"
              style={{
                background: `linear-gradient(135deg, ${neonColor.purple}, ${neonColor.pink})`,
                ...glowStyle("purple", 0.35),
              }}
            >
              Send Booking Request
            </button>
          </motion.form>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 bg-[#0a0a0a] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
            {/* Logo */}
            <div>
              <a
                href="#"
                className="text-xl font-black tracking-widest uppercase"
                style={{
                  background: `linear-gradient(135deg, ${neonColor.purple}, ${neonColor.cyan})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                DJ NOVA
              </a>
              <p className="mt-2 text-sm text-gray-500">
                Durban&apos;s Premier DJ &amp; Entertainment
              </p>
            </div>

            {/* Contact info */}
            <div className="text-center text-sm text-gray-400 md:text-right">
              <p>
                <a
                  href="mailto:bookings@djnova.co.za"
                  className="transition-colors hover:text-white"
                >
                  bookings@djnova.co.za
                </a>
              </p>
              <p className="mt-1">
                <a
                  href="tel:+27731234567"
                  className="transition-colors hover:text-white"
                >
                  073 123 4567
                </a>
              </p>
              <p className="mt-1">Durban, KwaZulu-Natal</p>
            </div>
          </div>

          {/* Social links */}
          <div className="mt-8 flex items-center justify-center gap-4">
            {/* Instagram */}
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all hover:border-pink-500/40 hover:text-pink-400"
              aria-label="Instagram"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            {/* SoundCloud */}
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all hover:border-orange-500/40 hover:text-orange-400"
              aria-label="SoundCloud"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.057-.049-.1-.099-.1zm-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.308c.013.06.045.094.104.094.057 0 .09-.037.104-.094l.194-1.308-.194-1.332c-.014-.057-.047-.094-.104-.094zm1.79-1.065c-.067 0-.12.048-.12.115l-.217 2.376.217 2.283c0 .067.053.119.12.119.065 0 .118-.052.118-.119l.241-2.283-.241-2.376c0-.067-.053-.115-.118-.115zm.824-.558c-.076 0-.14.059-.14.135l-.193 2.467.193 2.355c0 .074.063.131.14.131.074 0 .137-.057.137-.131l.218-2.355-.218-2.467c-.003-.076-.063-.135-.137-.135zm.826-.369c-.082 0-.149.065-.149.149l-.17 2.469.17 2.39c0 .082.067.149.149.149.08 0 .146-.067.146-.149l.19-2.39-.19-2.469c0-.084-.066-.149-.146-.149zm.83-.198c-.09 0-.163.075-.163.163l-.147 2.5.147 2.41c0 .089.073.163.163.163.088 0 .161-.074.161-.163l.164-2.41-.164-2.5c-.002-.088-.073-.163-.161-.163zm.834-.111c-.098 0-.176.08-.176.176l-.124 2.445.124 2.403c0 .097.078.174.176.174.096 0 .172-.077.172-.174l.14-2.403-.14-2.445c0-.098-.076-.176-.172-.176zm1.67-.348c-.105 0-.189.089-.189.189l-.103 2.628.103 2.39c0 .105.084.189.189.189.103 0 .187-.084.187-.189l.116-2.39-.116-2.628c-.002-.1-.084-.189-.187-.189zm.833-.146c-.112 0-.2.09-.2.2l-.093 2.603.093 2.375c0 .112.088.2.2.2.11 0 .197-.088.197-.2l.104-2.375-.104-2.603c0-.11-.087-.2-.197-.2zm.84-.071c-.12 0-.213.096-.213.213l-.074 2.503.074 2.354c0 .12.093.213.213.213.117 0 .21-.093.21-.213l.084-2.354-.084-2.503c-.003-.117-.093-.213-.21-.213zm.854.015c-.126 0-.225.103-.225.227l-.056 2.315.056 2.333c0 .126.099.227.225.227.124 0 .222-.101.222-.227l.062-2.333-.062-2.315c0-.124-.098-.227-.222-.227zm.823-.149c-.135 0-.241.11-.241.243l-.041 2.355.041 2.311c0 .133.106.24.241.24.131 0 .235-.107.235-.24l.046-2.311-.046-2.355c0-.133-.104-.243-.235-.243zm.838-.099c-.143 0-.254.114-.254.254l-.038 2.386.038 2.285c0 .14.111.252.254.252.14 0 .251-.112.251-.252l.041-2.285-.041-2.386c0-.14-.111-.254-.251-.254zm1.693-.254c-.148 0-.268.12-.268.268l-.023 2.395.023 2.255c0 .148.12.268.268.268.146 0 .265-.12.265-.268l.025-2.255-.025-2.395c0-.148-.119-.268-.265-.268zm.847.014c-.153 0-.275.122-.275.275l-.013 2.145.013 2.232c0 .153.122.275.275.275.15 0 .271-.122.271-.275l.016-2.232-.016-2.145c0-.153-.121-.275-.271-.275zM20.45 8.39c-.42 0-.814.1-1.164.278-.24-2.723-2.536-4.852-5.341-4.852-1.258 0-2.442.454-3.37 1.262-.182.156-.229.325-.229.49v9.266c0 .175.14.325.314.342h9.79c1.96 0 3.55-1.59 3.55-3.55s-1.59-3.549-3.55-3.549v.313z" />
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all hover:border-red-500/40 hover:text-red-400"
              aria-label="YouTube"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>

          {/* Bottom */}
          <div className="mt-8 border-t border-white/5 pt-8 text-center">
            <p className="text-xs text-gray-600">
              &copy; {new Date().getFullYear()} DJ Nova. All rights reserved.
              Website by{" "}
              <span style={{ color: neonColor.purple }}>Lekker Layouts</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
