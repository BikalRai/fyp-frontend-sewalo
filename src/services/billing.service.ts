import { api } from "@/config/api";
import type {
  IInitiatePaymentData,
  IProviderCreditsData,
  IVerifyPaymentData,
  PurchaseType,
} from "@/types/billing.types";

export const getProviderCredits = async (): Promise<IProviderCreditsData> => {
  const { data } = await api.get("/providers/me/credits");
  return data.data;
};

export const initiateCreditPayment = async (
  creditsRequested: number = 0,
  purchaseType: PurchaseType = "TOKEN_TOP_UP",
): Promise<IInitiatePaymentData> => {
  const { data } = await api.post(
    `/credits/initiate?creditsRequested=${creditsRequested}&purchaseType=${purchaseType}`,
  );
  return data.data;
};

export const verifyCreditPayment = async (
  pidx: string,
): Promise<IVerifyPaymentData> => {
  const { data } = await api.post(`/credits/verify?pidx=${pidx}`);
  return data.data;
};
