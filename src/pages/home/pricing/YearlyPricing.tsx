import { SUBSCRIPTION_PLANS } from "@/services/subscription.types";
import PricingCard from "./PricingCard";

const YearlyPricing = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {SUBSCRIPTION_PLANS.map((plan) => (
        <PricingCard key={plan.id} cardData={plan} billingCycle="yearly" />
      ))}
    </div>
  );
};

export default YearlyPricing;
