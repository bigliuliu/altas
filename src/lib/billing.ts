import { AtlasBackendApi } from "@/constants/atlas-backend-api";

export default async function performBilling(action: string, amount: number, user_id: string) {
  const billingEndpoint = `${AtlasBackendApi}/wallet/user/billing`;

  try {
    const billingResponse = await fetch(billingEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action, user_id, amount }),
    });

    if (!billingResponse.ok) {
      throw new Error("Failed to process billing");
    }

    const billingResult = await billingResponse.json();
    return billingResult;
  } catch (error) {
    console.error("Billing error:", error);
    return { status: 400, message: "Billing failed" };
  }
}
