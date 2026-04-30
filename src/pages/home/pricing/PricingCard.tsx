import type { IPricingPlan } from "./MontlyPricing";
import { LuCheck } from "react-icons/lu";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import SeButton from "@/components/button/SeButton";

type CardDataProps = {
  cardData: IPricingPlan;
};

const PricingCard = ({ cardData }: CardDataProps) => {
  return (
    <div className='bg-light rounded-2xl p-8 grid gap-5 w-full max-w-120'>
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
        <FaRegCircleCheck className='fill-accent w-4 h-4' />
        <p className='font-semibold text-sm leading-5 text-text-dark'>
          {cardData.leadDelivery}
        </p>
      </div>
      <div className='grid gap-3'>
        {cardData.features.map((feature, i) => (
          <div key={i}>
            <div className='flex items-center gap-2'>
              {feature.included ? (
                <LuCheck className='stroke-accent' />
              ) : (
                <IoMdClose className='fill-muted/60' />
              )}
              <p
                className={`${feature.included ? "text-text-dark" : "text-muted/60"} text-sm leading-5`}
              >
                {feature.label}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div>
        {cardData.isPopular ? (
          <SeButton
            variant='accentLight'
            btnText={cardData.ctaLabel}
            styleClass='w-full'
          />
        ) : (
          <SeButton
            variant='outlineLight'
            btnText={cardData.ctaLabel}
            styleClass='w-full text-text-dark border-muted/40'
          />
        )}
      </div>
    </div>
  );
};

export default PricingCard;
