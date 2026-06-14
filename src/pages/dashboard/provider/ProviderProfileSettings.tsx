import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocationStore } from "@/store/jobStore";
import AddressFormStep from "@/pages/onboarding/user/AddressFormStep";
import {
  providerProfileSchema,
  type ProviderProfileFormType,
} from "@/types/profile.types";
import type { ProviderResponseType } from "@/types/user.types";

interface Props {
  initialData: ProviderResponseType;
}

const ProviderProfileSettings = ({ initialData }: Props) => {
  const { location } = useLocationStore();
  // const { mutate: updateProvider, isPending } = useUpdateProvider();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProviderProfileFormType>({
    resolver: zodResolver(providerProfileSchema),
    defaultValues: {
      phoneNumber: initialData?.phoneNumber || "",
      experience: initialData?.experience || "",
      bio: initialData?.bio || "",
      services: initialData?.services ? initialData.services.join(", ") : "",
      pricingBasis: initialData?.pricingBasis || undefined,
      startingRate: initialData?.startingRate || 0,
    },
  });

  const onSubmit = async (data: ProviderProfileFormType) => {
    // 1. Validate the Map State
    if (!location.lat || !location.lng) {
      console.warn("Please pin your base of operations on the map.");
      return;
    }

    // 2. Format the payload for your Java backend
    const formattedServices = data.services
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const payload = {
      ...data,
      services: formattedServices,
      latitude: location.lat,
      longitude: location.lng,
      address: location.address,
    };

    console.log("Valid Provider Payload to API:", payload);

    // 3. Fire the mutation
    // updateProvider(payload);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl grid gap-8 pb-10"
    >
      {/* 1. Core Identity */}
      <div className="bg-white p-6 rounded-2xl border border-muted/20 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2 mb-2">
          <h3 className="text-lg font-semibold text-text-dark">
            Professional Identity
          </h3>
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
          />
          {errors.phoneNumber && (
            <span className="text-xs text-red-500">
              {errors.phoneNumber.message}
            </span>
          )}
        </div>

        <div className="grid gap-1.5">
          <label className="text-[11px] font-semibold tracking-widest text-muted uppercase">
            Experience Level
          </label>
          <select
            {...register("experience")}
            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none bg-white transition-colors ${
              errors.experience
                ? "border-red-500"
                : "border-muted/30 focus:border-accent"
            }`}
          >
            <option value="">Select Experience</option>
            <option value="BEGINNER">Beginner (0-2 Yrs)</option>
            <option value="INTERMEDIATE">Intermediate (3-5 Yrs)</option>
            <option value="EXPERT">Expert (5+ Yrs)</option>
          </select>
          {errors.experience && (
            <span className="text-xs text-red-500">
              {errors.experience.message}
            </span>
          )}
        </div>

        <div className="grid gap-1.5 md:col-span-2">
          <label className="text-[11px] font-semibold tracking-widest text-muted uppercase">
            Bio
          </label>
          <textarea
            {...register("bio")}
            rows={4}
            placeholder="Tell customers about your expertise..."
            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none transition-colors ${
              errors.bio
                ? "border-red-500"
                : "border-muted/30 focus:border-accent"
            }`}
          />
          {errors.bio && (
            <span className="text-xs text-red-500">{errors.bio.message}</span>
          )}
        </div>
      </div>

      {/* 2. Services & Pricing */}
      <div className="bg-white p-6 rounded-2xl border border-muted/20 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2 mb-2">
          <h3 className="text-lg font-semibold text-text-dark">
            Services & Rates
          </h3>
        </div>

        <div className="grid gap-1.5 md:col-span-2">
          <label className="text-[11px] font-semibold tracking-widest text-muted uppercase">
            Services Offered (Comma Separated)
          </label>
          <input
            {...register("services")}
            type="text"
            placeholder="e.g. Plumbing, Pipe Fitting"
            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
              errors.services
                ? "border-red-500"
                : "border-muted/30 focus:border-accent"
            }`}
          />
          {errors.services && (
            <span className="text-xs text-red-500">
              {errors.services.message}
            </span>
          )}
        </div>

        <div className="grid gap-1.5">
          <label className="text-[11px] font-semibold tracking-widest text-muted uppercase">
            Pricing Basis
          </label>
          <select
            {...register("pricingBasis")}
            className="w-full px-4 py-3 rounded-xl border border-muted/30 text-sm focus:border-accent outline-none bg-white"
          >
            <option value="">Select Basis</option>
            {/* FIX: Aligned strictly to your market reality and Zod schema */}
            <option value="VISIT">Minimum Visit Fee</option>
            <option value="FIXED">Starting Service Price</option>
          </select>
          {errors.pricingBasis && (
            <span className="text-xs text-red-500">
              {errors.pricingBasis.message}
            </span>
          )}
        </div>

        <div className="grid gap-1.5">
          <label className="text-[11px] font-semibold tracking-widest text-muted uppercase">
            Starting Rate (NPR)
          </label>
          <input
            // FIX: Added valueAsNumber to prevent Zod crashes
            {...register("startingRate", { valueAsNumber: true })}
            type="number"
            placeholder="e.g. 500"
            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
              errors.startingRate
                ? "border-red-500"
                : "border-muted/30 focus:border-accent"
            }`}
          />
          {errors.startingRate && (
            <span className="text-xs text-red-500">
              {errors.startingRate.message}
            </span>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-muted/20 shadow-sm">
        <h3 className="text-lg font-semibold text-text-dark mb-4">
          Base of Operations
        </h3>
        <AddressFormStep />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-accent text-white rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 transition-all"
        >
          {isSubmitting ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </form>
  );
};

export default ProviderProfileSettings;
