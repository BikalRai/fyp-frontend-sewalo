import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuArrowRight } from "react-icons/lu";
import { toast } from "sonner";
import { RingLoader } from "react-spinners";

import SeButton from "@/components/button/SeButton";
import SeContainerMD from "@/components/container/SeContainerMD";
import SeContainerSM from "@/components/container/SeContainerSM";
import SeSectionHeader from "@/components/heading/SeSectionHeader";
import SeParagraph from "@/components/paragraph/SeParagraph";
import SeOnboardingLayout from "@/layouts/SeOnboardingLayout";

import AddressFormStep from "@/pages/onboarding/user/AddressFormStep";
import ProviderUploadImage from "@/features/provider/components/ProviderUploadImage";

import { useLocationStore } from "@/store/jobStore";
import {
  useUpdateCustomerProfile,
  useUserProfile,
} from "@/hooks/mutations/useUser";
import { uploadToCloudinary } from "@/lib/uploadImage";
import {
  customerProfileSchema,
  type CustomerProfileType,
} from "@/types/profile.types";

const CustomerOnboarding = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useUserProfile();
  const { location: userLocation } = useLocationStore();

  // Swapped to the full profile update mutation so it can handle the new fields
  const { mutateAsync: updateProfile, isPending: isUpdating } =
    useUpdateCustomerProfile();

  const formValues = useMemo(() => {
    return {
      fullName: user?.fullName || "",
      phoneNumber: user?.phoneNumber || "",
      imageUrl: user?.imageUrl || "",
    };
  }, [user]);

  const methods = useForm<CustomerProfileType>({
    resolver: zodResolver(customerProfileSchema),
    values: formValues,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (user?.onboarded) {
      navigate("/dashboard", { replace: true });
    }
  }, [user?.onboarded, isLoading, navigate]);

  const onSubmit = async (data: CustomerProfileType) => {
    if (!userLocation.lat || !userLocation.lng) {
      toast.warning("Please pin your location on the map");
      return;
    }

    if (!user?.id) {
      console.error("Cannot save profile: User ID is missing.");
      return;
    }

    let finalImageUrl = user?.imageUrl || "";

    try {
      // 1. Image Upload Logic
      if (data.imageUrl instanceof File) {
        toast.info("Uploading image...");
        try {
          finalImageUrl = await uploadToCloudinary(data.imageUrl);
        } catch (error) {
          toast.error("Failed to upload image. Please try again.");
          console.error(error);
          return;
        }
      } else if (typeof data.imageUrl === "string") {
        finalImageUrl = data.imageUrl;
      }

      // 2. Construct Payload
      const payload = {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        latitude: userLocation.lat,
        longitude: userLocation.lng,
        address: userLocation.address,
        imageUrl: finalImageUrl,
      };

      // 3. Send to Database
      await updateProfile(payload);

      // 4. Clear the global store & Route to Dashboard
      useLocationStore.getState().reset();
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to complete setup", error);
      toast.error("Failed to complete setup. Please try again.");
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl border text-sm text-text-dark outline-none transition-colors bg-white ${
      hasError
        ? "border-soft-danger"
        : "border-light-gray focus:border-accent focus:ring-1 focus:ring-accent/20"
    }`;

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <RingLoader color="#39AC86" />
      </div>
    );
  }

  return (
    <SeOnboardingLayout>
      <FormProvider {...methods}>
        <SeContainerMD className="px-5 lg:px-0">
          {/* ── Header ── */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted font-semibold my-5">
              HOMEOWNER SETUP
            </p>
          </div>

          <SeContainerSM>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-8 mt-4 pb-12"
            >
              {/* ── Personal Info Section ── */}
              <div className="grid gap-6">
                <div className="grid gap-1">
                  <SeSectionHeader title="Let's get to know you" align="left" />
                  <SeParagraph
                    title="Add a photo and your primary contact details to help pros recognize you."
                    align="left"
                  />
                </div>

                <div className="bg-card-bg rounded-2xl border border-light-gray shadow-sm overflow-hidden p-6 sm:p-8">
                  {/* Upload Image Component */}
                  <div className="mb-8 pb-8 border-b border-light-gray">
                    <ProviderUploadImage />
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid gap-2 md:col-span-2">
                      <label className="text-xs font-semibold text-primary uppercase tracking-wide">
                        Full Name
                      </label>
                      <input
                        {...register("fullName")}
                        placeholder="John Doe"
                        className={inputClass(!!errors.fullName)}
                      />
                      {errors.fullName && (
                        <span className="text-xs text-soft-danger">
                          {errors.fullName.message}
                        </span>
                      )}
                    </div>

                    <div className="grid gap-2 md:col-span-2">
                      <label className="text-xs font-semibold text-primary uppercase tracking-wide">
                        Phone Number
                      </label>
                      <input
                        {...register("phoneNumber")}
                        type="tel"
                        placeholder="+977 98..."
                        className={inputClass(!!errors.phoneNumber)}
                      />
                      {errors.phoneNumber && (
                        <span className="text-xs text-soft-danger">
                          {errors.phoneNumber.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Location Section ── */}
              <div className="grid gap-6 mt-4">
                <div className="grid gap-1">
                  <SeSectionHeader title="Where is home?" align="left" />
                  <SeParagraph
                    title="We use this to find pros within 5 km of you. Your exact address stays private."
                    align="left"
                  />
                </div>

                <div className="bg-card-bg rounded-2xl border border-light-gray shadow-sm overflow-hidden p-6 sm:p-8">
                  <AddressFormStep />
                </div>
              </div>

              {/* ── Submit Button ── */}
              <div className="flex items-center justify-end mt-4">
                <SeButton
                  variant="accentLight"
                  btnText={isUpdating ? "Saving..." : "Save & Continue"}
                  icon={<LuArrowRight />}
                  iconPosition="right"
                  // Use handleSubmit hook for the click function so validations trigger
                  clickFunc={handleSubmit(onSubmit)}
                  disabled={!userLocation.address || isUpdating}
                />
              </div>
            </form>
          </SeContainerSM>
        </SeContainerMD>
      </FormProvider>
    </SeOnboardingLayout>
  );
};

export default CustomerOnboarding;
