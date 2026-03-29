import type { IContainerProp } from "@/components/container/SeContainer";
import Hero from "@/components/hero/Hero";
import SeAppNavbar from "@/components/nav/SeAppNavbar";

const SeAppLayout = ({ children }: IContainerProp) => {
  return (
    <div className='overflow-hidden bg-bg min-h-dvh '>
      <header className={`min-h-screen bg-primary`}>
        <SeAppNavbar />
        <Hero />
      </header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
};

export default SeAppLayout;
