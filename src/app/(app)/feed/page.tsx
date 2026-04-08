import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { FeedContent } from "@/components/app/feed-content";

export default async function FeedPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Run independent queries in parallel
  const [{ data: posts }, { data: profile }, { data: existingConnections }] =
    await Promise.all([
      supabase
        .from("posts")
        .select(`
          *,
          profiles:user_id (
            id,
            username,
            full_name,
            business_name,
            industry,
            logo_url,
            is_premium
          )
        `)
        .order("created_at", { ascending: false })
        .limit(20),
      supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single(),
      supabase
        .from("connections")
        .select("requester_id, receiver_id")
        .or(`requester_id.eq.${user.id},receiver_id.eq.${user.id}`),
    ]);

  const connectedIds = new Set<string>();
  connectedIds.add(user.id);
  existingConnections?.forEach((c) => {
    connectedIds.add(c.requester_id);
    connectedIds.add(c.receiver_id);
  });

  const { data: suggestedProfiles } = await supabase
    .from("profiles")
    .select("id, username, full_name, business_name, industry, location, is_premium")
    .eq("profile_completed", true)
    .not("id", "in", `(${Array.from(connectedIds).join(",")})`)
    .order("is_premium", { ascending: false })
    .limit(5);

  return (
    <FeedContent
      posts={posts || []}
      currentUserId={user.id}
      profile={profile}
      suggestedProfiles={suggestedProfiles || []}
    />
  );
}
