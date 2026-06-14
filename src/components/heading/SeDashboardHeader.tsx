import type { ISectionHeading } from "@/types/section.types";

const SeDashboardHeader = ({ title }: ISectionHeading) => {
  return <div className="font-bold text-2xl leading-8">{title}</div>;
};

export default SeDashboardHeader;
