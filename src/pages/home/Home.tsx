import HowItWorks from "@/pages/home/howItworks/HowItWorks";
import SeAppLayout from "@/layouts/SeAppLayout";
import BuiltDifferent from "./built-different/BuiltDifferent";
import Pricing from "./pricing/Pricing";

const Home = () => {
  return (
    <SeAppLayout>
      <HowItWorks />
      <BuiltDifferent />
      <Pricing />
    </SeAppLayout>
  );
};

export default Home;
