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
import {
  IoPersonOutline,
  IoLocationOutline,
  IoSaveOutline,
} from "react-icons/io5";

interface Props {
  initialData: UserProfileType;
}

const CustomerProfileSettings = ({ initialData }: Props) => {
  // ---- ALL LOGIC UNCHANGED ----
  const { location, setLocation } = useLocationStore();

  useEffect(() => {
    if (initialData.lat && initialData.lng) {
      setLocation(initialData.lat, initialData.lng, initialData.address || "");
    }
  }, [initialData, setLocation]);

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
  // ---- END LOGIC ----

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl grid gap-6">
      {/* Personal Information */}
      <div className="bg-card-bg rounded-2xl border border-light-gray shadow-sm overflow-hidden">
        {/* Card header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-light-gray">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
            <IoPersonOutline className="text-accent text-base" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-primary">
              Personal Information
            </h3>
            <p className="text-xs text-muted">Your name and contact details</p>
          </div>
        </div>

        {/* Fields */}
        <div className="px-6 py-5 grid gap-4">
          <div className="grid gap-1.5">
            <label className="text-[11px] font-bold tracking-widest text-muted uppercase">
              Full Name
            </label>
            <input
              {...register("fullName")}
              placeholder="John Doe"
              className={`w-full px-4 py-3 rounded-xl border text-sm text-text-dark outline-none transition-colors bg-light ${
                errors.fullName
                  ? "border-soft-danger"
                  : "border-light-gray focus:border-accent"
              }`}
            />
            {errors.fullName && (
              <span className="text-xs text-soft-danger">
                {errors.fullName.message}
              </span>
            )}
          </div>

          <div className="grid gap-1.5">
            <label className="text-[11px] font-bold tracking-widest text-muted uppercase">
              Phone Number
            </label>
            <input
              {...register("phoneNumber")}
              type="tel"
              placeholder="+977 98..."
              className={`w-full px-4 py-3 rounded-xl border text-sm text-text-dark outline-none transition-colors bg-light ${
                errors.phoneNumber
                  ? "border-soft-danger"
                  : "border-light-gray focus:border-accent"
              }`}
            />
            {errors.phoneNumber && (
              <span className="text-xs text-soft-danger">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-card-bg rounded-2xl border border-light-gray shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-light-gray">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
            <IoLocationOutline className="text-accent text-base" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-primary">Your Location</h3>
            <p className="text-xs text-muted">
              Pin your location so providers can find you
            </p>
          </div>
        </div>
        <div className="px-6 py-5">
          <AddressFormStep />
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent/90 disabled:opacity-50 transition-all"
        >
          <IoSaveOutline className="text-base" />
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default CustomerProfileSettings;
