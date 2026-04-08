"use server";

import { createClient } from "@/lib/supabase/server";

export async function createDirectConversation(otherUserId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  // Check if a direct conversation already exists between these two users
  const { data: existingMemberships } = await supabase
    .from("conversation_members")
    .select("conversation_id")
    .eq("user_id", user.id);

  if (existingMemberships) {
    for (const m of existingMemberships) {
      const { data: otherMember } = await supabase
        .from("conversation_members")
        .select("user_id")
        .eq("conversation_id", m.conversation_id)
        .eq("user_id", otherUserId)
        .single();

      if (otherMember) {
        // Check it's a direct conversation
        const { data: conv } = await supabase
          .from("conversations")
          .select("type")
          .eq("id", m.conversation_id)
          .eq("type", "direct")
          .single();

        if (conv) {
          return { conversationId: m.conversation_id };
        }
      }
    }
  }

  // Create new conversation
  const { data: conversation, error: convError } = await supabase
    .from("conversations")
    .insert({
      type: "direct",
      created_by: user.id,
    })
    .select()
    .single();

  if (convError || !conversation) return { error: "Failed to create conversation" };

  // Add both members
  await supabase.from("conversation_members").insert([
    { conversation_id: conversation.id, user_id: user.id },
    { conversation_id: conversation.id, user_id: otherUserId },
  ]);

  return { conversationId: conversation.id };
}

export async function sendMessage(conversationId: string, content: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  // Verify membership
  const { data: membership } = await supabase
    .from("conversation_members")
    .select("conversation_id")
    .eq("conversation_id", conversationId)
    .eq("user_id", user.id)
    .single();

  if (!membership) return { error: "Not a member of this conversation" };

  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      sender_id: user.id,
      content,
    })
    .select()
    .single();

  if (error) return { error: error.message };

  // Notify other members
  const { data: members } = await supabase
    .from("conversation_members")
    .select("user_id")
    .eq("conversation_id", conversationId)
    .neq("user_id", user.id);

  if (members) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("business_name, full_name")
      .eq("id", user.id)
      .single();

    const senderName = profile?.business_name || profile?.full_name || "Someone";

    await supabase.from("notifications").insert(
      members.map((m) => ({
        user_id: m.user_id,
        type: "new_message",
        title: `New message from ${senderName}`,
        body: content.slice(0, 100),
        data: { conversation_id: conversationId },
      }))
    );
  }

  return { message: data };
}
