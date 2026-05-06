import HowItWorks from "@/pages/home/howItworks/HowItWorks";
import SeAppLayout from "@/layouts/SeAppLayout";
import BuiltDifferent from "./built-different/BuiltDifferent";
import Pricing from "./pricing/Pricing";
import Reviews from "./reviews/Reviews";
import Faq from "./faq/Faq";

const Home = () => {
  return (
    <SeAppLayout>
      <HowItWorks />
      <BuiltDifferent />
      <Pricing />
      <Reviews />
      <Faq />
    </SeAppLayout>
  );
};

export default Home;
