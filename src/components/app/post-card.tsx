"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, MessageCircle, Tag, Megaphone, Crown, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { addComment } from "@/lib/actions/posts";
import { UserAvatar } from "@/components/app/user-avatar";

interface PostCardProps {
  post: any;
  currentUserId: string;
}

const postTypeConfig = {
  deal: { icon: Tag, label: "Deal", color: "text-green-600 bg-green-50 dark:bg-green-950/30" },
  announcement: { icon: Megaphone, label: "Announcement", color: "text-blue-600 bg-blue-50 dark:bg-blue-950/30" },
  update: null,
};

export function PostCard({ post, currentUserId }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [commentsCount, setCommentsCount] = useState(post.comments_count || 0);
  const [commentText, setCommentText] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const profile = post.profiles;
  const typeConfig = postTypeConfig[post.post_type as keyof typeof postTypeConfig];

  const handleLike = async () => {
    const supabase = createClient();
    if (!supabase) return;
    const newLiked = !liked;
    setLiked(newLiked);
    setLikesCount((prev: number) => prev + (newLiked ? 1 : -1));

    if (newLiked) {
      await supabase.from("post_likes").insert({
        post_id: post.id,
        user_id: currentUserId,
      });
    } else {
      await supabase
        .from("post_likes")
        .delete()
        .match({ post_id: post.id, user_id: currentUserId });
    }
  };

  const toggleComments = async () => {
    if (!showComments && comments.length === 0) {
      setLoadingComments(true);
      const supabase = createClient();
      if (supabase) {
        const { data } = await supabase
          .from("post_comments")
          .select(`
            *,
            profiles:user_id (
              id, username, full_name, business_name, is_premium
            )
          `)
          .eq("post_id", post.id)
          .order("created_at", { ascending: true });
        setComments(data || []);
      }
      setLoadingComments(false);
    }
    setShowComments(!showComments);
  };

  const handleComment = async () => {
    if (!commentText.trim() || submitting) return;
    setSubmitting(true);
    const result = await addComment(post.id, commentText.trim());
    if (result.comment) {
      setComments((prev) => [
        ...prev,
        { ...result.comment, profiles: { id: currentUserId } },
      ]);
      setCommentsCount((prev: number) => prev + 1);
      setCommentText("");
    }
    setSubmitting(false);
  };

  const timeAgo = getTimeAgo(new Date(post.created_at));

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <Link href={`/profile/${profile?.username || profile?.id}`}>
            <UserAvatar
              src={profile?.logo_url}
              name={profile?.business_name || profile?.full_name}
              size="sm"
            />
          </Link>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <Link
                href={`/profile/${profile?.username || profile?.id}`}
                className="font-heading text-sm font-semibold text-foreground hover:underline truncate"
              >
                {profile?.business_name || profile?.full_name}
              </Link>
              {profile?.is_premium && (
                <Crown size={14} className="shrink-0 text-amber-500" />
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {profile?.industry && <span>{profile.industry}</span>}
              <span>&middot;</span>
              <span>{timeAgo}</span>
            </div>
          </div>

          {/* Post type badge */}
          {typeConfig && (
            <Badge
              variant="secondary"
              className={cn("shrink-0 gap-1 text-xs", typeConfig.color)}
            >
              <typeConfig.icon size={12} />
              {typeConfig.label}
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="mt-3">
          <p className="text-sm text-foreground whitespace-pre-wrap">
            {post.content}
          </p>
        </div>

        {/* Like/comment counts */}
        {(likesCount > 0 || commentsCount > 0) && (
          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            {likesCount > 0 && (
              <span>{likesCount} like{likesCount !== 1 ? "s" : ""}</span>
            )}
            {commentsCount > 0 && (
              <button onClick={toggleComments} className="hover:underline">
                {commentsCount} comment{commentsCount !== 1 ? "s" : ""}
              </button>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="mt-3 flex items-center gap-1 border-t border-border/50 pt-2">
          <button
            onClick={handleLike}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-xs font-medium transition-colors",
              liked
                ? "text-red-500"
                : "text-muted-foreground hover:bg-muted hover:text-red-500"
            )}
          >
            <Heart size={16} fill={liked ? "currentColor" : "none"} />
            Like
          </button>

          <button
            onClick={toggleComments}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <MessageCircle size={16} />
            Comment
          </button>
        </div>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="border-t border-border/50 bg-muted/30 p-4">
          {loadingComments ? (
            <p className="text-center text-xs text-muted-foreground">
              Loading comments...
            </p>
          ) : (
            <>
              {comments.length > 0 && (
                <div className="mb-3 space-y-3">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-2">
                      <Link href={`/profile/${comment.profiles?.username || comment.profiles?.id || comment.user_id}`}>
                        <UserAvatar
                          src={comment.profiles?.logo_url}
                          name={comment.profiles?.business_name || comment.profiles?.full_name}
                          size="xs"
                        />
                      </Link>
                      <div className="min-w-0 flex-1 rounded-lg bg-card px-3 py-2">
                        <Link
                          href={`/profile/${comment.profiles?.username || comment.profiles?.id || comment.user_id}`}
                          className="text-xs font-semibold text-foreground hover:underline"
                        >
                          {comment.profiles?.business_name ||
                            comment.profiles?.full_name ||
                            "Member"}
                        </Link>
                        <p className="mt-0.5 text-xs text-foreground/80">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Comment input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleComment();
                    }
                  }}
                  placeholder="Write a comment..."
                  className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-xs placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/30"
                />
                <button
                  onClick={handleComment}
                  disabled={!commentText.trim() || submitting}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
                >
                  <Send size={14} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-ZA", { day: "numeric", month: "short" });
}
