import { api } from "@/config/api";
import type {
  IEsewaInitiateResponse,
  IEsewaVerifyResponse,
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

export const initiateEsewaPayment = async (
  amount: number,
  purchaseType: PurchaseType,
): Promise<IEsewaInitiateResponse> => {
  const { data } = await api.post("/billing/esewa/initiate", {
    amount,
    purchaseType,
  });
  return data.data;
};

export const verifyEsewaPayment = async (
  refId: string,
): Promise<IEsewaVerifyResponse> => {
  // Matches your Spring Boot GET mapping
  const { data } = await api.get(`/billing/esewa/verify?refId=${refId}`);
  return data.data;
};
