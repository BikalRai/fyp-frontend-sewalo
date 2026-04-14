import SeButton from "@/components/button/SeButton";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { LuArrowRight } from "react-icons/lu";

const HomeOwner = () => {
  return (
    <div className='bg-accent/10 rounded-xl p-5 flex items-center justify-between gap-4 flex-wrap'>
      <div className='flex items-center gap-3'>
        <IoMdCheckmarkCircleOutline className='fill-accent w-5 h-5' />
        <div>
          <h4 className='text-sm font-semibold leading-5 text-light'>
            Homeowners — always free
          </h4>
          <p className='text-muted text-xs'>
            Post jobs, receive quotes, and pay your pro directly. No fees, ever.
          </p>
        </div>
      </div>
      <div className='mx-auto md:mx-0'>
        <SeButton
          btnText='Post a job free'
          variant='accentLight'
          iconPosition='right'
          icon={<LuArrowRight />}
        />
      </div>
    </div>
  );
};

export default HomeOwner;
