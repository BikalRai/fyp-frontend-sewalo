import type { IPricingPlan } from "./MontlyPricing";
import PricingCard from "./PricingCard";

const pricingData: IPricingPlan[] = [
  {
    id: 1,
    name: "Starter",
    subTitle: "For new providers",
    price: null,
    priceLabel: "No credit card needed",
    leadDelivery: "Leads delivered after 15 min",
    ctaLabel: "Get started free",
    features: [
      { label: "Access to all nearby leads", included: true },
      { label: "5 km proximity feed", included: true },
      { label: "Basic provider profile", included: true },
      { label: "Customer ratings & reviews", included: true },
      { label: "Portfolio & photo showcase", included: false },
      { label: "Featured badge on profile", included: false },
      { label: "Analytics dashboard", included: false },
    ],
  },
  {
    id: 2,
    name: "Pro",
    subTitle: "For active providers",
    price: 3899,
    priceLabel: "Billed yearly",
    isPopular: true,
    leadDelivery: "Leads delivered in 5–10 min",
    ctaLabel: "Get started",
    features: [
      { label: "Access to all nearby leads", included: true },
      { label: "5 km proximity feed", included: true },
      { label: "Basic provider profile", included: true },
      { label: "Customer ratings & reviews", included: true },
      { label: "Portfolio & photo showcase", included: true },
      { label: "Featured badge on profile", included: true },
      { label: "Analytics dashboard", included: false },
    ],
  },
  {
    id: 3,
    name: "Business",
    subTitle: "For established providers",
    price: 12299,
    priceLabel: "Billed yearly",
    leadDelivery: "Leads delivered instantly",
    ctaLabel: "Get started",
    features: [
      { label: "Access to all nearby leads", included: true },
      { label: "5 km proximity feed", included: true },
      { label: "Basic provider profile", included: true },
      { label: "Customer ratings & reviews", included: true },
      { label: "Portfolio & photo showcase", included: true },
      { label: "Featured badge on profile", included: true },
      { label: "Analytics dashboard", included: true },
    ],
  },
];

const YearlyPricing = () => {
  return (
    <div className='grid gap-6 md:flex md:flex-wrap md:justify-center lg:grid lg:grid-cols-3'>
      {pricingData.map((data) => (
        <PricingCard key={data.id} cardData={data} />
      ))}
    </div>
  );
};

export default YearlyPricing;
