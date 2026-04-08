import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { products } from "@/data/products";
import { AppProductsContent } from "@/components/app/app-products-content";

export default async function AppProductsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_premium")
    .eq("id", user.id)
    .single();

  return (
    <AppProductsContent
      products={products}
      isPremium={profile?.is_premium || false}
    />
  );
}
