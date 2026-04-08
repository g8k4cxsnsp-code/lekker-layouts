"use client";

import { useState } from "react";
import { Send, Megaphone, Tag, MessageSquare, Loader2, AlertCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

type PostType = "update" | "deal" | "announcement";

const postTypes: { value: PostType; label: string; icon: React.ReactNode }[] = [
  { value: "update", label: "Update", icon: <MessageSquare size={14} /> },
  { value: "deal", label: "Deal", icon: <Tag size={14} /> },
  { value: "announcement", label: "Announcement", icon: <Megaphone size={14} /> },
];

interface PostComposerProps {
  onPost: (post: any) => void;
  userProfile: any;
}

export function PostComposer({ onPost, userProfile }: PostComposerProps) {
  const [content, setContent] = useState("");
  const [postType, setPostType] = useState<PostType>("update");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!content.trim() || submitting) return;

    setSubmitting(true);
    setError("");
    const supabase = createClient();

    const { data, error: postError } = await supabase
      .from("posts")
      .insert({
        content: content.trim(),
        post_type: postType,
        user_id: userProfile.id,
      })
      .select()
      .single();

    if (!postError && data) {
      onPost(data);
      setContent("");
      setPostType("update");
    } else {
      setError("Failed to post. Please try again.");
    }

    setSubmitting(false);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={
          postType === "deal"
            ? "Share a deal or special offer..."
            : postType === "announcement"
              ? "Make an announcement..."
              : "What's happening with your business?"
        }
        rows={3}
        className="w-full resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        maxLength={1000}
      />

      {error && (
        <div className="mt-2 flex items-center gap-2 text-xs text-destructive">
          <AlertCircle size={12} />
          {error}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between">
        {/* Post type selector */}
        <div className="flex gap-1.5">
          {postTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setPostType(type.value)}
              className={cn(
                "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                postType === type.value
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {type.icon}
              {type.label}
            </button>
          ))}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!content.trim() || submitting}
          className={cn(
            buttonVariants({ size: "sm" }),
            "gap-1.5",
            (!content.trim() || submitting) && "opacity-50 cursor-not-allowed"
          )}
        >
          {submitting ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Send size={14} />
          )}
          {submitting ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}
