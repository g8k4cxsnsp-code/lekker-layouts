import { createClient } from "@/lib/supabase/server";
import { TemplatesGated } from "./templates-gated";
import { TemplatesAuthenticated } from "./templates-authenticated";

export default async function TemplatesPage() {
  let user = null;
  let profile = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;

    if (user) {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("business_name, full_name, industry, logo_url")
        .eq("id", user.id)
        .single();
      profile = profileData;
    }
  } catch {
    // If Supabase is not configured, show gated view
  }

  if (user && profile) {
    return <TemplatesAuthenticated profile={profile} />;
  }

  return <TemplatesGated />;
}
