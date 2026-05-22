import type { IContainerProp } from "./SeContainer";

const SeContainerMD = ({ children, className }: IContainerProp) => {
  return (
    <div className={`w-full max-w-3xl mx-auto ${className}`}>{children}</div>
  );
};

export default SeContainerMD;
