import {
  LuClock4,
  LuCreditCard,
  LuLock,
  LuShieldCheck,
  LuUserCheck,
} from "react-icons/lu";
import type { IHowItWorkCardProps } from "./HowItWorkCard";
import { IoChatbubbleOutline, IoLocationOutline } from "react-icons/io5";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { PiHandCoins } from "react-icons/pi";
import HowItWorkCard from "./HowItWorkCard";
import type { IClassName } from "./HomeOwner";

const serviceProviderCardData: IHowItWorkCardProps[] = [
  {
    id: 1,
    process: {
      step: "01",
      icon: LuUserCheck,
    },
    title: "Register & get verified",
    detail: `Create your provider profile and submit your credentials. Our team verifies your certifications within 24 hours — then you're live.`,
    labels: [
      { id: 1, name: "ID check", icon: LuCreditCard },
      { id: 2, name: "Certification", icon: LuShieldCheck },
      { id: 3, name: "24hr turnaround", icon: LuClock4 },
    ],
    microCopy: "One-time verification process",
  },
  {
    id: 2,
    process: {
      step: "02",
      icon: LuClock4,
    },
    title: "Browse leads near you",
    detail: `See real jobs within 5 km — each showing the category, AI-graded complexity, and price estimate before you spend a rupee.`,
    labels: [
      { id: 1, name: "5 km radius", icon: IoLocationOutline },
      { id: 2, name: "AI-graded tiers", icon: HiOutlineLightningBolt },
      { id: 3, name: "Price shown upfront", icon: HiOutlineLightningBolt },
    ],
    microCopy: "Real jobs, high intent",
  },
  {
    id: 3,
    process: {
      step: "03",
      icon: LuLock,
    },
    title: "Unlock, quote & win",
    detail: `Pay a small flat fee to unlock the customer's contact, send your quote directly, and negotiate your way. You keep every rupee you earn.`,
    labels: [
      { id: 1, name: "Flat unlock fee", icon: PiHandCoins },
      { id: 2, name: "Direct contac", icon: IoChatbubbleOutline },
      { id: 3, name: "Keep 100%", icon: PiHandCoins },
    ],
    microCopy: "No monthly subscription",
  },
];

const ServiceProvider = ({ className }: IClassName) => {
  return (
    <div
      className={`grid md:flex md:flex-wrap md:justify-center lg:grid-cols-3 gap-6 ${className}`}
    >
      {serviceProviderCardData.map((data: IHowItWorkCardProps) => (
        <HowItWorkCard key={data.id} cardData={data} />
      ))}
    </div>
  );
};

export default ServiceProvider;
