export type IContainerProp = {
  children: React.ReactNode;
};

const SeContainer = ({ children }: IContainerProp) => {
  return <div className='w-full max-w-360 mx-auto'>{children}</div>;
};

export default SeContainer;
