import MonthlyPricingCard from "./MonthlyPricingCard";

export interface IPricingPlan {
  id: number;
  name: string;
  subTitle: string;
  price: null | number;
  priceLabel: string;
  leadDelivery: string;
  isPopular?: boolean;
  ctaLabel: string;
  features: IPricingFeature[];
}

export interface IPricingFeature {
  label: string;
  included: boolean;
}

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
    price: 399,
    priceLabel: "Billed monthly",
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
    id: 2,
    name: "Business",
    subTitle: "For established providers",
    price: 799,
    priceLabel: "Billed monthly",
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

const MontlyPricing = () => {
  return (
    <div className='grid lg:grid-cols-3 gap-6'>
      {pricingData.map((data) => (
        <MonthlyPricingCard key={data.id} cardData={data} />
      ))}
    </div>
  );
};

export default MontlyPricing;
