// src/data/subscriptionPlans.ts

export type SubscriptionTier = "FREE" | "PRO" | "BUSINESS";

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

export const SUBSCRIPTION_PLANS: ISubscriptionPlan[] = [
  {
    id: "plan_free",
    name: "Pay As You Go",
    tier: "FREE",
    monthlyPriceRs: 0,
    isPopular: false,
    includedTokens: 0, // Added
    tokenDiscountPriceRs: 45, // Added
    features: [
      "Standard lead visibility",
      "Leads delayed by 5 minutes",
      "Pay Rs 45 per unlocked lead",
      "Basic support",
    ],
  },
  {
    id: "plan_pro",
    name: "Pro Partner",
    tier: "PRO",
    monthlyPriceRs: 500,
    isPopular: true,
    includedTokens: 15, // Added
    tokenDiscountPriceRs: 35, // Added
    features: [
      "15 included leads / month",
      "Instant lead notifications",
      "Discounted leads (Rs 35/ea)",
      "Pro Profile Badge",
    ],
  },
  {
    id: "plan_business",
    name: "Verified Business",
    tier: "BUSINESS",
    monthlyPriceRs: 1500,
    isPopular: false,
    includedTokens: 50, // Added
    tokenDiscountPriceRs: 25, // Added
    features: [
      "50 included leads / month",
      "Instant lead notifications",
      "Lowest lead price (Rs 25/ea)",
      "Top placement in search results",
      "Verified Business Badge",
    ],
  },
];
