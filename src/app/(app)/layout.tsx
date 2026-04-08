import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/app/app-shell";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Check if profile is completed
  const { data: profile } = await supabase
    .from("profiles")
    .select("profile_completed, full_name")
    .eq("id", user.id)
    .single();

  // If no profile or not completed, redirect to setup (except if already on setup page)
  if (!profile?.profile_completed) {
    const headerList = await headers();
    const pathname = headerList.get("x-pathname") || "";
    if (!pathname.startsWith("/profile/setup")) {
      redirect("/profile/setup");
    }
  }

  return (
    <AppShell userName={profile?.full_name || user.email || ""}>
      {children}
    </AppShell>
  );
}
