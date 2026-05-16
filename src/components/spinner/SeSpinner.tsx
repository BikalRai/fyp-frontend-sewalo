import { LuLoaderCircle } from "react-icons/lu";

type SpinnerType = {
  size?: number;
  className?: string;
};

const SeSpinner = ({ size, className }: SpinnerType) => {
  return (
    <LuLoaderCircle
      size={size}
      role="status"
      aria-label="Loading"
      className={`animate-spin ${className}`}
    />
  );
};

export default SeSpinner;
