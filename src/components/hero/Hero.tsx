import SeContainer from "../container/SeContainer";
import HeroBanner from "./HeroBanner";
import HeroContent from "./HeroContent";

const Hero = () => {
  return (
    <div className='pt-16 px-6 md:px-7 lg:px-8 xxl:px-0'>
      <SeContainer>
        <div className='grid lg:grid-cols-2 justify-center gap-12 lg:gap-16 py-20 lg:py-28'>
          <HeroContent />
          <HeroBanner />
        </div>
      </SeContainer>
    </div>
  );
};

export default Hero;
