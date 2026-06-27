import type { IContainerProp } from "@/components/container/SeContainer";
import SeDashboardNavbar from "@/components/nav/dashboard/SeDashboardNavbar";
import SeSpinner from "@/components/spinner/SeSpinner";
import { useUserProfile } from "@/hooks/mutations/useUser";
import { LuBell, LuPanelLeft } from "react-icons/lu";
import DashboardContentLayoutPadding from "./DashboardContentLayoutPadding";

const SeDashboardLayout = ({ children }: IContainerProp) => {
  const { data: user, isLoading } = useUserProfile();

  if (isLoading || !user)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <SeSpinner className="h-90 w-90" />
      </div>
    );

  return (
    <div className="h-dvh w-full flex overflow-hidden">
      <aside className="bg-primary h-full overflow-y-auto w-16 lg:w-60 shrink-0 transition-all duration-300">
        <SeDashboardNavbar role={user.role} />
      </aside>
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto relative bg-bg">
        <div className="sticky top-0 z-10 p-4 flex items-center justify-between border-b border-b-muted/40 bg-light">
          <div className="flex items-center">
            <LuPanelLeft className="h-4 w-4 hover:text-accent transition-colors duration-200 cursor-pointer" />
          </div>
          <div className="flex items-center gap-6">
            <LuBell className="hover:text-primary transition-colors duration-150 cursor-pointer" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-accent/10 hover:bg-accent/20 transition-colors duration-200 cursor-pointer">
                {user ? (
                  <span className="text-accent text-sm font-medium">A</span>
                ) : (
                  <img src="" alt="User avatar" />
                )}
              </div>
              <div>{user.fullName}</div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <DashboardContentLayoutPadding>
          <div className="flex-1">{children}</div>
        </DashboardContentLayoutPadding>
      </main>
    </div>
  );
};

export default SeDashboardLayout;
