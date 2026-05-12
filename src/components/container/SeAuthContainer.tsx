import { LuArrowLeft } from "react-icons/lu";
import { Link } from "react-router-dom";

type SeAuthContainerProps = {
  children: React.ReactNode;
  panel: React.ReactNode;
  reverse?: boolean;
};

const SeAuthContainer = ({
  children,
  panel,
  reverse = false,
}: SeAuthContainerProps) => {
  return (
    <div className="min-h-screen bg-[#F5F4F0] flex items-center justify-center relative">
      {/* Back to home */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-muted hover:text-text-dark transition"
      >
        <LuArrowLeft className="w-4 h-4" />
        Home
      </Link>

      <div
        className={`w-full md:w-1/2 h-screen bg-light flex items-center justify-center p-10 ${
          reverse ? "md:order-2" : ""
        }`}
      >
        {children}
      </div>

      <div className="hidden md:flex md:w-1/2 h-screen bg-[#EBEFF4] items-center justify-center p-10">
        {panel}
      </div>
    </div>
  );
};

export default SeAuthContainer;
