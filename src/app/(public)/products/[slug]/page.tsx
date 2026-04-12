import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { ProductDetailContent } from "./product-detail-content";

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
      <ProductDetailContent product={product} />
    </>
  );
}
