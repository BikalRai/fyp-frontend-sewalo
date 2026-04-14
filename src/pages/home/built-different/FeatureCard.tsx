import type { IconType } from "react-icons";

export interface IFeatureCardProps {
  Icon: IconType;
  title: string;
  description: string;
}

const FeatureCard = ({ Icon, title, description }: IFeatureCardProps) => {
  return (
    <div className='py-8 px-7 bg-card-bg border border-muted/20 rounded-2xl gap-4 max-w-150'>
      <div className='w-11 h-11 flex items-center justify-center bg-accent/10 mt-4 rounded-xl'>
        {<Icon className='stroke-accent w-5 h-5' />}
      </div>
      <h3 className='font-semibold text-text-dark leading-6 mt-4'>{title}</h3>
      <p className='text-sm text-muted leading-5 mt-4'>{description}</p>
    </div>
  );
};

export default FeatureCard;
