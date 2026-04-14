import { GoDotFill } from "react-icons/go";

const HowItWorksHeading = () => {
  return (
    <div className='flex flex-col items-center gap-4'>
      <p className='text-accent font-semibold flex items-center gap-1'>
        <GoDotFill /> Simple by Design
      </p>
      <h1 className='text-primary font-bold text-4xl'>How Sewalo works</h1>
      <p className='text-muted text-center'>
        Two journeys, one platform. Pick your role and see how it works.
      </p>
    </div>
  );
};

export default HowItWorksHeading;
