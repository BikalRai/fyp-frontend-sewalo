import SeAvatar from "@/components/avatar/SeAvatar";
import SeButton from "@/components/button/SeButton";
import SeDashboardTabTitle from "@/components/heading/SeDashboardTabTitle";
import { IoLocation } from "react-icons/io5";
import { LuStar } from "react-icons/lu";

const CustomerHomeTopMatchedPros = () => {
  return (
    <div className="flex flex-col bg-light/20 px-6 py-6.5 border rounded-xl border-muted/20">
      <SeDashboardTabTitle title="Top Matched Pros" />

      <div className="flex flex-col h-full">
        <div>
          <div className="bg-muted/5 p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SeAvatar />
              <div>
                <h6 className="text-sm font-medium leading-5">Ramesh K.</h6>
                <p className="text-xs text-muted">Plumbing</p>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium leading-5 flex items-center">
                <LuStar className="fill-amber-400 stroke-amber-400" />
                <span>4.9</span>
              </div>
              <div className="text-muted/50 flex items-center text-xs">
                <IoLocation />
                <span>0.8km</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto">
          <SeButton
            btnText="View All Pros"
            variant="lightGray"
            size="sm"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerHomeTopMatchedPros;
