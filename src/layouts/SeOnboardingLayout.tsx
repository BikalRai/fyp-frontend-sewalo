import type { IContainerProp } from "@/components/container/SeContainer";
import SeContainerMD from "@/components/container/SeContainerMD";
import { logo } from "@/uitls/images";
import { LuHeart } from "react-icons/lu";

const SeOnboardingLayout = ({ children }: IContainerProp) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-bg/30 py-6">
        <div className="flex-1 flex w-full items-center justify-between">
          <SeContainerMD className="px-5 lg:px-0">
            <div className="flex items-center justify-between">
              <div className="h-7">
                <img src={logo} alt="Sewalo logo" className="w-full h-full" />
              </div>
              <div className="text-xs font-medium text-muted flex items-center">
                <LuHeart className="fill-accent stroke-accent w-3.5 h-3.5" />
                <span className="ms-2">Made in Kathmandu</span>
              </div>
            </div>
          </SeContainerMD>
        </div>
      </div>
      <div className="flex-1 flex">{children}</div>
    </div>
  );
};

export default SeOnboardingLayout;
