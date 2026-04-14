import SeContainer from "@/components/container/SeContainer";
import SeSectionHeader from "@/components/heading/SeSectionHeader";
import SeParagraph from "@/components/paragraph/SeParagraph";
import { IoChatboxOutline, IoLocationOutline } from "react-icons/io5";
import { LuBrain, LuLock } from "react-icons/lu";
import FeatureCard from "./FeatureCard";

const cardData = [
  {
    id: 1,
    icon: LuBrain,
    title: "AI Job Categorization",
    description: `Multimodal AI analyzes photos and descriptions to auto-
    classify job complexity into Micro, Medium, or Major tiers.`,
  },
  {
    id: 1,
    icon: IoLocationOutline,
    title: "5km Proximity Matching",
    description: `Find nearby professionals within a 5km radius for faster
    response times and local expertise.`,
  },
  {
    id: 3,
    icon: LuLock,
    title: "Lead-Unlock System",
    description: `Providers pay a small fee to unlock leads — no transaction
    commissions. Fair pricing, zero leakage.`,
  },
  {
    id: 4,
    icon: IoChatboxOutline,
    title: "Direct Communication ",
    description: `Chat directly with service providers. Negotiate project-
    based pricing that suits Nepal's bargaining culture.`,
  },
];

const BuiltDifferent = () => {
  return (
    <section className='bg-light'>
      <SeContainer>
        <div className='py-25.5 px-6 md:px-8 lg:px-0'>
          {/* section heading and description */}
          <div className='grid gap-4'>
            <SeSectionHeader title='Built Different' />
            <SeParagraph
              title="Designed for Nepal's service economy, powered by modern
              technology"
            />
          </div>

          {/* feature cards */}
          <div className='flex items-center justify-center mt-16'>
            <div className='grid md:grid-cols-2 gap-6 align-middle'>
              {cardData.map((data) => (
                <FeatureCard
                  key={data.id}
                  Icon={data.icon}
                  title={data.title}
                  description={data.description}
                />
              ))}
            </div>
          </div>
        </div>
      </SeContainer>
    </section>
  );
};

export default BuiltDifferent;
