import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { ProductDetailContent } from "./product-detail-content";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <ProductDetailContent product={product} />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
