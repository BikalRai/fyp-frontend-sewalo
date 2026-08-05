import { LuCheck } from "react-icons/lu";
import SeButton from "@/components/button/SeButton";
import type { ISubscriptionPlan } from "@/services/subscription.types";

type PricingCardProps = {
  cardData: ISubscriptionPlan;
  billingCycle: "monthly" | "yearly";
};

const PricingCard = ({ cardData, billingCycle }: PricingCardProps) => {
  // Calculate display price
  const displayPrice =
    billingCycle === "yearly" && cardData.monthlyPriceRs > 0
      ? cardData.monthlyPriceRs * 10 // 2 months free
      : cardData.monthlyPriceRs;

  // Map tier to display metadata
  const tierMeta = {
    FREE: {
      subTitle: "For new providers",
      leadDelivery: "Leads delayed by 5 min",
      ctaLabel: "Get started free",
    },
    PRO: {
      subTitle: "For active providers",
      leadDelivery: "Leads delivered instantly",
      ctaLabel: "Get started",
    },
    BUSINESS: {
      subTitle: "For established providers",
      leadDelivery: "Leads delivered instantly + top placement",
      ctaLabel: "Get started",
    },
  };

  const meta = tierMeta[cardData.tier];

  return (
    <div
      className={`relative rounded-2xl p-8 grid gap-5 w-full backdrop-blur-sm ${
        cardData.isPopular
          ? "bg-white/[0.07] border border-[#39ac86]/30 shadow-[0_0_40px_rgba(57,172,134,0.08)]"
          : "bg-white/[0.03] border border-white/10"
      }`}
    >
      {/* Popular badge */}
      {cardData.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-[#39ac86] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className="grid gap-1">
        <h3 className="font-bold text-white leading-7 text-lg">
          {cardData.name}
        </h3>
        <p className="text-xs text-gray-400 leading-4">{meta.subTitle}</p>
      </div>

      {/* Price */}
      <div className="grid gap-1">
        <h2 className="font-extrabold text-3xl leading-9 text-white">
          {displayPrice === 0 ? (
            "Free"
          ) : (
            <p>
              Rs. {displayPrice.toLocaleString()}
              <span className="text-gray-400 text-sm leading-4 font-normal">
                {billingCycle === "monthly" ? "/month" : "/year"}
              </span>
            </p>
          )}
        </h2>
        <p className="text-xs text-gray-500 leading-4">
          {billingCycle === "yearly" && displayPrice > 0
            ? "Billed yearly (2 months free)"
            : displayPrice === 0
              ? "No credit card needed"
              : "Billed monthly"}
        </p>
      </div>

      {/* Lead delivery */}
      <div className="flex items-center gap-2 pt-6 border-t border-white/10">
        <LuCheck className="text-[#39ac86] w-4 h-4 shrink-0" />
        <p className="font-semibold text-sm leading-5 text-gray-200">
          {meta.leadDelivery}
        </p>
      </div>

      {/* Features */}
      <div className="grid gap-3">
        {cardData.features.map((feature, i) => (
          <div key={i} className="flex items-center gap-2">
            <LuCheck className="text-[#39ac86] w-4 h-4 shrink-0" />
            <p className="text-sm leading-5 text-gray-300">{feature}</p>
          </div>
        ))}
      </div>

      {/* Token info */}
      {cardData.includedTokens > 0 && (
        <div className="p-3 rounded-lg bg-[#39ac86]/10 border border-[#39ac86]/20">
          <p className="text-xs text-[#39ac86] font-semibold">
            {cardData.includedTokens} included leads / month
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">
            Additional leads at Rs {cardData.tokenDiscountPriceRs} each
          </p>
        </div>
      )}

      {/* CTA */}
      <div>
        <SeButton
          variant={cardData.isPopular ? "accentLight" : "outlineLight"}
          btnText={meta.ctaLabel}
          styleClass={`w-full ${
            !cardData.isPopular
              ? "text-white border-white/20 hover:bg-white/10"
              : ""
          }`}
        />
      </div>
    </div>
  );
};

export default PricingCard;
