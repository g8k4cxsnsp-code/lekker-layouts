import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ProfileContent } from "@/components/app/profile-content";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Try to find profile by username first, then by id
  let { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!profile) {
    const { data: profileById } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", username)
      .single();
    profile = profileById;
  }

  if (!profile) notFound();

  const isOwn = user?.id === profile.id;

  // Run posts, connections count, and connection status in parallel
  const [{ data: posts }, { count: connectionsCount }, connectionStatus] = await Promise.all([
    supabase
      .from("posts")
      .select(`
        *,
        profiles:user_id (
          id, username, full_name, business_name, industry, logo_url, is_premium
        )
      `)
      .eq("user_id", profile.id)
      .order("created_at", { ascending: false })
      .limit(20),
    supabase
      .from("connections")
      .select("*", { count: "exact", head: true })
      .eq("status", "accepted")
      .or(`requester_id.eq.${profile.id},receiver_id.eq.${profile.id}`),
    (async (): Promise<"none" | "pending" | "connected"> => {
      if (!user || isOwn) return "none";
      const { data: conn } = await supabase
        .from("connections")
        .select("status")
        .or(
          `and(requester_id.eq.${user.id},receiver_id.eq.${profile.id}),and(requester_id.eq.${profile.id},receiver_id.eq.${user.id})`
        )
        .single();
      if (conn) return conn.status === "accepted" ? "connected" : "pending";
      return "none";
    })(),
  ]);

  return (
    <ProfileContent
      profile={profile}
      posts={posts || []}
      connectionsCount={connectionsCount || 0}
      connectionStatus={connectionStatus}
      isOwn={isOwn}
      currentUserId={user?.id || ""}
    />
  );
}
