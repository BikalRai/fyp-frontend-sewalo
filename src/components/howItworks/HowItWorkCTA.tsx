import { IoMdArrowForward } from "react-icons/io";
import SeButton from "../button/SeButton";
import SeContainerSM from "../container/SeContainerSM";

const HowItWorkCTA = () => {
  return (
    <SeContainerSM>
      <div className='grid md:flex md:items-center justify-between gap-9 bg-light rounded-2xl px-8 py-11 border border-light'>
        <div className='flex-1 flex items-center justify-center gap-6 md:border-r-2 md:border-r-light-gray'>
          <div>
            <h2 className='font-bold text-text-dark'>Ready to find help?</h2>
            <p className='text-sm text-muted'>
              Post your first job in under 2 minutes — free.
            </p>
          </div>
          <SeButton
            btnText='Post a Job'
            variant='accentLight'
            icon={<IoMdArrowForward />}
            iconPosition='right'
          />
        </div>

        <div className='flex-1 flex items-center justify-center gap-6'>
          <div>
            <h2 className='font-bold text-text-dark'>Ready to find work?</h2>
            <p className='text-sm text-muted'>
              Join 480+ verified pros already on the platform.
            </p>
          </div>
          <SeButton
            btnText='Register as a pro'
            icon={<IoMdArrowForward />}
            iconPosition='right'
          />
        </div>
      </div>
    </SeContainerSM>
  );
};

export default HowItWorkCTA;
