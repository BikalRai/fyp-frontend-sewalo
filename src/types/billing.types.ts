import type { APIResponse } from "./api.types";

/**
 * Payload inside APIResponse for GET /credits (or /credits/provider)
 * Maps to your ProviderCredits entity.
 */
export interface IProviderCreditsData {
  providerId: string;
  balance: number;
}

/**
 * Payload inside APIResponse for POST /credits/initiate
 * Uses snake_case to perfectly match what Khalti's v2 API and your backend returns.
 */
export interface IInitiatePaymentData {
  payment_url: string;
  pidx: string;
}

/**
 * Payload inside APIResponse for POST /credits/verify
 * Maps Khalti's lookup response so you can definitively verify success on the frontend.
 */
export interface IVerifyPaymentData {
  pidx: string;
  status:
    | "Completed"
    | "Pending"
    | "Initiated"
    | "Refunded"
    | "Expired"
    | "User canceled"
    | "Partially Refunded";
  transaction_id: string | null;
  total_amount: number;
  fee: number;
  refunded: boolean;
}

// ==========================================
// 2. Convenience Type Aliases (The Envelopes)
// ==========================================

/**
 * These aliases wrap the specific payloads inside your global APIResponse<T>
 * so you don't have to type APIResponse<IProviderCreditsData> every time in your hooks.
 */
export type GetCreditsResponse = APIResponse<IProviderCreditsData>;
export type InitiatePaymentResponse = APIResponse<IInitiatePaymentData>;
export type VerifyPaymentResponse = APIResponse<IVerifyPaymentData | null>;

// ==========================================
// 3. Subscription & UI State Types
// ==========================================

export type SubscriptionTier = "FREE" | "PRO" | "BUSINESS";

/**
 * Defines the static configuration for your frontend pricing grid.
 * This is decoupled from the backend so you can iterate on pricing UI rapidly.
 */
export interface ISubscriptionPlan {
  id: string;
  tier: SubscriptionTier;
  name: string;
  monthlyPriceRs: number;
  includedTokens: number;
  tokenDiscountPriceRs: number;
  features: string[];
  isPopular?: boolean;
}

export type PurchaseType =
  | "TOKEN_TOP_UP"
  | "SUBSCRIPTION_PRO"
  | "SUBSCRIPTION_BUSINESS";

export interface InitiatePaymentParams {
  creditsRequested?: number;
  purchaseType: PurchaseType;
}
