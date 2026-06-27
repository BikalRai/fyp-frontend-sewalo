import type { ProviderDashboardStatProps } from "@/types/dashboard.types";

const DashboardStatCard = ({
  title = "title",
  Icon,
  metric = 8,
}: ProviderDashboardStatProps) => {
  return (
    <div className="bg-light p-6 rounded-xl flex justify-between items-center shadow-sm">
      <div>
        <div className="text-sm leading-5 text-muted">{title}</div>
        <div className="text-3xl font-bold leading-9">{metric}</div>
      </div>
      <div>{<Icon className="h-8 w-8 stroke-2" />}</div>
    </div>
  );
};

export default DashboardStatCard;
