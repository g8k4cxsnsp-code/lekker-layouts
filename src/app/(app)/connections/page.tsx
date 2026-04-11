import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ConnectionsContent } from "@/components/app/connections-content";

export default async function ConnectionsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Run all queries in parallel
  const [
    { data: pendingReceived },
    { data: pendingSent },
    { data: connectionsAsRequester },
    { data: connectionsAsReceiver },
  ] = await Promise.all([
    supabase
      .from("connections")
      .select(`
        *,
        profiles:requester_id (
          id, username, full_name, business_name, industry, location, logo_url, is_premium
        )
      `)
      .eq("receiver_id", user.id)
      .eq("status", "pending")
      .order("created_at", { ascending: false }),
    supabase
      .from("connections")
      .select(`
        *,
        profiles:receiver_id (
          id, username, full_name, business_name, industry, location, logo_url, is_premium
        )
      `)
      .eq("requester_id", user.id)
      .eq("status", "pending")
      .order("created_at", { ascending: false }),
    supabase
      .from("connections")
      .select(`
        *,
        profiles:receiver_id (
          id, username, full_name, business_name, industry, location, logo_url, is_premium
        )
      `)
      .eq("requester_id", user.id)
      .eq("status", "accepted"),
    supabase
      .from("connections")
      .select(`
        *,
        profiles:requester_id (
          id, username, full_name, business_name, industry, location, logo_url, is_premium
        )
      `)
      .eq("receiver_id", user.id)
      .eq("status", "accepted"),
  ]);

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
