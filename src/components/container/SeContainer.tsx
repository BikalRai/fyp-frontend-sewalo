export type IContainerProp = {
  children: React.ReactNode;
  className?: string;
};

const SeContainer = ({ children, className }: IContainerProp) => {
  return (
    <div className={`w-full max-w-360 mx-auto ${className}`}>{children}</div>
  );
};

export default SeContainer;
