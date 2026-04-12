import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { MessageCircle, AlertCircle, Search } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function MessagesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  let memberships: any[] | null = null;
  let queryError: string | null = null;

  try {
    const { data, error } = await supabase
      .from("conversation_members")
      .select(`
        conversation_id,
        last_read_at,
        conversations:conversation_id (
          id,
          type,
          name,
          created_at
        )
      `)
      .eq("user_id", user.id)
      .order("conversation_id", { ascending: false });

    if (error) {
      queryError = error.message;
    } else {
      memberships = data;
    }
  } catch (err: any) {
    queryError = err?.message || "Failed to load conversations";
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Messages</h1>
      </div>

      {queryError ? (
        <div className="rounded-2xl border-2 border-destructive/20 bg-card p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle size={28} className="text-destructive" />
          </div>
          <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
            Unable to load messages
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            There was an issue loading your conversations. This may be a temporary problem.
          </p>
          <Link
            href="/messages"
            className={cn(buttonVariants(), "mt-4 gap-2")}
          >
            Try Again
          </Link>
        </div>
      ) : (!memberships || memberships.length === 0) ? (
        <div className="rounded-2xl border-2 border-primary/20 bg-card p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <MessageCircle size={28} className="text-primary" />
          </div>
          <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
            No conversations yet
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Connect with other business owners and start chatting.
          </p>
          <Link
            href="/discover"
            className={cn(buttonVariants(), "mt-4 gap-2")}
          >
            <Search size={16} />
            Find Businesses
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {memberships.map((m: any) => (
            <Link
              key={m.conversation_id}
              href={`/messages/${m.conversation_id}`}
              className="flex items-center gap-3 rounded-2xl border-2 border-primary/15 bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <MessageCircle size={18} className="text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">
                  {m.conversations?.name || "Direct Message"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {m.conversations?.type === "group" ? "Group chat" : "Direct message"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
