import type { ISectionHeading } from "@/types/section.types";

const SeDashboardTabTitle = ({ title }: ISectionHeading) => {
  return <div className="font-semibold leading-6">{title}</div>;
};

export default SeDashboardTabTitle;
