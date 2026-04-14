import SeContainer from "@/components/container/SeContainer";
import SeContainerPadding from "@/components/container/SeContainerPadding";
import PricingSectionHeaders from "./PricingSectionHeaders";
import PricingButtons from "./PricingButtons";
import { useState } from "react";
import HomeOwner from "./HomeOwner";
import MontlyPricing from "./MontlyPricing";

const Pricing = () => {
  const [activeTab, setActiveTab] = useState<string>("monthly");

  return (
    <section className='bg-primary py-25.5'>
      <SeContainer>
        <SeContainerPadding>
          <PricingSectionHeaders />
          <PricingButtons activeTab={activeTab} func={setActiveTab} />
          <HomeOwner />
          <MontlyPricing />
        </SeContainerPadding>
      </SeContainer>
    </section>
  );
};

export default Pricing;
