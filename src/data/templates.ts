export interface Template {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  price: number;
  tier: "starter" | "premium";
  previewUrl: string;
  thumbnailUrl: string;
  features: string[];
  isActive: boolean;
}

export const templates: Template[] = [
  {
    id: "1",
    slug: "auto-detailing",
    name: "Auto Detailing",
    category: "Automotive",
    description: "Sleek, modern template for car detailing and auto care businesses.",
    longDescription:
      "A high-converting website template designed specifically for auto detailing, car wash, and vehicle care businesses. Features a bold hero section, service showcase, before/after gallery, and booking integration.",
    price: 3500,
    tier: "starter",
    previewUrl: "/preview/auto-detailing",
    thumbnailUrl: "/images/templates/auto-detailing.svg",
    features: [
      "Service showcase grid",
      "Before & after gallery",
      "Online booking section",
      "Customer testimonials",
      "Mobile responsive",
      "SEO optimized",
    ],
    isActive: true,
  },
  {
    id: "2",
    slug: "photography",
    name: "Photography Studio",
    category: "Creative",
    description: "Elegant portfolio template for photographers and visual artists.",
    longDescription:
      "A stunning portfolio website template for photographers. Features a full-screen image gallery, portfolio categories, client testimonials, and a contact form with inquiry options.",
    price: 3500,
    tier: "starter",
    previewUrl: "/preview/photography",
    thumbnailUrl: "/images/templates/photography.svg",
    features: [
      "Full-screen image gallery",
      "Portfolio categories",
      "Client testimonials",
      "Inquiry contact form",
      "Mobile responsive",
      "SEO optimized",
    ],
    isActive: true,
  },
  {
    id: "3",
    slug: "coffee-shop",
    name: "Coffee Shop",
    category: "Food & Drink",
    description: "Warm, inviting template for cafes, restaurants, and food businesses.",
    longDescription:
      "A beautifully designed template for coffee shops, cafes, and restaurants. Features a menu display, location map, opening hours, and an about section that tells your story.",
    price: 3500,
    tier: "starter",
    previewUrl: "/preview/coffee-shop",
    thumbnailUrl: "/images/templates/coffee-shop.svg",
    features: [
      "Digital menu display",
      "Location & hours section",
      "About & story section",
      "Photo gallery",
      "Mobile responsive",
      "SEO optimized",
    ],
    isActive: true,
  },
  {
    id: "4",
    slug: "wealth-manager",
    name: "Wealth Manager",
    category: "Professional",
    description: "Trustworthy, professional template for financial advisors and consultants.",
    longDescription:
      "A professional website template designed for financial advisors, wealth managers, and consulting firms. Features service descriptions, team profiles, client testimonials, and a consultation booking section.",
    price: 4500,
    tier: "premium",
    previewUrl: "/preview/wealth-manager",
    thumbnailUrl: "/images/templates/wealth-manager.svg",
    features: [
      "Service descriptions",
      "Team profiles",
      "Client testimonials",
      "Consultation booking",
      "Blog section",
      "Mobile responsive",
      "SEO optimized",
    ],
    isActive: true,
  },
  {
    id: "5",
    slug: "dj-entertainment",
    name: "DJ & Entertainment",
    category: "Creative",
    description: "Bold, energetic template for DJs, musicians, and event entertainers.",
    longDescription:
      "An attention-grabbing website template for DJs, musicians, and event entertainment professionals. Features an events calendar, music player embed, photo/video gallery, and a booking form.",
    price: 3500,
    tier: "starter",
    previewUrl: "/preview/dj-entertainment",
    thumbnailUrl: "/images/templates/dj-entertainment.svg",
    features: [
      "Events calendar",
      "Music/video embeds",
      "Photo gallery",
      "Booking form",
      "Mobile responsive",
      "SEO optimized",
    ],
    isActive: true,
  },
];

export const categories = [
  "All",
  ...Array.from(new Set(templates.map((t) => t.category))),
];
