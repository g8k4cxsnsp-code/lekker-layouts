import { createYocoCheckout } from "@/lib/yoco";
import { products } from "@/data/products";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, customerName, customerEmail, responses, orderId } = body;

    // Validate product exists
    const product = products.find((p) => p.slug === slug);
    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    // Validate required fields
    if (!customerName || !customerEmail || !responses || !orderId) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Store questionnaire data in the checkout metadata
    // We'll pass orderId in metadata so we can retrieve it on success
    const origin = new URL(request.url).origin;

    const checkout = await createYocoCheckout({
      amountInCents: product.price * 100,
      currency: "ZAR",
      successUrl: `${origin}/api/checkout/verify?orderId=${orderId}&slug=${slug}`,
      cancelUrl: `${origin}/order/${slug}?cancelled=true`,
      metadata: {
        orderId,
        slug,
        customerName,
        customerEmail,
        productName: product.name,
      },
      lineItems: [
        {
          displayName: product.name,
          description: product.tagline,
          quantity: 1,
          pricingDetails: {
            price: product.price * 100,
          },
        },
      ],
    });

    // Store questionnaire data temporarily server-side
    // We use a simple in-memory store (fine for MVP — data persists during the payment redirect)
    const { pendingOrders } = await import("@/lib/pending-orders");
    pendingOrders.set(orderId, {
      slug,
      productName: product.name,
      customerName,
      customerEmail,
      responses,
      orderId,
      checkoutId: checkout.id,
      createdAt: new Date().toISOString(),
    });

    return Response.json({
      redirectUrl: checkout.redirectUrl,
      checkoutId: checkout.id,
    });
  } catch (error) {
    console.error("Checkout creation failed:", error);
    return Response.json(
      { error: "Failed to create checkout. Please try again." },
      { status: 500 }
    );
  }
}
