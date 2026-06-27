import SeButton from "@/components/button/SeButton";
import SeDashboardHeader from "@/components/heading/SeDashboardHeader";
import SeSpinner from "@/components/spinner/SeSpinner";
import ProviderDashboard from "@/features/dashboard/components/ProviderDashboard";
import CustomerDashboardHome from "@/features/dashboard/CustomerDashboardHome";
import { useUserProfile } from "@/hooks/mutations/useUser";
import { LuPlus } from "react-icons/lu";

const DashboardHome = () => {
  const { data: user, isLoading } = useUserProfile();

  if (isLoading || !user) {
    return (
      <div className="h-full">
        <SeSpinner className="w-90 h-90" />
      </div>
    );
  }

  const username = user.fullName.split(" ")[0];
  const title = `Welcome back ${username} 👋`;

  return (
    <div className="h-full">
      <div className="py-8 grid gap-6">
        <div>
          <div className="flex items-center justify-between">
            <SeDashboardHeader title={title} />
            {user.role === "CUSTOMER" && (
              <SeButton
                btnText="Post a New Job"
                variant="accentLight"
                icon={<LuPlus />}
                iconPosition="left"
              />
            )}
          </div>
          <p className="leading-6 text-muted">
            {user.role === "CUSTOMER"
              ? `Here's what's happening with your jobs.`
              : `Here's your lead activity and earnings overview.`}
          </p>
        </div>
        {user.role === "CUSTOMER" && <CustomerDashboardHome />}
        {user.role === "PROVIDER" && <ProviderDashboard />}
      </div>
    </div>
  );
};

export default DashboardHome;
