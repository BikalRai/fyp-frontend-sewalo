import type { IContainerProp } from "./SeContainer";

const SeContainerLG = ({ children }: IContainerProp) => {
  return <div className="w-full max-w-300 mx-auto">{children}</div>;
};

export default SeContainerLG;
