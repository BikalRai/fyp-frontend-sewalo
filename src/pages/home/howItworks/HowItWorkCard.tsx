export type LabelType = {
  id: number;
  name: string;
  icon: React.ElementType;
};

export interface IHowItWorkCardProps {
  id: number;
  process: {
    step: string;
    icon: React.ElementType;
  };
  title: string;
  detail: string;
  labels: LabelType[];
  microCopy: string;
}

export interface IHowItWorksCard {
  cardData: IHowItWorkCardProps;
}

const HowItWorkCard = ({ cardData }: IHowItWorksCard) => {
  return (
    <div className='bg-card-bg border border-light-gray flex flex-col p-8 rounded-2xl max-w-sm'>
      {/* number & icon */}
      <div className='flex items-center justify-between mb-6'>
        <p className='text-sm font-medium text-muted'>
          {cardData.process.step}
        </p>
        <div className='bg-primary p-3 rounded-lg text-light'>
          {<cardData.process.icon className='stroke-light w-5 h-5' />}
        </div>
      </div>

      {/* card title */}
      <h1 className='text-lg font-bold mb-4'>{cardData.title}</h1>

      {/* detail */}
      <p className='text-muted text-sm flex-1 mb-6'>{cardData.detail}</p>

      {/* labels */}
      <div className='flex flex-wrap items-center gap-2 mb-6'>
        {cardData.labels.map((label) => (
          <div
            key={label.id}
            className='flex items-center gap-1 py-2 px-3 w-fit rounded-full text-muted text-xs bg-light-gray'
          >
            {<label.icon />}
            {label.name}
          </div>
        ))}
      </div>

      {/* line */}
      <div className='h-0.5 w-full bg-light-gray mb-4'></div>

      {/* microcopy */}
      <div className='text-muted text-xs'>{cardData.microCopy}</div>
    </div>
  );
};

export default HowItWorkCard;
