import HowItWorkCard, { type IHowItWorkCardProps } from "./HowItWorkCard";
import { LuClipboardList, LuUsers } from "react-icons/lu";
import {
  IoCameraOutline,
  IoChatbubbleOutline,
  IoLocationOutline,
  IoShieldCheckmarkOutline,
  IoStarOutline,
} from "react-icons/io5";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { PiHandCoins } from "react-icons/pi";

export interface IClassName {
  className?: string;
}

const homeOwnerCardData: IHowItWorkCardProps[] = [
  {
    id: 1,
    process: {
      step: "01",
      icon: LuClipboardList,
    },
    title: "Describe your job",
    detail: `Write what needs fixing and upload a
        photo. Our AI reads both to instantly
        grade the job's complexity — no
        guessing, no back-and-forth.`,
    labels: [
      { id: 1, name: "Photo upload", icon: IoCameraOutline },
      { id: 2, name: "AI grading", icon: HiOutlineLightningBolt },
      { id: 3, name: "Instant", icon: HiOutlineLightningBolt },
    ],
    microCopy: "Takes less than 2 minutes",
  },
  {
    id: 2,
    process: {
      step: "02",
      icon: LuUsers,
    },
    title: "Get up to 3 quotes",
    detail: `Only verified pros within 5 km can
        respond. The Rule of Three caps
        responses at 3 — so you get quality over
        quantity, every time.`,
    labels: [
      { id: 1, name: "5 km only", icon: IoLocationOutline },
      { id: 2, name: "Verified pros", icon: IoShieldCheckmarkOutline },
      { id: 3, name: "Max 3 responses", icon: LuUsers },
    ],
    microCopy: "Avg. first response < 8 min",
  },
  {
    id: 3,
    process: {
      step: "03",
      icon: IoMdCheckmarkCircleOutline,
    },
    title: "Choose & get it done",
    detail: `Compare quotes, pick your pro, and pay
        them directly. Sewalo never takes a cut
        — what you agree is exactly what you
        pay.`,
    labels: [
      { id: 1, name: "Zero commission", icon: PiHandCoins },
      { id: 2, name: "Direct payment", icon: IoChatbubbleOutline },
      { id: 3, name: "Rate your pro", icon: IoStarOutline },
    ],
    microCopy: "100% transparent pricing",
  },
];

const HomeOwner = ({ className }: IClassName) => {
  return (
    <div
      className={`grid md:flex md:flex-wrap md:justify-center lg:grid-cols-3 gap-6 ${className}`}
    >
      {homeOwnerCardData.map((data: IHowItWorkCardProps) => (
        <HowItWorkCard key={data.id} cardData={data} />
      ))}
    </div>
  );
};

export default HomeOwner;
