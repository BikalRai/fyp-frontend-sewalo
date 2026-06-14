import SeButton from "@/components/button/SeButton";
import SeDashboardTabTitle from "@/components/heading/SeDashboardTabTitle";
import { LuArrowRight } from "react-icons/lu";
import RecentJobCard from "./RecentJobCard";

const RecentJobs = () => {
  return (
    <div className="bg-light/30 rounded-xl px-6 py-6.5 border border-muted/20">
      <div className="flex items-center justify-between">
        <SeDashboardTabTitle title="Recent Jobs" />
        <SeButton
          btnText="View all"
          variant="tertiaryAccent"
          icon={<LuArrowRight />}
        />
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <RecentJobCard />
        <RecentJobCard />
        <RecentJobCard />
      </div>
    </div>
  );
};

export default RecentJobs;
