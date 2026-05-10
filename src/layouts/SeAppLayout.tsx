import type { IContainerProp } from "@/components/container/SeContainer";
import Hero from "@/pages/home/hero/Hero";
import SeAppNavbar from "@/components/nav/SeAppNavbar";
import SeFooter from "@/components/footer/SeFooter";

const SeAppLayout = ({ children }: IContainerProp) => {
  return (
    <div className="overflow-hidden bg-bg min-h-dvh ">
      <header className={`min-h-screen bg-primary`}>
        <SeAppNavbar />
        <Hero />
      </header>
      <main>{children}</main>
      <footer className="bg-primary">
        <SeFooter />
      </footer>
    </div>
  );
};

export default SeAppLayout;
