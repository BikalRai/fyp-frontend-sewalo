import SeContainer from "@/components/container/SeContainer";
import SeContainerPadding from "@/components/container/SeContainerPadding";
import PricingSectionHeaders from "./PricingSectionHeaders";
import PricingButtons from "./PricingButtons";
import { useState } from "react";
import HomeOwner from "./HomeOwner";
import MontlyPricing from "./MontlyPricing";
import YearlyPricing from "./YearlyPricing";
import PricingLabels from "./PricingLabels";

const Pricing = () => {
  const [activeTab, setActiveTab] = useState<string>("monthly");

  return (
    <section className='bg-primary py-25.5'>
      <SeContainer>
        <SeContainerPadding>
          <div className='grid gap-12'>
            <PricingSectionHeaders />
            <PricingButtons activeTab={activeTab} func={setActiveTab} />
            <HomeOwner />
            <div>
              <div className={activeTab === "yearly" ? "hidden" : "block"}>
                <MontlyPricing />
              </div>
              <div className={activeTab === "monthly" ? "hidden" : "block"}>
                <YearlyPricing />
              </div>
            </div>
            <hr className='border-light-gray/20' />
            <PricingLabels />
          </div>
        </SeContainerPadding>
      </SeContainer>
    </section>
  );
};

export default Pricing;
