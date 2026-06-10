import { useNavigate } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";

import SeButton from "@/components/button/SeButton";
import SeContainerMD from "@/components/container/SeContainerMD";
import SeContainerSM from "@/components/container/SeContainerSM";
import SeSectionHeader from "@/components/heading/SeSectionHeader";
import SeParagraph from "@/components/paragraph/SeParagraph";
import SeOnboardingLayout from "@/layouts/SeOnboardingLayout";

import AddressFormStep from "@/pages/onboarding/user/AddressFormStep";

import { useLocationStore } from "@/store/jobStore";
import {
  useUpdateUserAddress,
  useUserProfile,
} from "@/hooks/mutations/useUser";
import { useEffect } from "react";
import { RingLoader } from "react-spinners";

const CustomerOnboarding = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useUserProfile();
  const { location: userLocation } = useLocationStore();
  const updateAddressMutation = useUpdateUserAddress();

  const handleCompleteSetup = async () => {
    if (!user?.id) {
      console.error("Cannot save address: User ID is missing.");
      return;
    }

    try {
      // 1. Send the permanent home address to the database
      await updateAddressMutation.mutateAsync({
        id: user.id,
        updateData: {
          lat: userLocation.lat,
          lng: userLocation.lng,
          address: userLocation.address,
        },
      });

      // 2. Clear the global store so it's fresh for their first actual job post
      useLocationStore.getState().reset();

      // 3. Send them into the application
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to complete setup", error);
      // Optional: Add your toast.error() here
    }
  };

  useEffect(() => {
    if (user?.onboarded) {
      navigate("/dashboard", { replace: true });
    }
  }, [user?.onboarded, isLoading, navigate]);

  if (isLoading) {
    return <RingLoader />;
  }

  return (
    <SeOnboardingLayout>
      <SeContainerMD className="px-5 lg:px-0">
        {/* ── Header ── */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted font-semibold my-5">
            HOMEOWNER SETUP
          </p>
        </div>

        <SeContainerSM>
          <div className="grid gap-6 mt-6">
            {/* ── Title & Description ── */}
            <div className="grid gap-1">
              <SeSectionHeader title="Where is home?" align="left" />
              <SeParagraph
                title="We use this to find pros within 5 km of you. Your exact address stays private."
                align="left"
              />
            </div>

            {/* ── The Map Component ── */}
            <div>
              <AddressFormStep />
            </div>
          </div>

          {/* ── Submit Button ── */}
          <div className="flex items-center justify-end mt-8">
            <SeButton
              variant="accentLight"
              btnText={
                updateAddressMutation.isPending
                  ? "Saving..."
                  : "Save & Continue"
              }
              icon={<LuArrowRight />}
              iconPosition="right"
              clickFunc={handleCompleteSetup}
              disabled={
                !userLocation.address || updateAddressMutation.isPending
              }
            />
          </div>
        </SeContainerSM>
      </SeContainerMD>
    </SeOnboardingLayout>
  );
};

export default CustomerOnboarding;
