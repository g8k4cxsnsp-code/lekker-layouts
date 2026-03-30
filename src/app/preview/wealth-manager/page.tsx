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
} from "@/lib/animations";

/* ──────────────────────────────────────────────
   COLOR TOKENS
   ────────────────────────────────────────────── */
const navy = {
  900: "#0a1628",
  800: "#0f2035",
  700: "#1e3a5f",
  600: "#2a4f7a",
  500: "#3b6599",
};
const gold = {
  500: "#c5a55a",
  600: "#b8942e",
  400: "#d4ba78",
  300: "#e0cd9a",
};

/* ──────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────── */
const navLinks = ["Services", "About", "Team", "Insights", "Contact"];

const services = [
  {
    title: "Investment Management",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
    description:
      "Bespoke portfolio strategies tailored to your risk profile and long-term objectives, managed by our experienced investment team.",
  },
  {
    title: "Retirement Planning",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
    description:
      "Comprehensive retirement strategies ensuring financial security and the lifestyle you envision for your golden years.",
  },
  {
    title: "Estate Planning",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5M10.5 21V8.25a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75V21M4.5 9.75h3.75m-3.75 3h3.75m-3.75 3h3.75M3 21h18M3 3h7.5" />
      </svg>
    ),
    description:
      "Protect and transfer your wealth efficiently with estate plans that safeguard your legacy for future generations.",
  },
  {
    title: "Tax Advisory",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008ZM19.5 13.5h-4.5m4.5 0v-1.5a2.25 2.25 0 0 0-2.25-2.25h-1.5a2.25 2.25 0 0 0-2.25 2.25V18" />
      </svg>
    ),
    description:
      "Strategic tax planning to minimise your liability and maximise after-tax returns within the South African regulatory framework.",
  },
];

const stats = [
  { value: "R2.5B+", label: "Assets Managed" },
  { value: "500+", label: "Clients Served" },
  { value: "15+", label: "Years Experience" },
  { value: "98%", label: "Client Retention" },
];

const team = [
  {
    name: "David van der Merwe",
    title: "Chief Executive Officer",
    initials: "DM",
    bio: "With over 20 years in financial services, David founded Meridian Wealth with a vision to provide personalised, transparent wealth management to discerning South African investors.",
    color: navy[700],
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  },
  {
    name: "Sarah Naidoo",
    title: "Senior Financial Advisor",
    initials: "SN",
    bio: "A CFP professional with a decade of experience, Sarah specialises in holistic financial planning, helping clients navigate complex financial decisions with clarity and confidence.",
    color: navy[800],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    name: "Michael Botha",
    title: "Portfolio Manager",
    initials: "MB",
    bio: "Michael brings 12 years of equity research and portfolio management expertise, with a proven track record in constructing diversified portfolios that deliver consistent results.",
    color: navy[600],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
];

const testimonials = [
  {
    quote:
      "Meridian Wealth transformed the way we think about our financial future. Their disciplined approach and transparent communication give us complete peace of mind.",
    name: "Johan & Liesel Pretorius",
    title: "Business Owners, Pretoria",
  },
  {
    quote:
      "The team at Meridian took the time to truly understand our goals. Their retirement strategy has put us years ahead of where we thought we would be.",
    name: "Dr. Priya Chetty",
    title: "Specialist Physician, Johannesburg",
  },
  {
    quote:
      "Professional, knowledgeable, and genuinely invested in our success. Switching to Meridian was the best financial decision we have made.",
    name: "Andrew & Nomsa Khumalo",
    title: "Executives, Sandton",
  },
];

const articles = [
  {
    category: "Market Analysis",
    title: "Understanding Market Volatility: A Long-Term Perspective",
    excerpt:
      "Why short-term fluctuations should not derail your investment strategy, and how disciplined investors come out ahead.",
    date: "15 March 2026",
  },
  {
    category: "Retirement",
    title: "5 Retirement Planning Mistakes South Africans Make",
    excerpt:
      "Common pitfalls that can cost you millions over your lifetime, and the simple adjustments to avoid them.",
    date: "8 March 2026",
  },
  {
    category: "Tax Strategy",
    title: "Tax-Efficient Investing in South Africa",
    excerpt:
      "Maximise your after-tax returns with practical strategies for TFSAs, retirement annuities, and offshore allowances.",
    date: "1 March 2026",
  },
];

const investmentRanges = [
  "Select range",
  "Under R500,000",
  "R500,000 – R1,000,000",
  "R1,000,000 – R5,000,000",
  "R5,000,000 – R10,000,000",
  "R10,000,000+",
];

/* ──────────────────────────────────────────────
   PAGE COMPONENT
   ────────────────────────────────────────────── */
export default function WealthManagerPreview() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', system-ui, sans-serif", color: navy[900] }}>
      {/* ───── NAVIGATION ───── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ backgroundColor: "rgba(10, 22, 40, 0.95)", backdropFilter: "blur(12px)", borderColor: "rgba(197, 165, 90, 0.15)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 no-underline">
              <div
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-sm flex items-center justify-center text-xs font-bold tracking-wider"
                style={{ backgroundColor: gold[500], color: navy[900] }}
              >
                MW
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm sm:text-base font-semibold tracking-wide text-white">
                  MERIDIAN
                </span>
                <span className="text-[10px] sm:text-xs tracking-[0.25em] font-light" style={{ color: gold[500] }}>
                  WEALTH
                </span>
              </div>
            </a>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm font-light tracking-wide no-underline transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = gold[500])}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                >
                  {link}
                </a>
              ))}
              <a
                href="#contact"
                className="ml-2 px-5 py-2.5 text-sm font-medium rounded no-underline transition-all duration-200"
                style={{ backgroundColor: gold[500], color: navy[900] }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = gold[400])}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = gold[500])}
              >
                Book Consultation
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2"
              style={{ color: "white" }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t"
            style={{ backgroundColor: navy[900], borderColor: "rgba(197,165,90,0.15)" }}
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-sm font-light tracking-wide no-underline py-2"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
              <a
                href="#contact"
                className="block text-center mt-3 px-5 py-2.5 text-sm font-medium rounded no-underline"
                style={{ backgroundColor: gold[500], color: navy[900] }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Consultation
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* ───── HERO ───── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Hero background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
            alt="Financial district skyscrapers"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${navy[900]}e6 0%, ${navy[800]}dd 40%, ${navy[700]}cc 100%)` }} />
        </div>
        {/* Subtle decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full opacity-[0.03]"
            style={{ background: `radial-gradient(circle, ${gold[500]} 0%, transparent 70%)` }}
          />
          <div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.03]"
            style={{ background: `radial-gradient(circle, ${gold[500]} 0%, transparent 70%)` }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeIn}>
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase mb-6"
                  style={{ backgroundColor: "rgba(197,165,90,0.12)", color: gold[400], border: `1px solid rgba(197,165,90,0.2)` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: gold[500] }} />
                  Trusted Financial Advisory
                </div>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-white"
              >
                Building Wealth,
                <br />
                <span className="font-semibold" style={{ color: gold[500] }}>
                  Securing Futures
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-xl"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                For over 15 years, Meridian Wealth has provided sophisticated financial advisory
                and investment management to individuals and families across Sandton and greater
                Johannesburg. Your ambitions deserve a partner that listens.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#contact"
                  className="px-7 py-3.5 text-sm font-medium rounded no-underline transition-all duration-200"
                  style={{ backgroundColor: gold[500], color: navy[900] }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = gold[400])}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = gold[500])}
                >
                  Book a Consultation
                </a>
                <a
                  href="#services"
                  className="px-7 py-3.5 text-sm font-medium rounded no-underline transition-all duration-200"
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = gold[500];
                    e.currentTarget.style.color = gold[500];
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                  }}
                >
                  Our Services
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom gold line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${gold[500]}40, transparent)` }}
        />
      </section>

      {/* ───── SERVICES ───── */}
      <section id="services" className="py-20 sm:py-28" style={{ backgroundColor: "#fafafa" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeIn}
              className="text-xs font-medium tracking-[0.2em] uppercase mb-3"
              style={{ color: gold[600] }}
            >
              What We Offer
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-light mb-4" style={{ color: navy[900] }}>
              Our <span className="font-semibold">Services</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-base" style={{ color: "#64748b" }}>
              We deliver comprehensive wealth management solutions, crafted to protect and grow
              your assets across every stage of life.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                className="group p-8 rounded-lg border transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: "white",
                  borderColor: "#e2e8f0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = gold[500];
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${navy[700]}0d`, color: navy[700] }}
                >
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: navy[900] }}>
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#64748b" }}>
                  {service.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm font-medium no-underline transition-colors duration-200"
                  style={{ color: gold[600] }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = gold[500])}
                  onMouseLeave={(e) => (e.currentTarget.style.color = gold[600])}
                >
                  Learn More
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───── STATS BAR ───── */}
      <section style={{ background: `linear-gradient(135deg, ${navy[900]}, ${navy[700]})` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={scaleIn} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold mb-1" style={{ color: gold[500] }}>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-light tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───── ABOUT / TRUST ───── */}
      <section id="about" className="py-20 sm:py-28" style={{ backgroundColor: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideInLeft}
            >
              <p
                className="text-xs font-medium tracking-[0.2em] uppercase mb-3"
                style={{ color: gold[600] }}
              >
                Our Story
              </p>
              <h2 className="text-3xl sm:text-4xl font-light mb-6" style={{ color: navy[900] }}>
                A Legacy of <span className="font-semibold">Trust & Excellence</span>
              </h2>
              <div className="space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: "#475569" }}>
                <p>
                  Founded in 2010, Meridian Wealth was established with a single purpose: to provide
                  discerning South African investors with the calibre of financial advice they deserve
                  &mdash; transparent, disciplined, and deeply personal.
                </p>
                <p>
                  Headquartered in Sandton, we serve individuals, families, and business owners who
                  seek more than just returns. Our clients want a trusted partner who understands their
                  ambitions, navigates complexity on their behalf, and holds their interests above all
                  else.
                </p>
                <p>
                  Every strategy we craft is underpinned by rigorous research, institutional-grade tools,
                  and an unwavering commitment to fiduciary responsibility. We measure our success not
                  in assets under management, but in the financial confidence our clients carry.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideInRight}
              className="relative"
            >
              <div
                className="aspect-[4/3] rounded-lg overflow-hidden relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80"
                  alt="Professional office meeting"
                  loading="lazy"
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
                {/* Decorative corner lines */}
                <div className="absolute top-6 left-6 w-12 h-12" style={{ borderTop: `1px solid ${gold[500]}40`, borderLeft: `1px solid ${gold[500]}40` }} />
                <div className="absolute bottom-6 right-6 w-12 h-12" style={{ borderBottom: `1px solid ${gold[500]}40`, borderRight: `1px solid ${gold[500]}40` }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───── TEAM ───── */}
      <section id="team" className="py-20 sm:py-28" style={{ backgroundColor: "#fafafa" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeIn} className="text-xs font-medium tracking-[0.2em] uppercase mb-3" style={{ color: gold[600] }}>
              Leadership
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-light mb-4" style={{ color: navy[900] }}>
              Meet Our <span className="font-semibold">Team</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-base" style={{ color: "#64748b" }}>
              Our seasoned professionals bring decades of combined experience in financial planning,
              investment management, and advisory services.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeInUp}
                className="bg-white rounded-lg border p-8 text-center transition-all duration-300 hover:shadow-lg"
                style={{ borderColor: "#e2e8f0" }}
              >
                <div
                  className="w-24 h-24 rounded-full mx-auto mb-5 overflow-hidden"
                  style={{ backgroundColor: member.color }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1" style={{ color: navy[900] }}>
                  {member.name}
                </h3>
                <p className="text-sm font-medium mb-4" style={{ color: gold[600] }}>
                  {member.title}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───── TESTIMONIALS ───── */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeIn} className="text-xs font-medium tracking-[0.2em] uppercase mb-3" style={{ color: gold[600] }}>
              Testimonials
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-light mb-4" style={{ color: navy[900] }}>
              What Our <span className="font-semibold">Clients Say</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeInUp}
                className="p-8 rounded-lg border relative"
                style={{ backgroundColor: "#fafafa", borderColor: "#e2e8f0" }}
              >
                {/* Quote mark */}
                <div className="text-5xl font-serif leading-none mb-4 opacity-20" style={{ color: gold[500] }}>
                  &ldquo;
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "#475569" }}>
                  {t.quote}
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                    style={{ backgroundColor: navy[700] }}
                  >
                    {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: navy[900] }}>
                      {t.name}
                    </p>
                    <p className="text-xs" style={{ color: "#94a3b8" }}>
                      {t.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───── INSIGHTS / BLOG ───── */}
      <section id="insights" className="py-20 sm:py-28" style={{ backgroundColor: "#fafafa" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeIn} className="text-xs font-medium tracking-[0.2em] uppercase mb-3" style={{ color: gold[600] }}>
              Insights
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-light mb-4" style={{ color: navy[900] }}>
              Latest <span className="font-semibold">Insights</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-base" style={{ color: "#64748b" }}>
              Stay informed with expert perspectives on markets, planning strategies, and regulatory developments.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {articles.map((article) => (
              <motion.a
                key={article.title}
                href="#"
                variants={fadeInUp}
                className="group bg-white rounded-lg border overflow-hidden no-underline transition-all duration-300 hover:shadow-lg"
                style={{ borderColor: "#e2e8f0" }}
              >
                {/* Article header bar */}
                <div
                  className="h-48 flex items-end p-6"
                  style={{ background: `linear-gradient(135deg, ${navy[900]}, ${navy[700]})` }}
                >
                  <div>
                    <span
                      className="inline-block px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase rounded mb-3"
                      style={{ backgroundColor: `${gold[500]}20`, color: gold[400] }}
                    >
                      {article.category}
                    </span>
                    <h3 className="text-lg font-semibold text-white leading-snug">{article.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#64748b" }}>
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: "#94a3b8" }}>
                      {article.date}
                    </span>
                    <span
                      className="text-sm font-medium transition-colors duration-200"
                      style={{ color: gold[600] }}
                    >
                      Read More &rarr;
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───── CONTACT / CONSULTATION CTA ───── */}
      <section id="contact" className="py-20 sm:py-28" style={{ backgroundColor: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideInLeft}
            >
              <p className="text-xs font-medium tracking-[0.2em] uppercase mb-3" style={{ color: gold[600] }}>
                Get Started
              </p>
              <h2 className="text-3xl sm:text-4xl font-light mb-6" style={{ color: navy[900] }}>
                Schedule a <span className="font-semibold">Free Consultation</span>
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#64748b" }}>
                Take the first step towards financial clarity. Our initial consultation is
                complimentary and entirely obligation-free. We will listen to your goals, assess
                your current position, and outline how Meridian Wealth can help you achieve more.
              </p>

              <div className="space-y-5">
                {[
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                    ),
                    label: "Meridian House, 5th Floor, Sandton City, Johannesburg",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                      </svg>
                    ),
                    label: "+27 (0) 11 784 5500",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                    ),
                    label: "advisory@meridianwealth.co.za",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${navy[700]}0d`, color: navy[700] }}
                    >
                      {item.icon}
                    </div>
                    <span className="text-sm pt-2.5" style={{ color: "#475569" }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideInRight}
            >
              <form
                className="p-8 rounded-lg border"
                style={{ backgroundColor: "#fafafa", borderColor: "#e2e8f0" }}
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: navy[900] }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Johan Pretorius"
                      className="w-full px-4 py-2.5 rounded border text-sm outline-none transition-colors duration-200"
                      style={{
                        borderColor: "#e2e8f0",
                        backgroundColor: "white",
                        color: navy[900],
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = gold[500])}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: navy[900] }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="johan@example.com"
                      className="w-full px-4 py-2.5 rounded border text-sm outline-none transition-colors duration-200"
                      style={{
                        borderColor: "#e2e8f0",
                        backgroundColor: "white",
                        color: navy[900],
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = gold[500])}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: navy[900] }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+27 (0) 82 000 0000"
                      className="w-full px-4 py-2.5 rounded border text-sm outline-none transition-colors duration-200"
                      style={{
                        borderColor: "#e2e8f0",
                        backgroundColor: "white",
                        color: navy[900],
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = gold[500])}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
                    />
                  </div>

                  {/* Investment Range */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: navy[900] }}>
                      Investment Range
                    </label>
                    <select
                      className="w-full px-4 py-2.5 rounded border text-sm outline-none transition-colors duration-200 appearance-none bg-white"
                      style={{
                        borderColor: "#e2e8f0",
                        color: navy[900],
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m19 9-7 7-7-7'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 12px center",
                        backgroundSize: "16px",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = gold[500])}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
                    >
                      {investmentRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: navy[900] }}>
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your financial goals..."
                      className="w-full px-4 py-2.5 rounded border text-sm outline-none transition-colors duration-200 resize-none"
                      style={{
                        borderColor: "#e2e8f0",
                        backgroundColor: "white",
                        color: navy[900],
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = gold[500])}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 text-sm font-medium rounded border-none cursor-pointer transition-all duration-200"
                    style={{ backgroundColor: gold[500], color: navy[900] }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = gold[400])}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = gold[500])}
                  >
                    Request Consultation
                  </button>

                  <p className="text-xs text-center" style={{ color: "#94a3b8" }}>
                    Your information is kept strictly confidential in accordance with POPIA.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer style={{ backgroundColor: navy[900] }}>
        {/* Top border accent */}
        <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${gold[500]}50, transparent)` }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-8 h-8 rounded-sm flex items-center justify-center text-xs font-bold tracking-wider"
                  style={{ backgroundColor: gold[500], color: navy[900] }}
                >
                  MW
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-sm font-semibold tracking-wide text-white">MERIDIAN</span>
                  <span className="text-[10px] tracking-[0.25em] font-light" style={{ color: gold[500] }}>WEALTH</span>
                </div>
              </div>
              <p className="text-xs leading-relaxed mt-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                Sophisticated wealth management and financial advisory services for discerning
                South African investors.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-medium tracking-wider uppercase mb-4" style={{ color: gold[500] }}>
                Quick Links
              </h4>
              <div className="space-y-2.5">
                {navLinks.map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="block text-sm no-underline transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = gold[400])}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xs font-medium tracking-wider uppercase mb-4" style={{ color: gold[500] }}>
                Services
              </h4>
              <div className="space-y-2.5">
                {services.map((s) => (
                  <a
                    key={s.title}
                    href="#services"
                    className="block text-sm no-underline transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = gold[400])}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  >
                    {s.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-medium tracking-wider uppercase mb-4" style={{ color: gold[500] }}>
                Contact
              </h4>
              <div className="space-y-2.5 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                <p>Meridian House, 5th Floor</p>
                <p>Sandton City, Johannesburg</p>
                <p>+27 (0) 11 784 5500</p>
                <p>advisory@meridianwealth.co.za</p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              &copy; {new Date().getFullYear()} Meridian Wealth Management (Pty) Ltd. All rights reserved.
            </p>
            <p className="text-xs text-center sm:text-right" style={{ color: "rgba(255,255,255,0.3)" }}>
              FSP Licence No. 12345 &middot; Authorised Financial Services Provider &middot; Member of the FPI
            </p>
          </div>
          <div className="mt-4 text-center sm:text-left">
            <p className="text-[10px] leading-relaxed" style={{ color: "rgba(255,255,255,0.2)" }}>
              Meridian Wealth Management (Pty) Ltd is an authorised financial services provider (FSP 12345)
              regulated by the Financial Sector Conduct Authority (FSCA). Past performance is not indicative of
              future results. Investments involve risk, including possible loss of capital.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
