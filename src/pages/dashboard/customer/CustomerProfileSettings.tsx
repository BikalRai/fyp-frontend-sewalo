import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
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
} from "react-icons/io5";
import { useUpdateCustomerProfile } from "@/hooks/mutations/useUser";

interface Props {
  initialData: UserProfileType;
}

const CustomerProfileSettings = ({ initialData }: Props) => {
  const { mutate: updateProfile, isPending } = useUpdateCustomerProfile();

  const { location, setLocation } = useLocationStore();

  // 1. Compute reactive form values based on the initial data passed from Profile.tsx
  const formValues = useMemo(() => {
    return {
      fullName: initialData?.fullName || "",
      phoneNumber: initialData?.phoneNumber || "",
    };
  }, [initialData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerProfileType>({
    resolver: zodResolver(customerProfileSchema),
    values: formValues, // Syncs RHF with incoming data
  });

  // 2. Sync backend address data with the Zustand location store on load
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

    const payload = {
      ...data,
      latitude: location.lat,
      longitude: location.lng,
      address: location.address,
      imageUrl: initialData?.imageUrl || "",
    };

    // 3. Fire it
    updateProfile(payload);
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-2.5 rounded-lg border text-sm text-text-dark outline-none transition-colors bg-white ${
      hasError
        ? "border-soft-danger"
        : "border-light-gray focus:border-accent focus:ring-1 focus:ring-accent/20"
    }`;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-5xl mx-auto grid gap-12 pb-16 pt-6"
    >
      {/* 1. Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <IoPersonOutline className="text-accent text-lg" />
            <h3 className="text-base font-semibold text-primary">
              Personal Information
            </h3>
          </div>
          <p className="text-sm text-muted">
            Update your name and primary contact details used for bookings.
          </p>
        </div>

        <div className="md:col-span-2 bg-card-bg rounded-2xl border border-light-gray shadow-sm overflow-hidden p-6 sm:p-8">
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

      <hr className="border-light-gray" />

      {/* 2. Location */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <IoLocationOutline className="text-accent text-lg" />
            <h3 className="text-base font-semibold text-primary">
              Your Location
            </h3>
          </div>
          <p className="text-sm text-muted">
            Pin your primary location so providers can easily find your address.
          </p>
        </div>

        <div className="md:col-span-2 bg-card-bg rounded-2xl border border-light-gray shadow-sm overflow-hidden p-6 sm:p-8">
          <AddressFormStep />
        </div>
      </div>

      {/* Submit Action */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 mt-4">
        <div className="md:col-span-1 hidden md:block"></div>
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent/90 focus:ring-4 focus:ring-accent/20 disabled:opacity-50 transition-all shadow-sm"
          >
            <IoSaveOutline className="text-lg" />
            {isPending ? "Saving changes..." : "Save Changes"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CustomerProfileSettings;
