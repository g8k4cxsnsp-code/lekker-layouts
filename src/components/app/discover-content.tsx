"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, MapPin, Crown, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { UserAvatar } from "@/components/app/user-avatar";

interface DiscoverContentProps {
  profiles: any[];
}

const industries = [
  "All",
  "Restaurant / Cafe",
  "Beauty / Wellness",
  "Fitness / Sports",
  "Professional Services",
  "Trades / Construction",
  "Tech / Digital",
  "Creative / Photography",
  "Retail / eCommerce",
  "Health / Medical",
];

export function DiscoverContent({ profiles }: DiscoverContentProps) {
  const [search, setSearch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");

  const filtered = profiles.filter((p) => {
    const matchesSearch =
      !search ||
      p.business_name?.toLowerCase().includes(search.toLowerCase()) ||
      p.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      p.business_description?.toLowerCase().includes(search.toLowerCase());

    const matchesIndustry =
      selectedIndustry === "All" || p.industry === selectedIndustry;

    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeInUp}>
          <h1 className="font-heading text-2xl font-bold text-foreground">
            Discover Businesses
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Find and connect with South African business owners
          </p>
        </motion.div>

        {/* Search */}
        <motion.div variants={fadeInUp} className="mt-6">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, business, or description..."
              className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
            />
          </div>
        </motion.div>

        {/* Industry filter */}
        <motion.div variants={fadeInUp} className="mt-4 flex flex-wrap gap-2">
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => setSelectedIndustry(industry)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                selectedIndustry === industry
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {industry}
            </button>
          ))}
        </motion.div>

        {/* Results */}
        <motion.div
          variants={staggerContainer}
          className="mt-6 grid gap-4 sm:grid-cols-2"
        >
          {filtered.map((profile) => (
            <motion.div key={profile.id} variants={fadeInUp}>
              <Link
                href={`/profile/${profile.username || profile.id}`}
                className="block rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <UserAvatar
                    src={profile.logo_url}
                    name={profile.business_name || profile.full_name}
                    size="md"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading text-sm font-semibold text-foreground truncate">
                        {profile.business_name || profile.full_name}
                      </h3>
                      {profile.is_premium && (
                        <Crown size={14} className="shrink-0 text-amber-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      {profile.industry && (
                        <Badge variant="secondary" className="text-xs">
                          {profile.industry}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {profile.business_description && (
                  <p className="mt-3 text-xs text-muted-foreground line-clamp-2">
                    {profile.business_description}
                  </p>
                )}

                {profile.location && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin size={12} />
                    {profile.location}
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            variants={fadeInUp}
            className="mt-8 rounded-xl border border-border bg-card p-12 text-center"
          >
            <p className="text-muted-foreground">No businesses found matching your search.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
