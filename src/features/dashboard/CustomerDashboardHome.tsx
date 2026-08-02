import type { IStatCardProps } from "@/types/dashboard.types";
import { LuBriefcase, LuClock, LuStar } from "react-icons/lu";
import StatCard from "./components/customer/StatCard";
import { IoChatboxOutline } from "react-icons/io5";
import DashboardNoJobPost from "./components/customer/DashboardNoJobPost";
import { useCustomerPosts } from "@/hooks/mutations/useJob";
import type { JobResponse } from "@/types/job.types";

const ACTIVE_STATUSES = [
  "OPEN",
  "ANALYZING",
  "IN_PROGRESS",
  "AWAITING_CONFIRMATION",
];

const buildStats = (posts: JobResponse[]): IStatCardProps[] => {
  const activeJobs = posts.filter((p) =>
    ACTIVE_STATUSES.includes(p.status),
  ).length;
  const pendingQuotes = posts.filter((p) => p.status === "OPEN").length;
  const completed = posts.filter((p) => p.status === "COMPLETED").length;

  const ratedJobs = posts.filter((p) => p.rating != null);
  const avgRating =
    ratedJobs.length > 0
      ? ratedJobs.reduce((sum, p) => sum + p.rating!.score, 0) /
        ratedJobs.length
      : 0;

  return [
    {
      Icon: LuBriefcase,
      label: "Active Jobs",
      metric: activeJobs,
      iconColor: "primary/70",
    },
    {
      Icon: LuClock,
      label: "Pending Quotes",
      metric: pendingQuotes,
      iconColor: "accent",
    },
    {
      Icon: IoChatboxOutline,
      label: "Completed",
      metric: completed,
      iconColor: "primary/70",
    },
    {
      Icon: LuStar,
      label: "Avg Rating Given",
      metric: Number(avgRating.toFixed(1)),
      iconColor: "accent",
    },
  ];
};

const CustomerDashboardHome = () => {
  const { data: posts, isLoading } = useCustomerPosts();

  const hasJobs = !isLoading && posts && posts.length > 0;
  const stats = posts ? buildStats(posts) : [];

  const recentJobs = posts
    ? [...posts]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 5)
    : [];

  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-7">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse h-24 bg-muted/10 rounded-2xl"
              />
            ))
          : stats.map((stat, i) => (
              <StatCard
                key={i}
                Icon={stat.Icon}
                label={stat.label}
                metric={stat.metric}
                iconColor={stat.iconColor}
              />
            ))}
      </div>

      {!isLoading && !hasJobs && <DashboardNoJobPost />}

      <div className="bg-light p-6 border border-muted/10 rounded-xl shadow-sm">
        <h4 className="font-semibold text-lg leading-7">Recent Activity</h4>
        <div>
          {isLoading ? (
            <p className="text-sm text-muted leading-5 mt-6">Loading...</p>
          ) : recentJobs.length === 0 ? (
            <p className="text-sm text-muted leading-5 mt-6">
              No recent activity yet. Start by posting a job request.
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-light-gray">
              {recentJobs.map((job) => (
                <li
                  key={job.id}
                  className="py-3 flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-primary truncate">
                      {job.categoryName}
                    </p>
                    <p className="text-xs text-muted truncate">
                      {job.description}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-muted shrink-0">
                    {job.status.replace(/_/g, " ")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboardHome;
