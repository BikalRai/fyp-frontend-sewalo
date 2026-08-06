import type { IContainerProp } from "@/components/container/SeContainer";
import Hero from "@/pages/home/hero/Hero";
import SeAppNavbar from "@/components/nav/SeAppNavbar";
import SeFooter from "@/components/footer/SeFooter";
import { useState } from "react";

const SeAppLayout = ({ children }: IContainerProp) => {
  const [activeLink, setActiveLink] = useState<string>("/");
  return (
    <div className="bg-bg min-h-dvh">
      <header>
        <SeAppNavbar activeLink={activeLink} setActiveLink={setActiveLink} />
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
