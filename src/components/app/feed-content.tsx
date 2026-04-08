"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Crown,
  Briefcase,
  MapPin,
  Search,
  Pencil,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { PostComposer } from "./post-composer";
import { PostCard } from "./post-card";
import { UserAvatar } from "./user-avatar";

interface FeedContentProps {
  posts: any[];
  currentUserId: string;
  profile: any;
  suggestedProfiles?: any[];
}

export function FeedContent({
  posts,
  currentUserId,
  profile,
  suggestedProfiles = [],
}: FeedContentProps) {
  const [localPosts, setLocalPosts] = useState(posts);

  const handleNewPost = (post: any) => {
    setLocalPosts((prev) => [
      { ...post, profiles: profile },
      ...prev,
    ]);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <div className="flex gap-6">
        {/* Main feed column */}
        <div className="flex-1 min-w-0 max-w-2xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <motion.div variants={fadeInUp}>
              <PostComposer onPost={handleNewPost} userProfile={profile} />
            </motion.div>

            {localPosts.length === 0 ? (
              <motion.div
                variants={fadeInUp}
                className="rounded-xl border border-border bg-card p-12 text-center"
              >
                <Users size={32} className="mx-auto text-muted-foreground" />
                <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">
                  Your feed is empty
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Start by making your first post, or discover and connect with
                  other business owners.
                </p>
                <Link
                  href="/discover"
                  className={cn(buttonVariants(), "mt-4 gap-2")}
                >
                  <Search size={16} />
                  Discover Businesses
                </Link>
              </motion.div>
            ) : (
              localPosts.map((post) => (
                <motion.div key={post.id} variants={fadeInUp}>
                  <PostCard post={post} currentUserId={currentUserId} />
                </motion.div>
              ))
            )}
          </motion.div>
        </div>

        {/* Right sidebar — LinkedIn style */}
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-20 space-y-4">
            {/* Profile card */}
            <div className="rounded-xl border border-border bg-card p-4">
              <Link
                href="/profile"
                className="flex items-center gap-3 group"
              >
                <UserAvatar
                  src={profile?.logo_url}
                  name={profile?.business_name || profile?.full_name}
                  size="md"
                />
                <div className="min-w-0">
                  <p className="font-heading text-sm font-semibold text-foreground group-hover:underline truncate">
                    {profile?.business_name || profile?.full_name}
                  </p>
                  {profile?.industry && (
                    <p className="text-xs text-muted-foreground truncate">
                      {profile.industry}
                    </p>
                  )}
                </div>
              </Link>
              {!profile?.profile_completed && (
                <Link
                  href="/profile/setup"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "mt-3 w-full gap-1.5"
                  )}
                >
                  <Pencil size={12} />
                  Complete Your Profile
                </Link>
              )}
            </div>

            {/* Suggested connections */}
            {suggestedProfiles.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-4">
                <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  People you may know
                </h3>
                <div className="mt-3 space-y-3">
                  {suggestedProfiles.map((p) => (
                    <Link
                      key={p.id}
                      href={`/profile/${p.username || p.id}`}
                      className="flex items-center gap-2.5 group"
                    >
                      <UserAvatar
                        src={p.logo_url}
                        name={p.business_name || p.full_name}
                        size="xs"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1">
                          <p className="text-xs font-semibold text-foreground group-hover:underline truncate">
                            {p.business_name || p.full_name}
                          </p>
                          {p.is_premium && (
                            <Crown
                              size={10}
                              className="shrink-0 text-amber-500"
                            />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {p.industry}
                          {p.location ? ` · ${p.location}` : ""}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/discover"
                  className="mt-3 block text-xs font-medium text-primary hover:underline"
                >
                  See all →
                </Link>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
