export const SITE_CONFIG = {
  name: "Lekker Layouts",
  url: "https://lekkerlayouts.co.za",
  description:
    "Professional, hand-coded website templates built with modern technology. Proudly South African.",
  whatsappNumber: "27725976626",
  whatsappMessage: "Hi! I'd like to learn more about Lekker Layouts.",
  email: "hello@lekkerlayouts.co.za",
  n8nWebhookBase: "https://broadcasting-custom-acdbentity-instruction.trycloudflare.com/webhook", // Temporary quick tunnel — replace with https://n8n.lekkerlayouts.co.za/webhook once domain is on Cloudflare
  social: {
    instagram: "https://instagram.com/lekkerlayouts",
    facebook: "https://facebook.com/lekkerlayouts",
    linkedin: "https://linkedin.com/company/lekkerlayouts",
  },
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Templates", href: "/templates" },
  { label: "Products", href: "/products" },
  { label: "Pricing", href: "/pricing" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  templates: [
    { label: "Browse Templates", href: "/templates" },
    { label: "Digital Products", href: "/products" },
    { label: "Pricing", href: "/pricing" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "FAQ", href: "/faq" },
  ],
} as const;
