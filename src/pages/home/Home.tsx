import HowItWorks from "@/pages/home/howItworks/HowItWorks";
import SeAppLayout from "@/layouts/SeAppLayout";
import BuiltDifferent from "./built-different/BuiltDifferent";
import Pricing from "./pricing/Pricing";
import Faq from "./faq/Faq";

const Home = () => {
  return (
    <SeAppLayout>
      <section id="how-it-works">
        <HowItWorks />
      </section>

      <section id="built-different">
        <BuiltDifferent />
      </section>

      <section id="pricing">
        <Pricing />
      </section>

      {/* <section id="reviews">
        <Reviews />
      </section> */}

      <section id="faq">
        <Faq />
      </section>
    </SeAppLayout>
  );
};

export default Home;
