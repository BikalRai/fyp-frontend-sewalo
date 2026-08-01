import type {
  IProviderCreditsData,
  SubscriptionTier,
} from "@/types/billing.types";

export interface IEffectiveSubscription {
  effectiveTier: SubscriptionTier;
  isExpired: boolean;
  daysRemaining: number | null;
}

export const getEffectiveSubscription = (
  credits: IProviderCreditsData | undefined,
): IEffectiveSubscription => {
  if (!credits || credits.activeTier === "FREE") {
    return { effectiveTier: "FREE", isExpired: false, daysRemaining: null };
  }

  if (!credits.subscriptionExpiresAt) {
    // Paid tier with no expiry on record — treat as invalid data, fall back safe
    return { effectiveTier: "FREE", isExpired: true, daysRemaining: null };
  }

  const expiry = new Date(credits.subscriptionExpiresAt);
  const now = new Date();
  const msRemaining = expiry.getTime() - now.getTime();
  const isExpired = msRemaining <= 0;

  return {
    effectiveTier: isExpired ? "FREE" : credits.activeTier,
    isExpired,
    daysRemaining: isExpired
      ? 0
      : Math.ceil(msRemaining / (1000 * 60 * 60 * 24)),
  };
};
