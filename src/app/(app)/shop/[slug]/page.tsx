import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { products } from "@/data/products";
import { OrderContent } from "@/components/app/order-content";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, profile_completed, is_premium")
    .eq("id", user.id)
    .single();

  if (!profile?.profile_completed) {
    redirect("/profile/setup");
  }

  // Calculate price with premium discount
  const isPremium = profile.is_premium || false;
  const discount = isPremium ? 0.15 : 0;
  const finalPrice = Math.round(product.price * (1 - discount));

  return (
    <OrderContent
      product={product}
      profile={profile}
      isPremium={isPremium}
      discount={discount}
      finalPrice={finalPrice}
    />
  );
}
