// Yoco Checkout API — server-side checkout creation
// Docs: https://developer.yoco.com/guides/online-payments/accepting-a-payment

export interface YocoCheckoutRequest {
  amountInCents: number;
  currency?: string;
  successUrl: string;
  cancelUrl: string;
  failureUrl?: string;
  metadata?: Record<string, string>;
  lineItems?: {
    displayName: string;
    description?: string;
    quantity: number;
    pricingDetails: {
      price: number; // cents
    };
  }[];
}

export interface YocoCheckoutResponse {
  id: string;
  redirectUrl: string;
  status: string;
  amount: number;
  currency: string;
}

export async function createYocoCheckout(
  req: YocoCheckoutRequest
): Promise<YocoCheckoutResponse> {
  const secretKey = process.env.YOCO_SECRET_KEY;
  if (!secretKey) {
    throw new Error("YOCO_SECRET_KEY not configured");
  }

  const response = await fetch("https://payments.yoco.com/api/checkouts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secretKey}`,
    },
    body: JSON.stringify({
      amount: req.amountInCents,
      currency: req.currency || "ZAR",
      successUrl: req.successUrl,
      cancelUrl: req.cancelUrl,
      failureUrl: req.failureUrl || req.cancelUrl,
      metadata: req.metadata,
      lineItems: req.lineItems,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Yoco checkout failed: ${response.status} — ${errorBody}`);
  }

  return response.json();
}
