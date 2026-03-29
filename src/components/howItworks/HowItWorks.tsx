import SeContainer from "../container/SeContainer";
import SeContainerPadding from "../container/SeContainerPadding";
import HowItWorksHeading from "./HowItWorksHeading";
import { useState } from "react";
import HomeOwner from "./HomeOwner";
import ServiceProvider from "./ServiceProvider";
import HowItWorkCTA from "./HowItWorkCTA";
import { LuHouse, LuUserCheck } from "react-icons/lu";

const baseClass = `text-sm font-medium flex items-center justify-center gap-2 py-3 px-6 rounded-lg cursor-pointer`;
const activeClass = `bg-primary text-light`;

const HowItWorks = () => {
  const [active, setActive] = useState<string>("home-owner");

  return (
    <SeContainerPadding>
      <SeContainer>
        <section className='pt-25.5 grid gap-12' id='how-it-works'>
          <HowItWorksHeading />
          <div className='flex justify-center items-center gap-6 bg-light w-fit mx-auto p-1.5 rounded-lg'>
            <div
              onClick={() => setActive("home-owner")}
              className={`${baseClass} ${active === "home-owner" ? activeClass : ""}`}
            >
              <LuHouse /> I need help
            </div>
            <div
              onClick={() => setActive("service-provider")}
              className={`${baseClass} ${active === "service-provider" ? activeClass : ""}`}
            >
              <LuUserCheck />
              I'm a provider
            </div>
          </div>

          <div className='relative flex justify-center'>
            <HomeOwner
              className={`transition-all duration-500 ease-out ${active === "home-owner" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-40 pointer-events-none absolute inset-0"}`}
            />

            <ServiceProvider
              className={`transition-all duration-500 ease-out ${active === "service-provider" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-40 pointer-events-none absolute inset-0"}`}
            />
          </div>
          <HowItWorkCTA />
        </section>
      </SeContainer>
    </SeContainerPadding>
  );
};

export default HowItWorks;
