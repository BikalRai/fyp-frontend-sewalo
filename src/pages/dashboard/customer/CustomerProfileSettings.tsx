import AddressFormStep from "@/pages/onboarding/user/AddressFormStep";
import { useLocationStore } from "@/store/jobStore";
import {
  customerProfileSchema,
  type CustomerProfileType,
} from "@/types/profile.types";
import type { UserProfileType } from "@/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  initialData: UserProfileType;
}
const CustomerProfileSettings = ({ initialData }: Props) => {
  const { location, setLocation } = useLocationStore();

  useEffect(() => {
    // Only run this if the user actually has saved coordinates in the DB
    if (initialData.lat && initialData.lng) {
      setLocation(initialData.lat, initialData.lng, initialData.address || "");
    }
  }, [initialData, setLocation]);

  console.log(location, "LOC");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CustomerProfileType>({
    resolver: zodResolver(customerProfileSchema),
    defaultValues: {
      fullName: initialData.fullName || "",
      phoneNumber: initialData.phoneNumber || "",
    },
  });

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
    };
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl grid gap-8">
      <div className="bg-white p-6 rounded-2xl border border-muted/20 shadow-sm grid gap-4">
        <h3 className="text-lg font-semibold text-text-dark">
          Personal Information
        </h3>

        <div className="grid gap-1.5">
          <label className="text-[11px] font-semibold tracking-widest text-muted uppercase">
            Full Name
          </label>
          <input
            {...register("fullName")}
            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
              errors.fullName
                ? "border-red-500"
                : "border-muted/30 focus:border-accent"
            }`}
            placeholder="John Doe"
          />
          {errors.fullName && (
            <span className="text-xs text-red-500">
              {errors.fullName.message}
            </span>
          )}
        </div>

        <div className="grid gap-1.5">
          <label className="text-[11px] font-semibold tracking-widest text-muted uppercase">
            Phone Number
          </label>
          <input
            {...register("phoneNumber")}
            type="tel"
            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
              errors.phoneNumber
                ? "border-red-500"
                : "border-muted/30 focus:border-accent"
            }`}
            placeholder="+977 98..."
          />
          {errors.phoneNumber && (
            <span className="text-xs text-red-500">
              {errors.phoneNumber.message}
            </span>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-muted/20 shadow-sm">
        <h3 className="text-lg font-semibold text-text-dark mb-4">
          Your Location
        </h3>
        <AddressFormStep />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 transition-all"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default CustomerProfileSettings;
