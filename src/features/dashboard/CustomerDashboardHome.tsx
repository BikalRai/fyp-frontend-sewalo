import type { IStatCardProps } from "@/types/dashboard.types";
import { LuBriefcase, LuClock, LuStar } from "react-icons/lu";
import StatCard from "./components/customer/StatCard";
import RecentJobs from "./components/customer/RecentJobs";
import CustomerHomeTopMatchedPros from "./components/customer/CustomerHomeTopMatchedPros";
import { IoChatboxOutline } from "react-icons/io5";
import DashboardNoJobPost from "./components/customer/DashboardNoJobPost";

const stats: IStatCardProps[] = [
  {
    Icon: LuBriefcase,
    label: "Active Jobs",
    metric: 0,
    iconColor: "primary/70",
  },
  {
    Icon: LuClock,
    label: "Pending Quotes",
    metric: 0,
    iconColor: "accent",
  },
  {
    Icon: IoChatboxOutline,
    label: "Completed",
    metric: 0,
    iconColor: "primary/70",
  },
  { Icon: LuStar, label: "Avg Rating Given", metric: 0, iconColor: "accent" },
];

const CustomerDashboardHome = () => {
  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-7">
        {stats.map((state, i) => (
          <StatCard
            key={i + 1}
            Icon={state.Icon}
            label={state.label}
            metric={state.metric}
            iconColor={state.iconColor}
          />
        ))}
      </div>
      <DashboardNoJobPost />
      <div className="bg-light p-6 border border-muted/10 rounded-xl shadow-xs">
        <h4 className="font-semibold text-lg leading-7">Recent Activity</h4>
        <div>
          <p className="text-sm text-muted leading-5 mt-6">
            No recent activity yet. Start by posting a job request.
          </p>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 xl:grid-cols-[auto_400px] gap-6">
        <RecentJobs />
        <CustomerHomeTopMatchedPros />
      </div>
    </div>
  );
};

export default CustomerDashboardHome;
