import SeContainer from "@/components/container/SeContainer";
import SeContainerPadding from "@/components/container/SeContainerPadding";
import PricingSectionHeaders from "./PricingSectionHeaders";
import PricingButtons from "./PricingButtons";
import { useState } from "react";
import HomeOwner from "./HomeOwner";
import PricingLabels from "./PricingLabels";
import MonthlyPricing from "./MontlyPricing";
import YearlyPricing from "./YearlyPricing";
import { gridSubscribe } from "@/uitls/images";

const Pricing = () => {
  const [activeTab, setActiveTab] = useState<string>("monthly");

  return (
    <section className="relative overflow-hidden">
      {/* ===== IMAGE BACKGROUND (replace src with your image) ===== */}
      <div className="absolute inset-0">
        <img
          src={gridSubscribe}
          alt="Subscription background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay so image doesn't fight the content */}
        <div className="absolute inset-0 bg-[#0a1525]/80" />
      </div>

      {/* ===== GRADIENT OVERLAY LAYERS (same family as Hero) ===== */}
      {/* Layer 1: Deep solid base */}
      <div className="absolute inset-0 bg-[#0a1525]/30" />

      {/* Layer 2: Warm diagonal sweep */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#152232]/50 via-[#111d2e]/40 to-[#0a1525]/70" />

      {/* Layer 3: Soft radial center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(25,53,87,0.25)_0%,transparent_60%)]" />

      {/* Layer 4: Top-left warmth — accent green */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#39ac86]/6 rounded-full blur-[150px]" />

      {/* Layer 5: Bottom-right — pure dark shadow */}
      <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] bg-[#070f1a]/90 rounded-full blur-[140px]" />

      {/* Layer 6: Center orb — muted warm gray */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#1a2535]/25 rounded-full blur-[130px]" />

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 py-20 lg:py-28">
        <SeContainer>
          <SeContainerPadding>
            <div className="grid gap-12">
              <PricingSectionHeaders />
              <PricingButtons activeTab={activeTab} func={setActiveTab} />
              <HomeOwner />
              <div>
                <div className={activeTab === "yearly" ? "hidden" : "block"}>
                  <MonthlyPricing />
                </div>
                <div className={activeTab === "monthly" ? "hidden" : "block"}>
                  <YearlyPricing />
                </div>
              </div>
              <hr className="border-white/10" />
              <PricingLabels />
            </div>
          </SeContainerPadding>
        </SeContainer>
      </div>
    </section>
  );
};

export default Pricing;
