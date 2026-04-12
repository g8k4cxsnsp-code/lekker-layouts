import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { ChatContent } from "@/components/app/chat-content";

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) {
  const { conversationId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Verify membership
  const { data: membership } = await supabase
    .from("conversation_members")
    .select("conversation_id")
    .eq("conversation_id", conversationId)
    .eq("user_id", user.id)
    .single();

  if (!membership) notFound();

  // Fetch conversation, messages, and members in parallel
  const [{ data: conversation }, { data: messages }, { data: members }] =
    await Promise.all([
      supabase
        .from("conversations")
        .select("id, created_at, is_group, group_name")
        .eq("id", conversationId)
        .single(),
      supabase
        .from("messages")
        .select(`
          *,
          profiles:sender_id (
            id, username, full_name, business_name, logo_url
          )
        `)
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true })
        .limit(100),
      supabase
        .from("conversation_members")
        .select(`
          user_id,
          profiles:user_id (
            id, username, full_name, business_name, logo_url
          )
        `)
        .eq("conversation_id", conversationId)
        .neq("user_id", user.id),
    ]);

  if (!conversation) notFound();

  // Mark as read (non-blocking)
  supabase
    .from("conversation_members")
    .update({ last_read_at: new Date().toISOString() })
    .eq("conversation_id", conversationId)
    .eq("user_id", user.id)
    .then(() => {});

  return (
    <ChatContent
      conversationId={conversationId}
      conversation={conversation}
      messages={messages || []}
      members={members || []}
      currentUserId={user.id}
    />
  );
}
