import { heroImg } from "@/uitls/images";
import SeContainer from "../../../components/container/SeContainer";
import HeroBanner from "./HeroBanner";
import HeroContent from "./HeroContent";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* ===== IMAGE BACKGROUND (replace src with your image) ===== */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Hero image"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay so image doesn't fight the content */}
        <div className="absolute inset-0 bg-[#0a1525]/50" />
      </div>

      {/* ===== GRADIENT OVERLAY LAYERS ===== */}
      {/* Layer 1: Deep solid base */}
      <div className="absolute inset-0 bg-[#0a1525]/40" />

      {/* Layer 2: Warm diagonal sweep */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#152232]/60 via-[#111d2e]/50 to-[#0a1525]/80" />

      {/* Layer 3: Soft radial center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(25,53,87,0.20)_0%,transparent_55%)]" />

      {/* Layer 4: Top-left warmth — accent green */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#39ac86]/8 rounded-full blur-[150px]" />

      {/* Layer 5: Bottom-right — pure dark shadow */}
      <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] bg-[#070f1a]/90 rounded-full blur-[140px]" />

      {/* Layer 6: Center orb — muted warm gray */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#1a2535]/30 rounded-full blur-[130px]" />

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 pt-16 px-6 md:px-7 lg:px-8 xxl:px-0">
        <SeContainer>
          <div className="grid lg:grid-cols-2 justify-center gap-12 lg:gap-16 py-20 lg:py-28 items-center">
            <HeroContent />
            <HeroBanner />
          </div>
        </SeContainer>
      </div>
    </div>
  );
};

export default Hero;
