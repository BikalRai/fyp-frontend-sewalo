import { LuBriefcase, LuCalendarClock, LuStar, LuWallet } from "react-icons/lu";
import DashboardStatCard from "./provider/DashboardStatCard";
import LeadSection from "./provider/LeadSection";
import Activity from "../Activity";
import { useProviderStats } from "@/hooks/mutations/useProvider";
import { useJobLeads } from "@/hooks/mutations/useJob";

const ProviderDashboard = () => {
  const { data: stats, isLoading } = useProviderStats();
  const { data: leads } = useJobLeads();

  const hasLeads = leads && leads.length > 0;

  const recentBids = leads
    ? leads
        .filter((l) => l.myBid !== null)
        .sort(
          (a, b) =>
            new Date(b.myBid!.createdAt).getTime() -
            new Date(a.myBid!.createdAt).getTime(),
        )
        .slice(0, 5)
    : [];
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse h-24 bg-muted/10 rounded-2xl"
            />
          ))
        ) : (
          <>
            <DashboardStatCard
              title="Total Earned"
              Icon={LuWallet}
              metric={`Rs. ${stats?.totalEarned ?? 0}`}
            />
            <DashboardStatCard
              title="This Month"
              Icon={LuCalendarClock}
              metric={`Rs. ${stats?.thisMonthEarned ?? 0}`}
            />
            <DashboardStatCard
              title="Active Jobs"
              Icon={LuBriefcase}
              metric={stats?.activeJobs ?? 0}
            />
            <DashboardStatCard
              title="Avg. Rating"
              Icon={LuStar}
              metric={
                stats?.avgRating != null ? stats.avgRating.toFixed(1) : "—"
              }
            />
          </>
        )}
      </div>
      {!hasLeads && <LeadSection />}
      <Activity bids={recentBids} />
    </div>
  );
};

export default ProviderDashboard;
