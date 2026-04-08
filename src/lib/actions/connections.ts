"use server";

import { createClient } from "@/lib/supabase/server";

export async function sendConnectionRequest(receiverId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("connections").insert({
    requester_id: user.id,
    receiver_id: receiverId,
    status: "pending",
  });

  if (error) return { error: error.message };

  // Create notification for receiver
  await supabase.from("notifications").insert({
    user_id: receiverId,
    type: "connection_request",
    title: "New connection request",
    body: "Someone wants to connect with you.",
    data: { from_user_id: user.id },
  });

  return { success: true };
}

export async function acceptConnectionRequest(requesterId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("connections")
    .update({ status: "accepted" })
    .eq("requester_id", requesterId)
    .eq("receiver_id", user.id)
    .eq("status", "pending");

  if (error) return { error: error.message };

  // Notify requester
  await supabase.from("notifications").insert({
    user_id: requesterId,
    type: "connection_accepted",
    title: "Connection accepted",
    body: "Your connection request was accepted.",
    data: { from_user_id: user.id },
  });

  return { success: true };
}

export async function declineConnectionRequest(requesterId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("connections")
    .update({ status: "declined" })
    .eq("requester_id", requesterId)
    .eq("receiver_id", user.id)
    .eq("status", "pending");

  if (error) return { error: error.message };
  return { success: true };
}

export async function removeConnection(otherUserId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("connections")
    .delete()
    .or(
      `and(requester_id.eq.${user.id},receiver_id.eq.${otherUserId}),and(requester_id.eq.${otherUserId},receiver_id.eq.${user.id})`
    )
    .eq("status", "accepted");

  if (error) return { error: error.message };
  return { success: true };
}
