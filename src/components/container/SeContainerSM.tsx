import type { IContainerProp } from "./SeContainer";

const SeContainerSM = ({ children, className }: IContainerProp) => {
  return (
    <div className={`w-full max-w-176 mx-auto ${className}`}>{children}</div>
  );
};

export default SeContainerSM;
