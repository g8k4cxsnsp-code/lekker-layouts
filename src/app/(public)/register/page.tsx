"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, AlertCircle, ArrowRight, Check, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signUp } from "@/lib/actions/auth";

const perks = [
  "Create your business profile",
  "Connect with SA business owners",
  "Get personalised digital products",
  "Post updates, deals & announcements",
];

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    const password = formData.get("password") as string;
    const confirm = formData.get("confirmPassword") as string;

    if (password !== confirm) {
      setError("Passwords don't match.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    formData.append("origin", window.location.origin);
    const result = await signUp(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else if (result?.success) {
      setEmailSent(true);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
              Join Lekker Layouts
            </h1>
            <p className="mt-2 text-muted-foreground">
              Create your free business profile
            </p>
          </div>

          {/* Perks */}
          <div className="mb-6 space-y-2">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check size={12} className="text-primary" />
                </div>
                {perk}
              </div>
            ))}
          </div>

          {emailSent ? (
            <div
              className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center"
            >
              <Mail size={48} className="mx-auto text-primary" />
              <h2 className="mt-4 font-heading text-xl font-semibold text-foreground">
                Check your email
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                We&apos;ve sent a confirmation link to your email address. Click the link to activate your account and set up your profile.
              </p>
              <p className="mt-4 text-xs text-muted-foreground">
                Didn&apos;t receive it? Check your spam folder or{" "}
                <button
                  onClick={() => { setEmailSent(false); setError(""); }}
                  className="font-medium text-primary hover:underline"
                >
                  try again
                </button>
              </p>
            </div>
          ) : (<>

          {error && (
            <div
              className="mb-6 flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4"
            >
              <AlertCircle size={18} className="shrink-0 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="rounded-xl border border-border bg-card p-6 space-y-5">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-foreground">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="John Smith"
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  placeholder="At least 6 characters"
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full gap-2",
                loading && "opacity-70 cursor-not-allowed"
              )}
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  Create Account
                </>
              )}
            </button>

            <p className="text-center text-xs text-muted-foreground">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="underline">Terms</Link> and{" "}
              <Link href="/privacy" className="underline">Privacy Policy</Link>.
            </p>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Log in
              <ArrowRight size={14} className="ml-1 inline" />
            </Link>
          </p>

          </>)}
        </div>
      </div>
    </>
  );
}
