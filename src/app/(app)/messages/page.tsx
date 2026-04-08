import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { MessageCircle, Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function MessagesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch conversations the user is part of
  const { data: memberships } = await supabase
    .from("conversation_members")
    .select(`
      conversation_id,
      last_read_at,
      conversations (
        id,
        type,
        name,
        created_at
      )
    `)
    .eq("user_id", user.id)
    .order("conversation_id", { ascending: false });

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Messages</h1>
      </div>

      {(!memberships || memberships.length === 0) ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <MessageCircle size={48} className="mx-auto text-muted-foreground/30" />
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
            Find Businesses
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {memberships.map((m: any) => (
            <Link
              key={m.conversation_id}
              href={`/messages/${m.conversation_id}`}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/30"
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
