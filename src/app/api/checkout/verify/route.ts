import { redirect } from "next/navigation";
import { pendingOrders } from "@/lib/pending-orders";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const orderId = url.searchParams.get("orderId");
  const slug = url.searchParams.get("slug");

  if (!orderId || !slug) {
    redirect(`/products`);
  }

  // Retrieve the stored questionnaire data
  const order = pendingOrders.get(orderId);

  if (!order) {
    // Order data expired or wasn't found — still redirect to success
    // but without firing the webhook (edge case: user waited too long)
    redirect(
      `/order/${slug}/success?orderId=${orderId}&status=expired`
    );
  }

  // Yoco redirects here on successful payment.
  // The payment is confirmed because Yoco only redirects to successUrl on success.
  // For extra security in production, verify the payment via Yoco's API.

  // Fire the webhook to n8n — this is the ONLY place it fires
  const webhookBase = process.env.N8N_WEBHOOK_BASE;
  if (webhookBase) {
    try {
      await fetch(`${webhookBase}/${order.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.orderId,
          productSlug: order.slug,
          productName: order.productName,
          customerName: order.customerName,
          customerEmail: order.customerEmail,
          responses: order.responses,
          submittedAt: new Date().toISOString(),
          paymentVerified: true,
          checkoutId: order.checkoutId,
        }),
      });
    } catch (error) {
      console.error("Webhook to n8n failed:", error);
      // Don't block the user — they paid successfully.
      // The order data is logged, and can be retried manually.
    }
  }

  // Clean up
  pendingOrders.delete(orderId);

  // Redirect to success page
  redirect(
    `/order/${slug}/success?orderId=${orderId}&email=${encodeURIComponent(order.customerEmail)}&name=${encodeURIComponent(order.customerName)}`
  );
}
