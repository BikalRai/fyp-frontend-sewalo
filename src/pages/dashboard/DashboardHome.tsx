import SeButton from "@/components/button/SeButton";
import SeDashboardHeader from "@/components/heading/SeDashboardHeader";
import SeSpinner from "@/components/spinner/SeSpinner";
import ProviderDashboard from "@/features/dashboard/components/ProviderDashboard";
import CustomerDashboardHome from "@/features/dashboard/CustomerDashboardHome";
import { useUserProfile } from "@/hooks/mutations/useUser";
import { LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import AdminDashboardHome from "../admin/AdminDashboardHome";

const DashboardHome = () => {
  const { data: user, isLoading } = useUserProfile();
  const navigate = useNavigate();

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
                clickFunc={() => navigate("/dashboard/post-rfq")}
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
        {user.role === "ADMIN" && <AdminDashboardHome />}
      </div>
    </div>
  );
};

export default DashboardHome;
