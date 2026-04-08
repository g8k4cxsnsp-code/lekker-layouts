import { createClient } from "@/lib/supabase/server";
import { DiscoverContent } from "@/components/app/discover-content";

export default async function DiscoverPage() {
  const supabase = await createClient();

  // Fetch profiles, premium first
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, username, full_name, business_name, industry, location, business_description, logo_url, is_premium, is_verified")
    .eq("profile_completed", true)
    .order("is_premium", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(30);

  return <DiscoverContent profiles={profiles || []} />;
}
