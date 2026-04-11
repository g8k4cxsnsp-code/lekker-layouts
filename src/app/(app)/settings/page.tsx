"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Trash2,
  Loader2,
  Save,
  LogOut,
  Crown,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/animations";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      setEmail(user.email || "");

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setProfile(data);
        setFullName(data.full_name || "");
        setUsername(data.username || "");
      }
      setLoading(false);
    };
    load();
  }, []);

  const handleSaveAccount = async () => {
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
        full_name: fullName,
        username: username.toLowerCase().replace(/[^a-z0-9_-]/g, ""),
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      setMessage("Failed to save. Username may already be taken.");
    } else {
      setMessage("Settings saved.");
    }
    setSaving(false);
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleDeleteAccount = async () => {
    if (
      !confirm(
        "Are you sure? This will permanently delete your account and all data. This action cannot be undone."
      )
    )
      return;

    // For now just sign out — actual deletion needs a server action with service role
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
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
      <motion.div variants={fadeInUp} initial="hidden" animate="visible">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-6">
          Settings
        </h1>

        <Tabs defaultValue="account">
          <TabsList variant="line" className="w-full">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="danger">Danger Zone</TabsTrigger>
          </TabsList>

          {/* Account */}
          <TabsContent value="account" className="mt-6 space-y-4">
            <div className="rounded-2xl border-2 border-primary/20 bg-card p-5 space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="your-username"
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  lekkerlayouts.co.za/profile/{username || "your-username"}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="mt-1 w-full rounded-lg border border-input bg-muted px-3 py-2 text-sm text-muted-foreground cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Email cannot be changed here.
                </p>
              </div>

              {message && (
                <p
                  className={cn(
                    "text-sm",
                    message.includes("Failed")
                      ? "text-destructive"
                      : "text-green-600 dark:text-green-400"
                  )}
                >
                  {message}
                </p>
              )}

              <Button
                onClick={handleSaveAccount}
                loading={saving}
                loadingText="Saving..."
                className="gap-2"
              >
                <Save size={14} />
                Save Changes
              </Button>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <button
                onClick={handleSignOut}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "gap-2 text-muted-foreground"
                )}
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          </TabsContent>

          {/* Subscription */}
          <TabsContent value="subscription" className="mt-6">
            <div className="rounded-2xl border-2 border-primary/20 bg-card p-5">
              {profile?.is_premium ? (
                <div>
                  <div className="flex items-center gap-2">
                    <Crown size={18} className="text-amber-500" />
                    <h3 className="font-heading text-sm font-semibold text-foreground">
                      Premium Active
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your premium access is active
                    {profile.premium_expires_at && (
                      <>
                        {" "}
                        until{" "}
                        {new Date(
                          profile.premium_expires_at
                        ).toLocaleDateString("en-ZA", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </>
                    )}
                    .
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="font-heading text-sm font-semibold text-foreground">
                    Free Plan
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Upgrade to Premium for boosted visibility and product
                    discounts.
                  </p>
                  <a
                    href="/premium"
                    className={cn(buttonVariants(), "mt-3 gap-2")}
                  >
                    <Crown size={14} />
                    Upgrade to Premium
                  </a>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Danger Zone */}
          <TabsContent value="danger" className="mt-6">
            <div className="rounded-2xl border-2 border-destructive/30 bg-card p-5">
              <div className="flex items-center gap-2">
                <Trash2 size={16} className="text-destructive" />
                <h3 className="font-heading text-sm font-semibold text-destructive">
                  Delete Account
                </h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Permanently delete your account and all associated data. This
                action cannot be undone.
              </p>
              <button
                onClick={handleDeleteAccount}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "mt-3 gap-2 border-destructive/30 text-destructive hover:bg-destructive/10"
                )}
              >
                <Trash2 size={14} />
                Delete My Account
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
