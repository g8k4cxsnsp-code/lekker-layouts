import { Suspense } from "react";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
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
      <Navbar />
      <main className="flex-1">
        <Suspense>
          <OrderFlow product={product} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  return products
    .filter((p) => p.isActive)
    .map((p) => ({ slug: p.slug }));
}
