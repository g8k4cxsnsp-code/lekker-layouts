import { Suspense } from "react";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { OrderFlow } from "./order-flow";

interface OrderPageProps {
  params: Promise<{ slug: string }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug && p.isActive);

  if (!product) {
    notFound();
  }

  return (
    <>
      <>
        <Suspense>
          <OrderFlow product={product} />
        </Suspense>
      </>
    </>
  );
}

export async function generateStaticParams() {
  return products
    .filter((p) => p.isActive)
    .map((p) => ({ slug: p.slug }));
}
