import type {
  ISubscriptionPlan,
  SubscriptionTier,
} from "@/types/billing.types";
import { LuCheck, LuZap } from "react-icons/lu";

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
    <div className="mt-12">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Upgrade Your Plan</h2>
        <p className="text-sm text-gray-500 mt-1">
          Get monthly leads included and unlock discounted top-up rates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrentPlan = activeTier === plan.tier;

          return (
            <div
              key={plan.id}
              className={`relative rounded-xl bg-white p-6 border transition-all flex flex-col justify-between ${
                plan.isPopular
                  ? "border-primary shadow-md ring-1 ring-primary"
                  : "border-gray-200"
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-small font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-extrabold text-gray-900">
                    Rs {plan.monthlyPriceRs}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">/month</span>
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <LuCheck
                        size={16}
                        className="text-emerald-500 shrink-0 mt-0.5"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <button
                  disabled={isCurrentPlan}
                  onClick={() => onUpgrade(plan)}
                  className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                    isCurrentPlan
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : plan.isPopular
                        ? "bg-primary text-white hover:bg-primary/90"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  {isCurrentPlan ? (
                    "Current Plan"
                  ) : (
                    <>
                      <LuZap size={16} /> Upgrade to {plan.name}
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionGrid;
