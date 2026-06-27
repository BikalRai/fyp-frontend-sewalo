import type { IStatCardProps } from "@/types/dashboard.types";
import { GoDash } from "react-icons/go";

const StatCard = ({ Icon, label, metric, iconColor }: IStatCardProps) => {
  return (
    <div className="flex justify-between items-center gap-4 p-6 bg-light rounded-xl border border-muted/20 shadow-sm">
      <div className="flex flex-col gap1">
        <div className="text-sm leading-5 text-primary/50">{label}</div>
        <div className="text-3xl font-bold leading-8">
          {Icon.toString().toLowerCase().includes("star") ? <GoDash /> : metric}
        </div>
      </div>
      <div>{<Icon className={`h-8 w-8 text-${iconColor}`} />}</div>
    </div>
  );
};

export default StatCard;
