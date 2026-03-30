// ─── Types ───────────────────────────────────────────────────────

export type QuestionFieldType = "text" | "textarea" | "select" | "multi-select" | "url";

export interface QuestionField {
  id: string;
  label: string;
  type: QuestionFieldType;
  placeholder?: string;
  required: boolean;
  options?: string[];
  helpText?: string;
  maxLength?: number;
}

export interface QuestionnaireSection {
  title: string;
  description?: string;
  fields: QuestionField[];
}

export interface Deliverable {
  title: string;
  description: string;
  icon: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  thumbnailUrl: string;
  deliverables: Deliverable[];
  questionnaire: QuestionnaireSection[];
  estimatedDelivery: string;
  isBundle: boolean;
  bundledProductSlugs?: string[];
  webhookId: string;
  isActive: boolean;
}

// ─── Shared Questionnaire Fields ─────────────────────────────────

const businessFields: QuestionField[] = [
  {
    id: "business_name",
    label: "What's your business name?",
    type: "text",
    placeholder: "e.g., Cape Town Coffee Co.",
    required: true,
  },
  {
    id: "industry",
    label: "What industry are you in?",
    type: "select",
    required: true,
    options: [
      "Restaurant / Cafe",
      "Beauty / Wellness",
      "Fitness / Sports",
      "Professional Services",
      "Trades / Construction",
      "Tech / Digital",
      "Creative / Photography",
      "Retail / eCommerce",
      "Health / Medical",
      "Other",
    ],
  },
  {
    id: "industry_other",
    label: "Please specify your industry",
    type: "text",
    placeholder: "e.g., Pet grooming",
    required: false,
    helpText: "Only fill this in if you selected 'Other' above.",
  },
  {
    id: "business_description",
    label: "Describe what your business does (2-3 sentences)",
    type: "textarea",
    placeholder: "e.g., We're a family-owned coffee shop in Stellenbosch that serves specialty single-origin coffee and homemade pastries.",
    required: true,
    maxLength: 500,
  },
  {
    id: "target_audience",
    label: "Who is your ideal customer?",
    type: "textarea",
    placeholder: "e.g., Young professionals in Cape Town aged 25-35 who value quality and convenience",
    required: true,
    maxLength: 300,
  },
  {
    id: "location",
    label: "Where are you based?",
    type: "text",
    placeholder: "e.g., Cape Town, Johannesburg, Online only",
    required: true,
  },
];

const aboutYourBusinessSection: QuestionnaireSection = {
  title: "About Your Business",
  description: "Help us understand your business so we can tailor everything to you.",
  fields: businessFields,
};

// ─── Website Blueprint Fields ────────────────────────────────────

const websiteGoalsSection: QuestionnaireSection = {
  title: "Website Goals",
  description: "Tell us what you want your website to achieve.",
  fields: [
    {
      id: "website_goal",
      label: "What's the primary goal of your website?",
      type: "select",
      required: true,
      options: [
        "Get enquiries and leads",
        "Sell products online",
        "Showcase my portfolio",
        "Provide information about my services",
        "Book appointments or consultations",
      ],
    },
    {
      id: "existing_website",
      label: "Do you have an existing website?",
      type: "select",
      required: true,
      options: ["Yes", "No", "Yes, but it needs a complete redo"],
    },
    {
      id: "existing_url",
      label: "Current website URL (if applicable)",
      type: "url",
      placeholder: "https://www.example.co.za",
      required: false,
    },
    {
      id: "pages_needed",
      label: "Which pages do you need?",
      type: "multi-select",
      required: true,
      options: [
        "Home",
        "About",
        "Services",
        "Contact",
        "Portfolio / Gallery",
        "Blog",
        "Pricing",
        "Testimonials",
        "FAQ",
        "Shop",
      ],
      helpText: "Select all that apply.",
    },
    {
      id: "competitor_urls",
      label: "Any websites you admire? (up to 3 URLs)",
      type: "textarea",
      placeholder: "Paste URLs here, one per line",
      required: false,
      helpText: "These help us understand the style and feel you're going for.",
    },
  ],
};

const brandPreferencesSection: QuestionnaireSection = {
  title: "Brand Preferences",
  description: "Tell us about your brand style so we can match it perfectly.",
  fields: [
    {
      id: "brand_personality",
      label: "How should your brand feel? (pick up to 3)",
      type: "multi-select",
      required: true,
      options: [
        "Professional",
        "Friendly",
        "Bold",
        "Elegant",
        "Playful",
        "Minimalist",
        "Luxurious",
        "Trustworthy",
        "Energetic",
        "Warm",
      ],
      helpText: "Choose up to 3 that best describe your brand.",
    },
    {
      id: "color_preference",
      label: "Any color preferences?",
      type: "textarea",
      placeholder: "e.g., I love navy blue and gold, or I want something earthy and natural",
      required: false,
    },
    {
      id: "has_logo",
      label: "Do you have a logo?",
      type: "select",
      required: true,
      options: [
        "Yes, I have a professional logo",
        "Yes, but it needs updating",
        "No, I need one",
      ],
    },
  ],
};

// ─── Social Media Fields ─────────────────────────────────────────

const socialMediaSection: QuestionnaireSection = {
  title: "Social Media Details",
  description: "Help us create content that works for your platforms and audience.",
  fields: [
    {
      id: "platforms",
      label: "Which platforms do you use?",
      type: "multi-select",
      required: true,
      options: ["Instagram", "Facebook", "TikTok", "LinkedIn", "X (Twitter)"],
      helpText: "Select all that apply.",
    },
    {
      id: "current_followers",
      label: "Approximate follower count (across all platforms)",
      type: "select",
      required: true,
      options: [
        "Just starting (0-100)",
        "Growing (100-1,000)",
        "Established (1,000-10,000)",
        "Large (10,000+)",
      ],
    },
    {
      id: "posting_frequency",
      label: "How often do you currently post?",
      type: "select",
      required: true,
      options: [
        "Rarely or never",
        "A few times a month",
        "A few times a week",
        "Daily",
      ],
    },
    {
      id: "content_struggles",
      label: "What do you struggle with most?",
      type: "multi-select",
      required: true,
      options: [
        "Coming up with ideas",
        "Writing captions",
        "Knowing what to post",
        "Being consistent",
        "Growing followers",
        "Getting engagement",
      ],
      helpText: "Select all that apply.",
    },
    {
      id: "brand_voice_social",
      label: "How would you describe your brand voice?",
      type: "select",
      required: true,
      options: [
        "Professional & Polished",
        "Friendly & Casual",
        "Bold & Direct",
        "Warm & Inspiring",
        "Funny & Relatable",
      ],
    },
    {
      id: "services_products_social",
      label: "List your main services or products (up to 5)",
      type: "textarea",
      placeholder: "e.g., 1. Haircuts & styling\n2. Beard grooming\n3. Hot towel shaves",
      required: true,
      maxLength: 500,
    },
  ],
};

// ─── Website Copy Fields ─────────────────────────────────────────

const copyBusinessSection: QuestionnaireSection = {
  title: "Business Details",
  description: "We need to know your business inside out to write copy that converts.",
  fields: [
    {
      id: "unique_selling_point",
      label: "What makes you different from competitors?",
      type: "textarea",
      placeholder: "e.g., We're the only mobile detailing service in Sandton that uses eco-friendly products",
      required: true,
      maxLength: 400,
    },
    {
      id: "services_products_copy",
      label: "List your main services or products",
      type: "textarea",
      placeholder: "e.g., Full interior detail, exterior polish, ceramic coating, paint correction",
      required: true,
      maxLength: 500,
    },
    {
      id: "years_experience",
      label: "How long have you been in business?",
      type: "select",
      required: true,
      options: [
        "Not yet launched",
        "Less than 1 year",
        "1-3 years",
        "3-5 years",
        "5-10 years",
        "10+ years",
      ],
    },
    {
      id: "brand_voice_copy",
      label: "How should the copy sound?",
      type: "select",
      required: true,
      options: [
        "Professional & Authoritative",
        "Warm & Friendly",
        "Bold & Confident",
        "Casual & Conversational",
        "Luxurious & Premium",
      ],
    },
    {
      id: "call_to_action",
      label: "What should visitors do after reading?",
      type: "select",
      required: true,
      options: [
        "Call or WhatsApp us",
        "Fill in a contact form",
        "Book an appointment",
        "Buy a product",
        "Request a quote",
      ],
    },
  ],
};

const copyPagesSection: QuestionnaireSection = {
  title: "Pages to Write",
  description: "Tell us which pages you need and any existing content.",
  fields: [
    {
      id: "pages_to_write",
      label: "Which 5 pages do you need copy for?",
      type: "multi-select",
      required: true,
      options: [
        "Home",
        "About",
        "Services",
        "Contact",
        "FAQ",
        "Pricing",
        "Portfolio",
        "Testimonials",
      ],
      helpText: "Select up to 5 pages.",
    },
    {
      id: "existing_content",
      label: "Any existing copy or key phrases you want to keep?",
      type: "textarea",
      placeholder: "e.g., Our tagline is 'Quality you can trust' and we always mention our 10-year guarantee",
      required: false,
      maxLength: 500,
    },
    {
      id: "competitor_urls_copy",
      label: "Competitor websites we should look at",
      type: "textarea",
      placeholder: "Paste URLs here, one per line",
      required: false,
      helpText: "Helps us understand your market and differentiate your copy.",
    },
  ],
};

// ─── Products ────────────────────────────────────────────────────

export const products: Product[] = [
  {
    id: "p1",
    slug: "website-blueprint",
    name: "Website Blueprint",
    tagline: "Your personalised website plan, ready to build",
    category: "Website",
    description:
      "Get a complete, personalised website plan tailored to your business — including page structure, homepage copy draft, colour palette, font pairing, and SEO keywords. Everything you need before building your site.",
    price: 249,
    thumbnailUrl: "/images/products/website-blueprint.svg",
    deliverables: [
      {
        title: "Custom Page Structure",
        description: "A recommended sitemap with pages tailored to your industry and goals.",
        icon: "LayoutDashboard",
      },
      {
        title: "Homepage Copy Draft",
        description: "A complete first draft of your homepage — headline, sections, and call-to-action.",
        icon: "FileText",
      },
      {
        title: "Colour Palette",
        description: "A curated colour palette chosen for your industry with usage guidelines.",
        icon: "Palette",
      },
      {
        title: "Font Pairing",
        description: "Professional heading and body font recommendation with examples.",
        icon: "Type",
      },
      {
        title: "SEO Keywords",
        description: "Targeted keywords your ideal customers are searching for in South Africa.",
        icon: "Search",
      },
      {
        title: "Competitor Insights",
        description: "Quick analysis of what's working in your market and how to stand out.",
        icon: "TrendingUp",
      },
    ],
    questionnaire: [
      aboutYourBusinessSection,
      websiteGoalsSection,
      brandPreferencesSection,
    ],
    estimatedDelivery: "Within 15 minutes",
    isBundle: false,
    webhookId: "website-blueprint",
    isActive: true,
  },
  {
    id: "p2",
    slug: "social-media-starter-kit",
    name: "Social Media Starter Kit",
    tagline: "30 days of personalised content, ready to post",
    category: "Social Media",
    description:
      "Get 30 personalised post ideas with captions written for your business, a hashtag strategy, optimal posting schedule, and bio suggestions for every platform you use.",
    price: 149,
    thumbnailUrl: "/images/products/social-media-kit.svg",
    deliverables: [
      {
        title: "30 Post Ideas with Captions",
        description: "A full month of content ideas with ready-to-use captions written for your business.",
        icon: "PenLine",
      },
      {
        title: "Hashtag Strategy",
        description: "Industry-specific hashtags mixing broad reach with local SA targeting.",
        icon: "Hash",
      },
      {
        title: "Posting Schedule",
        description: "Optimal days and times to post based on your audience and platforms.",
        icon: "Calendar",
      },
      {
        title: "Bio & Profile Suggestions",
        description: "Polished bios for each platform that clearly communicate what you do.",
        icon: "AtSign",
      },
      {
        title: "Content Pillars",
        description: "3-5 content themes to rotate through so your feed stays varied and on-brand.",
        icon: "Layers",
      },
    ],
    questionnaire: [
      aboutYourBusinessSection,
      socialMediaSection,
    ],
    estimatedDelivery: "Within 15 minutes",
    isBundle: false,
    webhookId: "social-media-starter-kit",
    isActive: true,
  },
  {
    id: "p3",
    slug: "website-copy-pack",
    name: "Website Copy Pack",
    tagline: "Professional website copy, written for your business",
    category: "Copywriting",
    description:
      "Get complete, conversion-focused copy for 5 pages of your website — written specifically for your business, your audience, and your industry. No generic templates.",
    price: 349,
    thumbnailUrl: "/images/products/website-copy.svg",
    deliverables: [
      {
        title: "5 Pages of Website Copy",
        description: "Full copy drafts for your chosen pages — headlines, body text, and calls-to-action.",
        icon: "FileText",
      },
      {
        title: "SEO-Optimised Headlines",
        description: "Headlines crafted to rank on Google and grab attention.",
        icon: "Search",
      },
      {
        title: "Call-to-Action Strategy",
        description: "Clear, compelling CTAs placed throughout each page to drive conversions.",
        icon: "MousePointerClick",
      },
      {
        title: "Brand Voice Guide",
        description: "A quick reference for maintaining consistent tone across all your content.",
        icon: "MessageSquare",
      },
      {
        title: "Meta Descriptions",
        description: "SEO-ready meta descriptions for each page to improve search visibility.",
        icon: "Globe",
      },
    ],
    questionnaire: [
      aboutYourBusinessSection,
      copyBusinessSection,
      copyPagesSection,
    ],
    estimatedDelivery: "Within 15 minutes",
    isBundle: false,
    webhookId: "website-copy-pack",
    isActive: true,
  },
  {
    id: "p4",
    slug: "complete-digital-launch-kit",
    name: "Complete Digital Launch Kit",
    tagline: "Everything you need to launch online, personalised to your business",
    category: "Bundle",
    description:
      "Get your website blueprint, social media starter kit, and complete website copy — all personalised for your business in one comprehensive package. Save R248 compared to buying separately.",
    price: 499,
    originalPrice: 747,
    thumbnailUrl: "/images/products/launch-kit.svg",
    deliverables: [
      {
        title: "Website Blueprint",
        description: "Complete page structure, colour palette, font pairing, and SEO keywords.",
        icon: "LayoutDashboard",
      },
      {
        title: "Homepage Copy Draft",
        description: "A full first draft of your homepage with headline, sections, and CTA.",
        icon: "FileText",
      },
      {
        title: "30 Social Media Posts",
        description: "A month of personalised content ideas with ready-to-use captions.",
        icon: "PenLine",
      },
      {
        title: "Hashtag & Posting Strategy",
        description: "Platform-specific hashtags and optimal posting schedule.",
        icon: "Hash",
      },
      {
        title: "5 Pages of Website Copy",
        description: "Conversion-focused copy for your 5 most important pages.",
        icon: "FileText",
      },
      {
        title: "Brand Voice Guide",
        description: "Consistent tone and messaging guidelines for all your content.",
        icon: "MessageSquare",
      },
      {
        title: "Competitor Analysis",
        description: "What's working in your market and how to differentiate.",
        icon: "TrendingUp",
      },
      {
        title: "SEO Keyword Report",
        description: "Targeted keywords your ideal South African customers are searching for.",
        icon: "Search",
      },
    ],
    questionnaire: [
      aboutYourBusinessSection,
      websiteGoalsSection,
      brandPreferencesSection,
      socialMediaSection,
      copyBusinessSection,
      copyPagesSection,
    ],
    estimatedDelivery: "Within 30 minutes",
    isBundle: true,
    bundledProductSlugs: ["website-blueprint", "social-media-starter-kit", "website-copy-pack"],
    webhookId: "complete-digital-launch-kit",
    isActive: true,
  },
];
