import type { IContainerProp } from "./SeContainer";

const SeContainerMD = ({ children }: IContainerProp) => {
  return <div className="w-full max-w-3xl mx-auto">{children}</div>;
};

export default SeContainerMD;
