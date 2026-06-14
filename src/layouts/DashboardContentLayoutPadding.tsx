import type { IContainerProp } from "@/components/container/SeContainer";

const DashboardContentLayoutPadding = ({ children }: IContainerProp) => {
  return <div className="py-8 px-16 grid gap-6">{children}</div>;
};

export default DashboardContentLayoutPadding;
