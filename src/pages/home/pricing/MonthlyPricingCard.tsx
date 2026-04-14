import { RxCross2 } from "react-icons/rx";
import type { IPricingPlan } from "./MontlyPricing";
import { LuCheck, LuCircleCheck } from "react-icons/lu";

type CardDataProps = {
  cardData: IPricingPlan;
};

const MonthlyPricingCard = ({ cardData }: CardDataProps) => {
  return (
    <div className='bg-light rounded-2xl p-8 grid gap-5 w-full max-w-90'>
      <div className='grid gap-1'>
        <h3 className='font-bold text-text-dark leading-7'>{cardData.name}</h3>
        <p className='text-xs text-muted leading-4'>{cardData.subTitle}</p>
      </div>
      <div className='grid gap-1'>
        <h2 className='font-extrabold text-3xl leading-9'>
          {cardData.price ? (
            <p>
              Rs. {cardData.price}
              <span className='text-muted text-sm leading-4 font-normal'>
                /month
              </span>
            </p>
          ) : (
            "Free"
          )}
        </h2>
        <p className='text-xs text-muted leading-4'>{cardData.priceLabel}</p>
      </div>
      <div className='flex items-center gap-2 pt-6 border-t border-t-muted/30'>
        <LuCircleCheck className='fill-accent w-4 h-4' />
        <p className='font-semibold text-sm leading-5 text-text-dark'>
          {cardData.leadDelivery}
        </p>
      </div>
      <div className='grid gap-3'>
        {cardData.features.map((feature, i) => (
          <div key={i}>
            <div className='flex items-center gap-2'>
              {feature.included ? (
                <LuCheck className='fill-accent' />
              ) : (
                <RxCross2 className='fill-accent' />
              )}
              <p
                className={`${feature.included ? "text-text-dark" : "text-muted"} text-sm leading-5`}
              >
                {feature.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyPricingCard;
