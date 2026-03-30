import { SITE_CONFIG } from "./constants";

export interface QuestionnaireSubmission {
  orderId: string;
  productSlug: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  responses: Record<string, string | string[]>;
  submittedAt: string;
}

export async function submitQuestionnaire(
  data: QuestionnaireSubmission
): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch(
      `${SITE_CONFIG.n8nWebhookBase}/${data.productSlug}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      return {
        success: false,
        message: "Something went wrong. Please try again or WhatsApp us for help.",
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      message: "Could not connect. Please check your internet and try again, or WhatsApp us for help.",
    };
  }
}
