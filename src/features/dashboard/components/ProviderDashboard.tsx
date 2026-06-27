import { LuAArrowDown } from "react-icons/lu";
import DashboardStatCard from "./provider/DashboardStatCard";
import LeadSection from "./provider/LeadSection";
import Activity from "../Activity";

const ProviderDashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardStatCard title="title" Icon={LuAArrowDown} metric={10} />
        <DashboardStatCard title="title" Icon={LuAArrowDown} metric={10} />
        <DashboardStatCard title="title" Icon={LuAArrowDown} metric={10} />
        <DashboardStatCard title="title" Icon={LuAArrowDown} metric={10} />
      </div>
      <LeadSection />
      <Activity />
    </div>
  );
};

export default ProviderDashboard;
