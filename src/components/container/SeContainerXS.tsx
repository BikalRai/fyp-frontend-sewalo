import type { IContainerProp } from "./SeContainer";

const SeContainerXS = ({ children }: IContainerProp) => {
  return <div className="w-full max-w-100 mx-auto">{children}</div>;
};

export default SeContainerXS;
