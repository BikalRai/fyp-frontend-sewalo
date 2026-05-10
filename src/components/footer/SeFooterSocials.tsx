import { logoLight } from "@/uitls/images";
import SeFooterContainer from "./SeFooterContainer";
import SeSocials from "./SeSocials";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";

const socials = [
  { icon: FaFacebookF, link: "https://facebook.com" },
  { icon: FaLinkedinIn, link: "https://linkedin.com" },
];

const SeFooterSocials = () => {
  return (
    <SeFooterContainer>
      <div className="w-21 h-auto">
        <img
          src={logoLight}
          alt="Sewalo logo in white"
          className="w-full h-full"
        />
      </div>
      <p className="text-muted text-sm leading-6">
        Nepal's smart service marketplace. Connecting homeowners with verified
        local professionals through AI-powered lead matching.
      </p>
      <div className="flex items-center gap-3">
        {socials.map((social, i) => (
          <SeSocials key={i + 1} Icon={social.icon} link={social.link} />
        ))}
      </div>
    </SeFooterContainer>
  );
};

export default SeFooterSocials;
