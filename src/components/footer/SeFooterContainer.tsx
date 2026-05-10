import type { IContainerProp } from "../container/SeContainer";

const SeFooterContainer = ({ children }: IContainerProp) => {
  return <div className="flex flex-col gap-6">{children}</div>;
};

export default SeFooterContainer;
