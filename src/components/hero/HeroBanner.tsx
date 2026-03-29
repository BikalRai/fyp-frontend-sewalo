import { GoDash, GoDotFill } from "react-icons/go";
import HeroBannerCard from "./HeroBannerCard";
import HeroBannerInfo from "./HeroBannerInfo";

const HeroBanner = () => {
  return (
    <div className='grid gap-6 place-items-center'>
      <div className='flex items-center gap-2 text-sm text-light/60'>
        <span>
          <GoDotFill className='fill-accent animate-pulse' />
        </span>
        <span className='flex items-center gap-2'>
          Live job lead{" "}
          <span>
            <GoDash />
          </span>
          provider view
        </span>
      </div>
      <HeroBannerCard />
      <HeroBannerInfo />
    </div>
  );
};

export default HeroBanner;
