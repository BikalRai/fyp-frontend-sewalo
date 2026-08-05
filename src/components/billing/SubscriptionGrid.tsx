import type {
  ISubscriptionPlan,
  SubscriptionTier,
} from "@/types/billing.types";
import { LuCheck, LuZap } from "react-icons/lu";

const TIER_RANK: Record<SubscriptionTier, number> = {
  FREE: 0,
  PRO: 1,
  BUSINESS: 2,
};

interface SubscriptionGridProps {
  plans: ISubscriptionPlan[];
  activeTier: SubscriptionTier;
  onUpgrade: (plan: ISubscriptionPlan) => void;
}

const SubscriptionGrid = ({
  plans,
  activeTier,
  onUpgrade,
}: SubscriptionGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
      {plans.map((plan) => {
        const currentRank = TIER_RANK[activeTier];
        const planRank = TIER_RANK[plan.tier];
        const isCurrentPlan = planRank === currentRank;
        const isLowerTier = planRank < currentRank;

        return (
          <div
            key={plan.id}
            className={`bg-card-bg rounded-2xl p-6 flex flex-col transition-all duration-300 ${
              plan.isPopular
                ? "border-2 border-primary shadow-[0_4px_20px_rgba(25,53,87,0.12)] relative overflow-hidden hover:shadow-[0_8px_32px_rgba(25,53,87,0.18)] md:-mt-2"
                : "border border-light-gray shadow-[0_2px_12px_rgba(25,53,87,0.04)] hover:shadow-[0_8px_24px_rgba(25,53,87,0.08)]"
            }`}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-primary text-white text-small font-bold px-3.5 py-1.5 rounded-bl-xl tracking-wider uppercase">
                Most Popular
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-text-dark">{plan.name}</h3>
              {isCurrentPlan && (
                <span className="text-small font-bold text-muted bg-card-label px-2.5 py-1 rounded-lg uppercase tracking-wider">
                  Current
                </span>
              )}
            </div>

            <div className="mb-5">
              <span
                className={`text-3xl font-bold ${
                  plan.isPopular ? "text-primary" : "text-text-dark"
                }`}
              >
                Rs {plan.monthlyPriceRs.toLocaleString()}
              </span>
              <span className="text-xs text-muted ml-1">/month</span>
            </div>

            <ul className="space-y-3 mb-6 flex-1">
              {plan.features.map((feature, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-2.5 text-xs ${
                    isCurrentPlan ? "text-muted" : "text-text-dark font-medium"
                  }`}
                >
                  <LuCheck
                    size={14}
                    strokeWidth={2.5}
                    className="text-accent shrink-0 mt-0.5"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              {isLowerTier ? (
                <p className="text-center text-xs text-muted py-2.5">
                  Included in your current plan
                </p>
              ) : (
                <button
                  disabled={isCurrentPlan}
                  onClick={() => onUpgrade(plan)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                    isCurrentPlan
                      ? "border-2 border-light-gray text-muted cursor-default"
                      : plan.isPopular
                        ? "bg-primary hover:bg-[#122742] text-white shadow-[0_4px_12px_rgba(25,53,87,0.3)] hover:shadow-[0_6px_16px_rgba(25,53,87,0.4)] hover:-translate-y-0.5 active:translate-y-0"
                        : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                  }`}
                >
                  {isCurrentPlan ? (
                    "Active Plan"
                  ) : (
                    <>
                      <LuZap size={14} strokeWidth={2.5} />
                      Upgrade to {plan.name}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubscriptionGrid;
