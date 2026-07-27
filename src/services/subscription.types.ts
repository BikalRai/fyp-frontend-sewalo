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
    tier: "FREE",
    name: "Pay As You Go",
    monthlyPriceRs: 0,
    includedTokens: 0,
    tokenDiscountPriceRs: 45,
    features: [
      "Standard lead visibility",
      "Pay Rs 45 per unlocked lead",
      "Basic support",
    ],
  },
  {
    id: "plan_pro",
    tier: "PRO",
    name: "Pro Partner",
    monthlyPriceRs: 500,
    includedTokens: 15, // Value: Rs 675
    tokenDiscountPriceRs: 35,
    features: [
      "15 included leads / month",
      "Discounted leads (Rs 35/ea)",
      "Pro Profile Badge",
      "Priority customer support",
    ],
    isPopular: true,
  },
  {
    id: "plan_biz",
    tier: "BUSINESS",
    name: "Verified Business",
    monthlyPriceRs: 1500,
    includedTokens: 50, // Value: Rs 2,250
    tokenDiscountPriceRs: 25,
    features: [
      "50 included leads / month",
      "Lowest lead price (Rs 25/ea)",
      "Verified Business Badge",
      "Top placement in search results",
    ],
  },
];
