export const SITE_CONFIG = {
  name: "Lekker Layouts",
  url: "https://lekkerlayouts.co.za",
  description:
    "The networking hub for South African small business owners. Connect, grow, and get discovered.",
  whatsappNumber: "27725976626",
  whatsappMessage: "Hi! I'd like to learn more about Lekker Layouts.",
  email: "info@lekkerlayouts.co.za",
  social: {
    instagram: "https://instagram.com/lekkerlayouts",
    facebook: "https://facebook.com/lekkerlayouts",
    linkedin: "https://linkedin.com/company/lekkerlayouts",
  },
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Templates", href: "/templates" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const APP_NAV_LINKS = [
  { label: "Feed", href: "/feed", icon: "Newspaper" },
  { label: "Discover", href: "/discover", icon: "Search" },
  { label: "Messages", href: "/messages", icon: "MessageCircle" },
  { label: "Products", href: "/products", icon: "ShoppingBag" },
  { label: "Premium", href: "/premium", icon: "Crown" },
] as const;

export const FOOTER_LINKS = {
  platform: [
    { label: "Join Free", href: "/register" },
    { label: "Log In", href: "/login" },
    { label: "Digital Products", href: "/products" },
    { label: "Browse Templates", href: "/templates" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "FAQ", href: "/faq" },
  ],
} as const;
