// In-memory store for pending orders (between checkout creation and payment verification)
// This is fine for MVP on Vercel — the serverless function that creates the checkout
// is likely the same one that handles the verify callback within the same deployment.
//
// For production scale: use Vercel KV, Upstash Redis, or a database.

export interface PendingOrder {
  slug: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  responses: Record<string, string | string[]>;
  orderId: string;
  checkoutId: string;
  createdAt: string;
}

// Global store — survives across requests in the same serverless instance
const store = new Map<string, PendingOrder>();

// Auto-expire entries after 1 hour to prevent memory leaks
const EXPIRY_MS = 60 * 60 * 1000;

export const pendingOrders = {
  set(orderId: string, data: PendingOrder) {
    store.set(orderId, data);
    // Auto-cleanup after expiry
    setTimeout(() => store.delete(orderId), EXPIRY_MS);
  },

  get(orderId: string): PendingOrder | undefined {
    return store.get(orderId);
  },

  delete(orderId: string) {
    store.delete(orderId);
  },
};
