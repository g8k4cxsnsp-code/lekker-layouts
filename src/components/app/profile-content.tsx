"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Globe,
  Crown,
  Briefcase,
  Calendar,
  Pencil,
  MessageCircle,
  Link2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { PostCard } from "@/components/app/post-card";
import { ConnectionButton } from "@/components/app/connection-button";
import { createDirectConversation } from "@/lib/actions/messages";

interface ProfileContentProps {
  profile: any;
  posts: any[];
  connectionsCount: number;
  connectionStatus: "none" | "pending" | "connected";
  isOwn: boolean;
  currentUserId: string;
}

export function ProfileContent({
  profile,
  posts,
  connectionsCount,
  connectionStatus,
  isOwn,
  currentUserId,
}: ProfileContentProps) {
  const router = useRouter();
  const [messagingLoading, setMessagingLoading] = useState(false);
  const socialLinks = profile.social_links || {};

  const handleMessage = async () => {
    setMessagingLoading(true);
    const result = await createDirectConversation(profile.id);
    if (result.conversationId) {
      router.push(`/messages/${result.conversationId}`);
    }
    setMessagingLoading(false);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Profile header */}
        <motion.div
          variants={fadeInUp}
          className="rounded-xl border border-border bg-card p-6"
        >
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary sm:h-20 sm:w-20">
              {profile.business_name?.[0] || profile.full_name?.[0] || "?"}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-xl font-bold text-foreground truncate">
                  {profile.business_name || profile.full_name}
                </h1>
                {profile.is_premium && (
                  <Crown size={18} className="shrink-0 text-amber-500" />
                )}
              </div>
              {profile.full_name && profile.business_name && (
                <p className="text-sm text-muted-foreground">
                  {profile.full_name}
                </p>
              )}
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                {profile.industry && (
                  <span className="flex items-center gap-1">
                    <Briefcase size={12} />
                    {profile.industry}
                  </span>
                )}
                {profile.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {profile.location}
                  </span>
                )}
                {profile.years_experience && (
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {profile.years_experience}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-4 flex items-center gap-6 border-t border-border/50 pt-4">
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">
                {posts.length}
              </p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">
                {connectionsCount}
              </p>
              <p className="text-xs text-muted-foreground">Connections</p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex gap-2">
            {isOwn ? (
              <Link
                href="/profile/edit"
                className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
              >
                <Pencil size={14} />
                Edit Profile
              </Link>
            ) : (
              <>
                <ConnectionButton
                  profileId={profile.id}
                  initialStatus={connectionStatus}
                />
                {connectionStatus === "connected" && (
                  <button
                    onClick={handleMessage}
                    disabled={messagingLoading}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "gap-2"
                    )}
                  >
                    <MessageCircle size={14} />
                    {messagingLoading ? "Opening..." : "Message"}
                  </button>
                )}
              </>
            )}
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={fadeInUp} className="mt-6">
          <Tabs defaultValue="about">
            <TabsList variant="line" className="w-full">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-4 space-y-4">
              {/* Description */}
              {profile.business_description && (
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-heading text-sm font-semibold text-foreground mb-2">
                    About
                  </h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {profile.business_description}
                  </p>
                </div>
              )}

              {/* Services */}
              {profile.services_products && (
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-heading text-sm font-semibold text-foreground mb-2">
                    Services & Products
                  </h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {profile.services_products}
                  </p>
                </div>
              )}

              {/* USP */}
              {profile.unique_selling_point && (
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-heading text-sm font-semibold text-foreground mb-2">
                    What Makes Us Different
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {profile.unique_selling_point}
                  </p>
                </div>
              )}

              {/* Brand personality */}
              {profile.brand_personality?.length > 0 && (
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-heading text-sm font-semibold text-foreground mb-2">
                    Brand Personality
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.brand_personality.map((trait: string) => (
                      <Badge key={trait} variant="secondary">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              {(profile.website_url ||
                socialLinks.instagram ||
                socialLinks.facebook ||
                socialLinks.linkedin) && (
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-heading text-sm font-semibold text-foreground mb-3">
                    Links
                  </h3>
                  <div className="space-y-2">
                    {profile.website_url && (
                      <a
                        href={profile.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        <Globe size={14} />
                        {profile.website_url.replace(/^https?:\/\//, "")}
                      </a>
                    )}
                    {socialLinks.instagram && (
                      <a
                        href={
                          socialLinks.instagram.startsWith("http")
                            ? socialLinks.instagram
                            : `https://instagram.com/${socialLinks.instagram.replace("@", "")}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        <Link2 size={14} />
                        {socialLinks.instagram}
                      </a>
                    )}
                    {socialLinks.linkedin && (
                      <a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        <Link2 size={14} />
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="posts" className="mt-4 space-y-3">
              {posts.length === 0 ? (
                <div className="rounded-xl border border-border bg-card p-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    No posts yet.
                  </p>
                </div>
              ) : (
                posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    currentUserId={currentUserId}
                  />
                ))
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
}
