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

  // Verify user is a member of this conversation
  const { data: membership } = await supabase
    .from("conversation_members")
    .select("conversation_id")
    .eq("conversation_id", conversationId)
    .eq("user_id", user.id)
    .single();

  if (!membership) notFound();

  // Fetch conversation details
  const { data: conversation } = await supabase
    .from("conversations")
    .select("*")
    .eq("id", conversationId)
    .single();

  if (!conversation) notFound();

  // Fetch messages
  const { data: messages } = await supabase
    .from("messages")
    .select(`
      *,
      profiles:sender_id (
        id, username, full_name, business_name, logo_url
      )
    `)
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })
    .limit(100);

  // Fetch other members for the header
  const { data: members } = await supabase
    .from("conversation_members")
    .select(`
      user_id,
      profiles:user_id (
        id, username, full_name, business_name, logo_url
      )
    `)
    .eq("conversation_id", conversationId)
    .neq("user_id", user.id);

  // Mark as read
  await supabase
    .from("conversation_members")
    .update({ last_read_at: new Date().toISOString() })
    .eq("conversation_id", conversationId)
    .eq("user_id", user.id);

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
