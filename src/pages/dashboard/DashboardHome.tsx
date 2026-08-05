import SeButton from "@/components/button/SeButton";
import SeDashboardHeader from "@/components/heading/SeDashboardHeader";
import SeSpinner from "@/components/spinner/SeSpinner";
import ProviderDashboard from "@/features/dashboard/components/ProviderDashboard";
import CustomerDashboardHome from "@/features/dashboard/CustomerDashboardHome";
import AdminDashboardHome from "../admin/AdminDashboardHome";
import { useUserProfile } from "@/hooks/mutations/useUser";
import { LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useProviderProfile } from "@/hooks/mutations/useProvider";
import ProviderKycUpload from "@/features/provider/components/ProviderKycUpload";

const DashboardHome = () => {
  const { data: user, isLoading: isUserLoading } = useUserProfile();
  const navigate = useNavigate();

  // --- UPDATED: Cleaner hook call ---
  const { data: providerProfile, isLoading: isProviderLoading } =
    useProviderProfile(user?.role === "PROVIDER");

  if (
    isUserLoading ||
    (user?.role === "PROVIDER" && isProviderLoading) ||
    !user
  ) {
    return (
      <div className="h-full flex items-center justify-center">
        <SeSpinner className="w-12 h-12" />
      </div>
    );
  }

  if (user.role === "PROVIDER") {
    const providerStatus = providerProfile?.status;
    const needsKyc =
      providerStatus === "DRAFT" ||
      providerStatus === "REJECTED" ||
      providerStatus === "PENDING_APPROVAL";

    if (needsKyc) {
      return (
        <div className="h-full py-8">
          <ProviderKycUpload currentStatus={providerStatus} />
        </div>
      );
    }
  }

  const username = user.fullName.split(" ")[0];
  const title = `Welcome back ${username} 👋`;

  return (
    <div className="h-full">
      <div className="py-8 grid gap-6">
        <div>
          <div className="flex items-center justify-between">
            {user.role !== "ADMIN" && <SeDashboardHeader title={title} />}
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
