export interface IPricingLabel {
  Icon: React.ElementType;
  name: string;
}

const PricingLabel = ({ Icon, name }: IPricingLabel) => {
  return (
    <div className='flex items-center gap-2'>
      {<Icon className='w-4 h-4 stroke-accent' />}
      <div className='text-xs text-muted/60'>{name}</div>
    </div>
  );
};

export default PricingLabel;
