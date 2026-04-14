import SeSectionHeader from "@/components/heading/SeSectionHeader";
import SeParagraph from "@/components/paragraph/SeParagraph";
import { GoDotFill } from "react-icons/go";

const PricingSectionHeaders = () => {
  return (
    <div className='grid gap-4'>
      <h4 className='text-accent flex items-center justify-center gap-2 text-xs font-semibold'>
        <GoDotFill />
        <span className='uppercase'>simple pricing</span>
      </h4>
      <SeSectionHeader title='Plans for every provider' variant='light' />
      <SeParagraph
        title='Homeowners always post for free. Providers pick a
              monthly plan that fits how actively they want to grow
              their business.'
      />
    </div>
  );
};

export default PricingSectionHeaders;
