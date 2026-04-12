"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Loader2, Briefcase, Palette, Globe } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { QuestionnaireSection } from "@/components/questionnaire/questionnaire-section";
import { QuestionnaireProgress } from "@/components/questionnaire/questionnaire-progress";
import { createClient } from "@/lib/supabase/client";
import type { QuestionnaireSection as SectionType } from "@/data/products";

// Profile wizard sections — reuses the same QuestionnaireSection type
const businessBasicsSection: SectionType = {
  title: "Business Basics",
  description: "Tell us about your business so we can connect you with the right people.",
  fields: [
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
      id: "business_description",
      label: "Describe what your business does (2-3 sentences)",
      type: "textarea",
      placeholder: "e.g., We're a family-owned coffee shop in Stellenbosch...",
      required: true,
      maxLength: 500,
    },
    {
      id: "target_audience",
      label: "Who is your ideal customer?",
      type: "textarea",
      placeholder: "e.g., Young professionals aged 25-35 who value quality",
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
  ],
};

const brandDetailsSection: SectionType = {
  title: "Brand & Details",
  description: "Help us understand your brand personality and what makes you unique.",
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
      id: "brand_voice",
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
      id: "services_products",
      label: "What are your main services or products?",
      type: "textarea",
      placeholder: "e.g., 1. Haircuts & styling\n2. Beard grooming\n3. Hot towel shaves",
      required: true,
      maxLength: 500,
    },
    {
      id: "unique_selling_point",
      label: "What makes you different from competitors?",
      type: "textarea",
      placeholder: "e.g., We're the only mobile detailing service in Sandton...",
      required: false,
      maxLength: 400,
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
  ],
};

const onlinePresenceSection: SectionType = {
  title: "Online Presence",
  description: "Share your online profiles so other businesses can find and connect with you.",
  fields: [
    {
      id: "website_url",
      label: "Website URL (if you have one)",
      type: "url",
      placeholder: "https://www.example.co.za",
      required: false,
    },
    {
      id: "instagram",
      label: "Instagram handle",
      type: "text",
      placeholder: "@yourbusiness",
      required: false,
    },
    {
      id: "facebook",
      label: "Facebook page URL",
      type: "url",
      placeholder: "https://facebook.com/yourbusiness",
      required: false,
    },
    {
      id: "linkedin",
      label: "LinkedIn URL",
      type: "url",
      placeholder: "https://linkedin.com/in/yourname",
      required: false,
    },
  ],
};

const sections = [businessBasicsSection, brandDetailsSection, onlinePresenceSection];

export default function ProfileSetupPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (fieldId: string, value: string | string[]) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[fieldId];
      return next;
    });
  };

  const validateSection = (sectionIndex: number): boolean => {
    const section = sections[sectionIndex];
    const newErrors: Record<string, string> = {};

    for (const field of section.fields) {
      if (!field.required) continue;
      const val = values[field.id];
      if (field.type === "multi-select") {
        if (!Array.isArray(val) || val.length === 0) {
          newErrors[field.id] = "Please select at least one option.";
        }
      } else {
        if (!val || (typeof val === "string" && !val.trim())) {
          newErrors[field.id] = "This field is required.";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateSection(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleComplete = async () => {
    if (!validateSection(currentStep)) return;

    setSubmitting(true);
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const profileData = {
      business_name: values.business_name as string,
      industry: values.industry as string,
      business_description: values.business_description as string,
      target_audience: values.target_audience as string,
      location: values.location as string,
      brand_personality: values.brand_personality as string[],
      brand_voice: values.brand_voice as string,
      services_products: values.services_products as string,
      unique_selling_point: (values.unique_selling_point as string) || null,
      years_experience: values.years_experience as string,
      website_url: (values.website_url as string) || null,
      social_links: {
        instagram: values.instagram || null,
        facebook: values.facebook || null,
        linkedin: values.linkedin || null,
      },
      profile_completed: true,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("profiles")
      .update(profileData)
      .eq("id", user.id);

    if (error) {
      setSubmitting(false);
      setErrors({ _form: "Something went wrong. Please try again." });
      return;
    }

    router.push("/feed");
  };

  const stepIcons = [Briefcase, Palette, Globe];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <div>
          <div className="mb-2 text-center">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
              Set up your business profile
            </h1>
            <p className="mt-2 text-muted-foreground">
              This helps us personalise your experience and connect you with the right people.
            </p>
          </div>

          {/* Progress */}
          <div className="my-8">
            <QuestionnaireProgress
              currentStep={currentStep}
              totalSteps={sections.length}
              stepLabels={sections.map((s) => s.title)}
            />
          </div>

          {/* Form */}
          <div className="rounded-xl border border-border bg-card p-6">
            <QuestionnaireSection
              section={sections[currentStep]}
              values={values}
              onChange={handleChange}
              errors={errors}
            />
          </div>

          {/* Navigation */}
          <div className="mt-6 flex gap-3">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
              >
                <ArrowLeft size={16} />
                Back
              </button>
            )}
            <div className="flex-1" />
            {currentStep < sections.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className={cn(buttonVariants({ size: "lg" }), "gap-2")}
              >
                Next
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleComplete}
                disabled={submitting}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "gap-2 glow-primary",
                  submitting && "opacity-70 cursor-not-allowed"
                )}
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    Complete Setup
                  </>
                )}
              </button>
            )}
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            You can always update these details later in your profile settings.
          </p>
        </div>
      </div>
    </div>
  );
}
