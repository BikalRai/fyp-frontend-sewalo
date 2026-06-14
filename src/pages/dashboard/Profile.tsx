import SeDashboardHeader from "@/components/heading/SeDashboardHeader";
import DashboardContentLayoutPadding from "@/layouts/DashboardContentLayoutPadding";
import { useAuthStore } from "@/store/authStore";
import CustomerProfileSettings from "./customer/CustomerProfileSettings";
import ProviderProfileSettings from "./provider/ProviderProfileSettings";
import { useUserProfile } from "@/hooks/mutations/useUser";
import type { ProviderResponseType } from "@/types/user.types";

const Profile = () => {
  const { role } = useAuthStore();

  const { data: userProfile, isLoading, isError } = useUserProfile();
  return (
    <DashboardContentLayoutPadding>
      <div>
        <SeDashboardHeader title="Profile" />
        <p className="text-sm text-muted leading-5">
          Manage your personal info and preferences.
        </p>
      </div>

      {isLoading && (
        <div className="animate-pulse h-64 bg-muted/10 rounded-2xl"></div>
      )}

      {isError && (
        <div className="text-danger">Failed to load profile data.</div>
      )}

      {userProfile &&
        (role === "PROVIDER" ? (
          <ProviderProfileSettings
            initialData={userProfile as ProviderResponseType}
          />
        ) : (
          <CustomerProfileSettings initialData={userProfile} />
        ))}
    </DashboardContentLayoutPadding>
  );
};

export default Profile;
