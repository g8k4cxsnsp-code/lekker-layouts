import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ConnectionsContent } from "@/components/app/connections-content";

export default async function ConnectionsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch pending requests received
  const { data: pendingReceived } = await supabase
    .from("connections")
    .select(`
      *,
      profiles:requester_id (
        id, username, full_name, business_name, industry, location, logo_url, is_premium
      )
    `)
    .eq("receiver_id", user.id)
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  // Fetch pending requests sent
  const { data: pendingSent } = await supabase
    .from("connections")
    .select(`
      *,
      profiles:receiver_id (
        id, username, full_name, business_name, industry, location, logo_url, is_premium
      )
    `)
    .eq("requester_id", user.id)
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  // Fetch accepted connections
  const { data: connectionsAsRequester } = await supabase
    .from("connections")
    .select(`
      *,
      profiles:receiver_id (
        id, username, full_name, business_name, industry, location, logo_url, is_premium
      )
    `)
    .eq("requester_id", user.id)
    .eq("status", "accepted");

  const { data: connectionsAsReceiver } = await supabase
    .from("connections")
    .select(`
      *,
      profiles:requester_id (
        id, username, full_name, business_name, industry, location, logo_url, is_premium
      )
    `)
    .eq("receiver_id", user.id)
    .eq("status", "accepted");

  const accepted = [
    ...(connectionsAsRequester || []),
    ...(connectionsAsReceiver || []),
  ];

  return (
    <ConnectionsContent
      pendingReceived={pendingReceived || []}
      pendingSent={pendingSent || []}
      accepted={accepted}
      currentUserId={user.id}
    />
  );
}
