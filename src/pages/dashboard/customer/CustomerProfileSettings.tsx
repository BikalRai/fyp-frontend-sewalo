import { useEffect, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocationStore } from "@/store/jobStore";
import AddressFormStep from "@/pages/onboarding/user/AddressFormStep";
import {
  customerProfileSchema,
  type CustomerProfileType,
} from "@/types/profile.types";
import type { UserProfileType } from "@/types/user.types";
import { toast } from "sonner";
import {
  IoPersonOutline,
  IoLocationOutline,
  IoSaveOutline,
  IoCameraOutline,
} from "react-icons/io5";
import {
  useUpdateCustomerProfile,
  useUserProfile,
} from "@/hooks/mutations/useUser";
import ProviderUploadImage from "@/features/provider/components/ProviderUploadImage";
import { uploadToCloudinary } from "@/lib/uploadImage";
import SectionHeader from "@/features/dashboard/components/customer/SectionHeader";
import Card from "@/features/dashboard/components/customer/Card";

interface Props {
  initialData: UserProfileType;
}

const CustomerProfileSettings = ({ initialData }: Props) => {
  const { mutate: updateProfile, isPending } = useUpdateCustomerProfile();
  const { location, setLocation } = useLocationStore();
  const { data: user } = useUserProfile();

  console.log(user, "USER");

  const formValues = useMemo(() => {
    return {
      fullName: initialData?.fullName || "",
      phoneNumber: initialData?.phoneNumber || "",
      imageUrl: initialData?.imageUrl || "",
    };
  }, [initialData]);

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
    if (!location.address && initialData?.lat && initialData?.lng) {
      setLocation(initialData.lat, initialData.lng, initialData.address || "");
    }
  }, [initialData, location.address, setLocation]);

  const onSubmit = async (data: CustomerProfileType) => {
    if (!location.lat || !location.lng) {
      toast.warning("Please pin your location on the map");
      return;
    }

    let finalImageUrl = initialData?.imageUrl || "";

    if (data.imageUrl instanceof File) {
      try {
        if (data.imageUrl instanceof File) {
          try {
            finalImageUrl = await uploadToCloudinary(data.imageUrl);
          } catch (error) {
            toast.error("Failed to upload image. Please try again.");
            console.log(error);
            return;
          }
        } else if (typeof data.imageUrl === "string") {
          finalImageUrl = data.imageUrl;
        }
        toast.info("Uploading image");
      } catch (error) {
        toast.error("Failed to upload image. Please try again.");
        console.log(error);
        return;
      }
    } else if (typeof data.imageUrl === "string") {
      finalImageUrl = data.imageUrl;
    }

    const payload = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      latitude: location.lat,
      longitude: location.lng,
      address: location.address,
      imageUrl: finalImageUrl,
    };

    updateProfile(payload);
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl border text-sm text-text-dark outline-none transition-all duration-200 bg-white placeholder:text-muted/50 ${
      hasError
        ? "border-soft-danger focus:border-soft-danger focus:ring-2 focus:ring-soft-danger/15"
        : "border-light-gray hover:border-accent/40 focus:border-accent focus:ring-2 focus:ring-accent/15"
    }`;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-10 pb-20 pt-8"
      >
        {/* Personal Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <SectionHeader
            icon={IoPersonOutline}
            title="Personal Information"
            description="Update your name and primary contact details used for bookings and communications."
          />

          <Card>
            {/* Avatar Upload */}
            <div className="mb-8 pb-8 border-b border-light-gray/60">
              <div className="flex items-center gap-2 mb-4">
                <IoCameraOutline className="text-accent text-sm" />
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  Profile Photo
                </span>
              </div>
              <ProviderUploadImage />
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-2 md:col-span-2">
                <label className="text-xs font-bold text-primary uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  {...register("fullName")}
                  placeholder="John Doe"
                  className={inputClass(!!errors.fullName)}
                />
                {errors.fullName && (
                  <span className="text-xs text-soft-danger font-medium flex items-center gap-1 mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-soft-danger" />
                    {errors.fullName.message}
                  </span>
                )}
              </div>

              <div className="grid gap-2 md:col-span-2">
                <label className="text-xs font-bold text-primary uppercase tracking-wider">
                  Phone Number
                </label>
                <input
                  {...register("phoneNumber")}
                  type="tel"
                  placeholder="+977 98XXXXXXXX"
                  className={inputClass(!!errors.phoneNumber)}
                />
                {errors.phoneNumber && (
                  <span className="text-xs text-soft-danger font-medium flex items-center gap-1 mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-soft-danger" />
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-light-gray to-transparent" />

        {/* Location Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <SectionHeader
            icon={IoLocationOutline}
            title="Your Location"
            description="Pin your primary location on the map so service providers can easily find your address."
          />

          <Card>
            <AddressFormStep />
          </Card>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-light-gray to-transparent" />

        {/* Submit Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <div className="md:col-span-1 hidden md:block" />
          <div className="md:col-span-2 flex items-center justify-between bg-card-bg rounded-2xl border border-light-gray/80 shadow-[0_2px_16px_rgba(25,53,87,0.04)] p-6 sm:p-8">
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-text-dark">
                Ready to save?
              </p>
              <p className="text-xs text-muted mt-0.5">
                Your changes will be applied immediately.
              </p>
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-accent text-white rounded-xl text-sm font-bold hover:bg-accent-hover hover:shadow-[0_8px_24px_rgba(57,172,134,0.25)] hover:-translate-y-0.5 active:translate-y-0 focus:ring-4 focus:ring-accent/20 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all duration-200 shadow-sm w-full sm:w-auto justify-center"
            >
              <IoSaveOutline className="text-base" />
              {isPending ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CustomerProfileSettings;
