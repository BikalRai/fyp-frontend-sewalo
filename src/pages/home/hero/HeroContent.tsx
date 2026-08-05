import { GoDotFill } from "react-icons/go";
import SeButton from "../../../components/button/SeButton";
import { IoMdArrowForward } from "react-icons/io";

const HeroContent = () => {
  return (
    <div className="grid gap-6 relative z-10">
      <div className="flex bg-accent/15 px-4 py-1.5 rounded-full w-fit tracking-widest border border-accent/20 backdrop-blur-sm">
        <p className="font-semibold text-accent flex items-center gap-2 text-xs">
          <GoDotFill className="fill-accent" />
          Nepal's Smart Service Marketplace
        </p>
      </div>

      <h1 className="font-bold text-light text-4xl md:text-5xl lg:text-6xl leading-tight">
        <p>Find Trusted</p>
        <span className="text-accent">Pros. </span>
        <span className="font-normal italic opacity-80">Unlock leads</span>
      </h1>

      <p className="text-light/70 text-lg leading-relaxed max-w-lg">
        Sewalo connects homeowners with{" "}
        <strong className="text-light">verified service providers</strong>{" "}
        through AI-powered lead matching. No commissions — just smart, fair
        introductions
      </p>

      <div className="flex items-center gap-4 flex-wrap">
        <SeButton
          btnText="Post a Job — It's Free"
          variant="accent"
          icon={<IoMdArrowForward />}
          iconPosition="right"
          className="shadow-[0_4px_14px_rgba(57,172,134,0.35)] hover:shadow-[0_6px_20px_rgba(57,172,134,0.45)] hover:-translate-y-0.5 transition-all duration-200"
        />
        <SeButton
          btnText="Join as a Provider"
          variant="outlineLight"
          className="backdrop-blur-sm"
        />
      </div>

      <div className="flex items-center gap-3 mt-2">
        <div className="flex -space-x-2.5">
          {[
            { name: "RK", color: "bg-accent" },
            { name: "SM", color: "bg-blue-500" },
            { name: "BP", color: "bg-purple-500" },
            { name: "NL", color: "bg-orange-500" },
            { name: "DT", color: "bg-danger" },
          ].map((avatar) => (
            <div
              key={avatar.name}
              className={`w-9 h-9 rounded-full ${avatar.color} flex items-center justify-center text-white text-xs font-bold border-2 border-[#152232]`}
            >
              {avatar.name}
            </div>
          ))}
        </div>
        <div className="text-light/70 text-sm max-w-[200px]">
          <strong className="text-light">480+ verified pros</strong> across the
          valley. Avg. first response in{" "}
          <strong className="text-light">&lt; 8 min</strong>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
