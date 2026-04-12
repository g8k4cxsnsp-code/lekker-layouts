"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function MessagesError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Messages</h1>
      </div>

      <div className="rounded-2xl border-2 border-destructive/20 bg-card p-12 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle size={28} className="text-destructive" />
        </div>
        <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
          Unable to load messages
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong loading this page. Please try again.
        </p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Try Again
          </button>
          <Link href="/feed" className={cn(buttonVariants())}>
            Go to Feed
          </Link>
        </div>
      </div>
    </div>
  );
}
