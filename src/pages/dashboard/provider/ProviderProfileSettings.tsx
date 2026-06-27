import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocationStore } from "@/store/jobStore";
import AddressFormStep from "@/pages/onboarding/user/AddressFormStep";
import {
  providerProfileSchema,
  type ProviderProfileFormType,
} from "@/types/profile.types";
import type { ProviderResponseType } from "@/types/user.types";
import {
  IoPersonOutline,
  IoConstructOutline,
  IoLocationOutline,
  IoSaveOutline,
  IoWalletOutline,
  IoSparklesOutline,
} from "react-icons/io5";

interface Props {
  initialData: ProviderResponseType;
}

// Mock plan data — swap with real data when backend is ready
const mockPlan = {
  name: "Starter",
  tokensRemaining: 3,
  tokensTotal: 5,
};

const ProviderProfileSettings = ({ initialData }: Props) => {
  // ---- ALL LOGIC UNCHANGED ----
  const { location } = useLocationStore();

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
      startingRate: initialData?.startingRate || 0 || null,
    },
  });

  const onSubmit = async (data: ProviderProfileFormType) => {
    if (!location.lat || !location.lng) {
      console.warn("Please pin your base of operations on the map.");
      return;
    }
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
    // updateProvider(payload);
  };
  // ---- END LOGIC ----

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl border text-sm text-text-dark outline-none transition-colors bg-light ${
      hasError ? "border-soft-danger" : "border-light-gray focus:border-accent"
    }`;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl grid gap-6 pb-10"
    >
      {/* 1. Professional Identity */}
      <div className="bg-card-bg rounded-2xl border border-light-gray shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-light-gray">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
            <IoPersonOutline className="text-accent text-base" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-primary">
              Professional Identity
            </h3>
            <p className="text-xs text-muted">How customers will know you</p>
          </div>
        </div>

        <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-1.5">
            <label className="text-[11px] font-bold tracking-widest text-muted uppercase">
              Phone Number
            </label>
            <input
              {...register("phoneNumber")}
              type="tel"
              className={inputClass(!!errors.phoneNumber)}
            />
            {errors.phoneNumber && (
              <span className="text-xs text-soft-danger">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>

          <div className="grid gap-1.5">
            <label className="text-[11px] font-bold tracking-widest text-muted uppercase">
              Experience Level
            </label>
            <select
              {...register("experience")}
              className={inputClass(!!errors.experience)}
            >
              <option value="">Select experience</option>
              <option value="BEGINNER">Beginner (0–2 yrs)</option>
              <option value="INTERMEDIATE">Intermediate (3–5 yrs)</option>
              <option value="EXPERT">Expert (5+ yrs)</option>
            </select>
            {errors.experience && (
              <span className="text-xs text-soft-danger">
                {errors.experience.message}
              </span>
            )}
          </div>

          <div className="grid gap-1.5 md:col-span-2">
            <label className="text-[11px] font-bold tracking-widest text-muted uppercase">
              Bio
            </label>
            <textarea
              {...register("bio")}
              rows={4}
              placeholder="Tell customers about your expertise..."
              className={`${inputClass(!!errors.bio)} resize-none`}
            />
            {errors.bio && (
              <span className="text-xs text-soft-danger">
                {errors.bio.message}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Services & Rates */}
      <div className="bg-card-bg rounded-2xl border border-light-gray shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-light-gray">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
            <IoConstructOutline className="text-accent text-base" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-primary">Services & Rates</h3>
            <p className="text-xs text-muted">
              What you offer and what you charge
            </p>
          </div>
        </div>

        <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-1.5 md:col-span-2">
            <label className="text-[11px] font-bold tracking-widest text-muted uppercase">
              Services Offered
            </label>
            <input
              {...register("services")}
              type="text"
              placeholder="e.g. Plumbing, Pipe Fitting, Drain Cleaning"
              className={inputClass(!!errors.services)}
            />
            <p className="text-xs text-muted">
              Separate each service with a comma
            </p>
            {errors.services && (
              <span className="text-xs text-soft-danger">
                {errors.services.message}
              </span>
            )}
          </div>

          <div className="grid gap-1.5">
            <label className="text-[11px] font-bold tracking-widest text-muted uppercase">
              Pricing Basis
            </label>
            <select
              {...register("pricingBasis")}
              className={inputClass(!!errors.pricingBasis)}
            >
              <option value="">Select basis</option>
              <option value="VISIT">Minimum visit fee</option>
              <option value="FIXED">Starting service price</option>
            </select>
            {errors.pricingBasis && (
              <span className="text-xs text-soft-danger">
                {errors.pricingBasis.message}
              </span>
            )}
          </div>

          <div className="grid gap-1.5">
            <label className="text-[11px] font-bold tracking-widest text-muted uppercase">
              Starting Rate (NPR)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted pointer-events-none">
                Rs.
              </span>
              <input
                {...register("startingRate", { valueAsNumber: true })}
                type="number"
                placeholder="500"
                className={`${inputClass(!!errors.startingRate)} pl-9`}
              />
            </div>
            {errors.startingRate && (
              <span className="text-xs text-soft-danger">
                {errors.startingRate.message}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 3. Base of Operations */}
      <div className="bg-card-bg rounded-2xl border border-light-gray shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-light-gray">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
            <IoLocationOutline className="text-accent text-base" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-primary">
              Base of Operations
            </h3>
            <p className="text-xs text-muted">Your primary working area</p>
          </div>
        </div>
        <div className="px-6 py-5">
          <AddressFormStep />
        </div>
      </div>

      {/* 4. Plan & Tokens */}
      <div className="bg-card-bg rounded-2xl border border-light-gray shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-light-gray">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
            <IoWalletOutline className="text-accent text-base" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-primary">Plan & Tokens</h3>
            <p className="text-xs text-muted">
              Your current plan and unlock credits
            </p>
          </div>
        </div>

        <div className="px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Plan info */}
          <div className="flex flex-col gap-3 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-primary">
                {mockPlan.name} Plan
              </span>
              <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full">
                Active
              </span>
            </div>

            {/* Token bar */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs text-muted font-medium">
                  Tokens remaining
                </span>
                <span className="text-xs font-bold text-primary">
                  {mockPlan.tokensRemaining} / {mockPlan.tokensTotal}
                </span>
              </div>
              <div className="w-full bg-light-gray h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-500"
                  style={{
                    width: `${(mockPlan.tokensRemaining / mockPlan.tokensTotal) * 100}%`,
                  }}
                />
              </div>
              <p className="text-xs text-muted mt-1.5">
                Each token unlocks one job lead.
              </p>
            </div>
          </div>

          {/* Upgrade CTA */}
          <div className="bg-primary rounded-2xl px-5 py-4 flex flex-col gap-2 min-w-50">
            <div className="flex items-center gap-1.5">
              <IoSparklesOutline className="text-white/60 text-sm" />
              <span className="text-xs font-bold text-white/60 uppercase tracking-widest">
                Pro Plan
              </span>
            </div>
            <p className="text-sm font-bold text-white leading-snug">
              Unlimited leads & 0% commission
            </p>
            <button
              type="button"
              className="mt-1 w-full py-2 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent/90 transition-all"
            >
              Upgrade to Pro
            </button>
          </div>
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
          {isSubmitting ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </form>
  );
};

export default ProviderProfileSettings;
