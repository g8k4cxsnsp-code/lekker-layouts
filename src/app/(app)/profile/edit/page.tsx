"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Camera } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { QuestionnaireSection } from "@/components/questionnaire/questionnaire-section";
import { createClient } from "@/lib/supabase/client";
import { UserAvatar } from "@/components/app/user-avatar";
import type { QuestionnaireSection as SectionType } from "@/data/products";

const editSections: SectionType[] = [
  {
    title: "Business Information",
    description: "Update your business details.",
    fields: [
      {
        id: "business_name",
        label: "Business Name",
        type: "text",
        required: true,
      },
      {
        id: "industry",
        label: "Industry",
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
        label: "Business Description",
        type: "textarea",
        required: true,
        maxLength: 500,
      },
      {
        id: "target_audience",
        label: "Target Audience",
        type: "textarea",
        required: true,
        maxLength: 300,
      },
      {
        id: "location",
        label: "Location",
        type: "text",
        required: true,
      },
      {
        id: "services_products",
        label: "Services / Products",
        type: "textarea",
        required: true,
        maxLength: 500,
      },
      {
        id: "unique_selling_point",
        label: "What Makes You Different",
        type: "textarea",
        required: false,
        maxLength: 400,
      },
      {
        id: "years_experience",
        label: "Years in Business",
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
  },
  {
    title: "Brand & Online Presence",
    description: "Update your brand personality and online links.",
    fields: [
      {
        id: "brand_personality",
        label: "Brand Personality (up to 3)",
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
      },
      {
        id: "brand_voice",
        label: "Brand Voice",
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
        id: "website_url",
        label: "Website URL",
        type: "url",
        required: false,
      },
      {
        id: "instagram",
        label: "Instagram",
        type: "text",
        required: false,
      },
      {
        id: "facebook",
        label: "Facebook URL",
        type: "url",
        required: false,
      },
      {
        id: "linkedin",
        label: "LinkedIn URL",
        type: "url",
        required: false,
      },
    ],
  },
];

export default function ProfileEditPage() {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setUserId(user.id);
      if (profile) {
        setAvatarUrl(profile.logo_url || null);
        setValues({
          business_name: profile.business_name || "",
          industry: profile.industry || "",
          business_description: profile.business_description || "",
          target_audience: profile.target_audience || "",
          location: profile.location || "",
          services_products: profile.services_products || "",
          unique_selling_point: profile.unique_selling_point || "",
          years_experience: profile.years_experience || "",
          brand_personality: profile.brand_personality || [],
          brand_voice: profile.brand_voice || "",
          website_url: profile.website_url || "",
          instagram: profile.social_links?.instagram || "",
          facebook: profile.social_links?.facebook || "",
          linkedin: profile.social_links?.linkedin || "",
        });
      }
      setLoading(false);
    };
    load();
  }, []);

  const handleChange = (fieldId: string, value: string | string[]) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[fieldId];
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        business_name: values.business_name as string,
        industry: values.industry as string,
        business_description: values.business_description as string,
        target_audience: values.target_audience as string,
        location: values.location as string,
        services_products: values.services_products as string,
        unique_selling_point: (values.unique_selling_point as string) || null,
        years_experience: values.years_experience as string,
        brand_personality: values.brand_personality as string[],
        brand_voice: values.brand_voice as string,
        website_url: (values.website_url as string) || null,
        social_links: {
          instagram: values.instagram || null,
          facebook: values.facebook || null,
          linkedin: values.linkedin || null,
        },
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      setMessage("Something went wrong. Please try again.");
    } else {
      setMessage("Profile updated successfully.");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/profile"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-heading text-2xl font-bold text-foreground">
            Edit Profile
          </h1>
        </div>

        {/* Avatar upload */}
        <div className="mb-6 rounded-xl border border-border bg-card p-6">
          <h3 className="font-heading text-sm font-semibold text-foreground mb-4">
            Profile Picture
          </h3>
          <div className="flex items-center gap-4">
            <UserAvatar
              src={avatarUrl}
              name={(values.business_name as string) || (values.full_name as string)}
              size="lg"
            />
            <div>
              <label
                htmlFor="avatar-upload"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "gap-2 cursor-pointer",
                  uploadingAvatar && "opacity-70 cursor-not-allowed"
                )}
              >
                {uploadingAvatar ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Camera size={14} />
                    Change Photo
                  </>
                )}
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                disabled={uploadingAvatar}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file || !userId) return;
                  setUploadingAvatar(true);
                  setMessage("");

                  const supabase = createClient();
                  const ext = file.name.split(".").pop() || "jpg";
                  const path = `${userId}/avatar.${ext}`;

                  const { error: uploadError } = await supabase.storage
                    .from("avatars")
                    .upload(path, file, { upsert: true });

                  if (uploadError) {
                    setMessage("Failed to upload photo. Try a smaller image (max 2MB).");
                    setUploadingAvatar(false);
                    return;
                  }

                  const { data: urlData } = supabase.storage
                    .from("avatars")
                    .getPublicUrl(path);

                  const publicUrl = `${urlData.publicUrl}?t=${Date.now()}`;

                  await supabase
                    .from("profiles")
                    .update({ logo_url: publicUrl })
                    .eq("id", userId);

                  setAvatarUrl(publicUrl);
                  setUploadingAvatar(false);
                  setMessage("Photo updated!");
                }}
              />
              <p className="mt-2 text-xs text-muted-foreground">
                JPG, PNG or WebP. Max 2MB.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {editSections.map((section) => (
            <div
              key={section.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <QuestionnaireSection
                section={section}
                values={values}
                onChange={handleChange}
                errors={errors}
              />
            </div>
          ))}
        </div>

        {message && (
          <p
            className={cn(
              "mt-4 text-sm",
              message.includes("wrong")
                ? "text-destructive"
                : "text-green-600 dark:text-green-400"
            )}
          >
            {message}
          </p>
        )}

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className={cn(buttonVariants({ size: "lg" }), "gap-2")}
          >
            {saving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
