import { GoDotFill } from "react-icons/go";
import SeButton from "../../../components/button/SeButton";
import HeroContentCircle from "./HeroContentCircle";
import { IoMdArrowForward } from "react-icons/io";

const HeroContent = () => {
  return (
    <div className='grid gap-6'>
      <div className='flex bg-accent/20 px-4 rounded-full w-fit tracking-widest'>
        <p className='font-semibold text-accent flex items-center gap-2 text-xs'>
          <span>
            <GoDotFill className='fill-accent' />
          </span>
          Nepal's Smart Service Marketplace
        </p>
      </div>
      <h1 className='font-bold text-light text-4xl md:text-5xl lg:text-6xl leading-tight'>
        <p>Find Trusted</p>
        <span className='text-accent'>Pros. </span>
        <span className='font-normal italic opacity-80'>Unlock leads</span>
      </h1>
      <p className='text-light/70 text-lg leading-relaxed max-w-lg'>
        Sewalo connects homeowners with{" "}
        <strong className='text-light'>verified service providers</strong>{" "}
        through AI-powered lead matching. No commissions — just smart, fair
        introductions
      </p>
      <div className='flex items-center gap-6'>
        <SeButton
          btnText="Post a Job -- It's Free"
          variant='accent'
          icon={<IoMdArrowForward />}
          iconPosition='right'
        />
        <SeButton btnText='Join as a Provider' variant='outlineLight' />
      </div>
      <div className='flex items-center gap-3'>
        <div className='flex -space-x-2'>
          <div className='w-fit h-fit rounded-full'>
            <HeroContentCircle name='RK' color='bg-accent' />
          </div>
          <div className='w-fit h-fit rounded-full'>
            <HeroContentCircle name='SM' color='bg-blue-500' />
          </div>
          <div className='w-fit h-fit rounded-full'>
            <HeroContentCircle name='BP' color='bg-purple-500' />
          </div>
          <div className='w-fit h-fit rounded-full'>
            <HeroContentCircle name='NL' color='bg-orange-500' />
          </div>
          <div className='w-fit h-fit rounded-full'>
            <HeroContentCircle name='DT' color='bg-danger' />
          </div>
        </div>
        <div className='text-light/70 text-sm max-w-3xs'>
          <strong className='text-light'>480+ verified pros</strong> across the
          valley Avg. first response in{" "}
          <strong className='text-light'> {`< 8 minutes`}</strong>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
