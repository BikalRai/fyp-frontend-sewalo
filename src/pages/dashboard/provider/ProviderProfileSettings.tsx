import { useEffect, useMemo } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocationStore } from "@/store/jobStore";
import AddressFormStep from "@/pages/onboarding/user/AddressFormStep";
import {
  useProviderProfile,
  useUpdateProviderProfile,
} from "@/hooks/mutations/useProvider";
import { useProviderCredits } from "@/hooks/mutations/useBilling";
import {
  providerProfileFormSchema,
  type ProviderProfileFormType,
} from "@/types/provider.types";
import {
  IoPersonOutline,
  IoConstructOutline,
  IoLocationOutline,
  IoSaveOutline,
  IoWalletOutline,
  IoSparklesOutline,
} from "react-icons/io5";
import { useUserProfile } from "@/hooks/mutations/useUser";
import ProviderUploadImage from "@/features/provider/components/ProviderUploadImage";
import { toast } from "sonner";
import { uploadToCloudinary } from "@/lib/uploadImage";

const servicesList = [
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Carpentry",
  "Painting",
  "Moving",
  "Tutoring",
  "Beauty",
];

const districts = ["Kathmandu", "Lalitpur", "Bhaktapur"];

const ProviderProfileSettings = () => {
  const { setLocation, location } = useLocationStore();
  const { mutate: updateProfile, isPending } = useUpdateProviderProfile();
  const { data: credits } = useProviderCredits();

  const { data: userProfile } = useUserProfile();
  const isProvider = userProfile?.role === "PROVIDER";
  const { data: provider } = useProviderProfile(isProvider);

  const formValues = useMemo(() => {
    return {
      phoneNumber:
        provider?.user?.phoneNumber || userProfile?.phoneNumber || "",
      experience: provider?.experience?.trim() || "",
      bio: provider?.bio || "",
      services: provider?.services || [],
      workArea: provider?.workDistrict || [],
      pricingBasis: provider?.pricingBasis?.trim() || "",
      startingRate: provider?.startingRate ? Number(provider.startingRate) : 0,
      imageUrl: provider?.user?.imageUrl || userProfile?.imageUrl || "",
    };
  }, [provider, userProfile]);

  const methods = useForm<ProviderProfileFormType>({
    resolver: zodResolver(providerProfileFormSchema),
    defaultValues: {
      phoneNumber: "",
      experience: "",
      bio: "",
      services: [],
      workArea: [],
      pricingBasis: "",
      startingRate: 0,
      imageUrl: "",
    },
    values: formValues,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: ProviderProfileFormType) => {
    if (!location.lat || !location.lng) {
      toast.warning("Please pin your location on the map");
      return;
    }

    let finalImageUrl = userProfile?.imageUrl || "";

    // 1. If a new file was uploaded, send it to Cloudinary first
    if (data.imageUrl instanceof File) {
      try {
        toast.loading("Uploading profile image...", { id: "uploadImg" });
        finalImageUrl = await uploadToCloudinary(data.imageUrl);
        toast.dismiss("uploadImg");
      } catch (error) {
        toast.dismiss("uploadImg");
        toast.error("Failed to upload image. Please try again.");
        console.error(error);
        return; // Stop execution if upload fails
      }
    } else if (typeof data.imageUrl === "string") {
      finalImageUrl = data.imageUrl;
    }

    // 2. Dispatch the mutation with the guaranteed string URL
    updateProfile({
      ...data,
      latitude: location.lat,
      longitude: location.lng,
      address: location.address,
      imageUrl: finalImageUrl,
    });
  };

  useEffect(() => {
    const initialLat = provider?.latitude || userProfile?.lat;
    const initialLng = provider?.longitude || userProfile?.lng;
    const initialAddress = provider?.address || userProfile?.address || "";

    if (!location.address && initialLat && initialLng) {
      setLocation(initialLat, initialLng, initialAddress);
    }
  }, [provider, userProfile, location.address, setLocation]);

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-2.5 rounded-lg border text-sm text-text-dark outline-none transition-colors bg-white ${
      hasError
        ? "border-soft-danger"
        : "border-light-gray focus:border-accent focus:ring-1 focus:ring-accent/20"
    }`;

  const tokenBalance = credits?.balance ?? 0;
  const activeTier = credits?.activeTier ?? "FREE";

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-12 pb-16 pt-6"
      >
        {/* 1. Professional Identity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <IoPersonOutline className="text-accent text-lg" />
              <h3 className="text-base font-semibold text-primary">
                Professional Identity
              </h3>
            </div>
            <p className="text-sm text-muted">
              This information will be displayed publicly so customers can
              identify and trust your services.
            </p>
          </div>

          <div className="md:col-span-2 bg-card-bg rounded-2xl border border-light-gray shadow-sm overflow-hidden p-6 sm:p-8">
            <div className="mb-8 pb-8 border-b border-light-gray">
              <ProviderUploadImage />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <label className="text-xs font-semibold text-primary uppercase tracking-wide">
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

              <div className="grid gap-2">
                <label className="text-xs font-semibold text-primary uppercase tracking-wide">
                  Experience Level
                </label>
                <select
                  {...register("experience")}
                  className={inputClass(!!errors.experience)}
                >
                  <option value="">Select experience</option>
                  <option value="1-2">1-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
                {errors.experience && (
                  <span className="text-xs text-soft-danger">
                    {errors.experience.message}
                  </span>
                )}
              </div>

              <div className="grid gap-2 md:col-span-2">
                <label className="text-xs font-semibold text-primary uppercase tracking-wide">
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
        </div>

        <hr className="border-light-gray" />

        {/* 2. Services & Rates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <IoConstructOutline className="text-accent text-lg" />
              <h3 className="text-base font-semibold text-primary">
                Services & Rates
              </h3>
            </div>
            <p className="text-sm text-muted">
              Define your core offerings, operational areas, and pricing
              strategy.
            </p>
          </div>

          <div className="md:col-span-2 bg-card-bg rounded-2xl border border-light-gray shadow-sm overflow-hidden p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-2 md:col-span-2">
                <label className="text-xs font-semibold text-primary uppercase tracking-wide">
                  Services Offered
                </label>
                <Controller
                  name="services"
                  control={control}
                  render={({ field }) => {
                    const handleToggle = (service: string) => {
                      const currentValues = field.value || [];
                      if (currentValues.includes(service)) {
                        field.onChange(
                          currentValues.filter(
                            (item: string) => item !== service,
                          ),
                        );
                      } else {
                        field.onChange([...currentValues, service]);
                      }
                    };

                    return (
                      <div className="flex items-center flex-wrap gap-2">
                        {servicesList.map((service, i) => {
                          const isSelected = (field.value || []).includes(
                            service,
                          );
                          return (
                            <button
                              type="button"
                              key={i}
                              onClick={() => handleToggle(service)}
                              className={`leading-5 border flex items-center rounded-full py-2 px-4 text-sm transition-colors duration-150 cursor-pointer ${
                                isSelected
                                  ? "bg-primary text-white border-primary shadow-sm"
                                  : "bg-bg border-light-gray text-text-dark hover:border-muted/50"
                              }`}
                            >
                              {service}
                            </button>
                          );
                        })}
                      </div>
                    );
                  }}
                />
                {errors.services && (
                  <span className="text-xs text-soft-danger">
                    {errors.services.message}
                  </span>
                )}
              </div>

              <div className="grid gap-2 md:col-span-2">
                <label className="text-xs font-semibold text-primary uppercase tracking-wide">
                  Work Areas
                </label>
                <Controller
                  name="workArea"
                  control={control}
                  render={({ field }) => {
                    const handleToggle = (district: string) => {
                      const currentValues = field.value || [];
                      if (currentValues.includes(district)) {
                        field.onChange(
                          currentValues.filter(
                            (item: string) => item !== district,
                          ),
                        );
                      } else {
                        field.onChange([...currentValues, district]);
                      }
                    };

                    return (
                      <div className="flex items-center flex-wrap gap-2">
                        {districts.map((district, i) => {
                          const isSelected = (field.value || []).includes(
                            district,
                          );
                          return (
                            <button
                              type="button"
                              key={i}
                              onClick={() => handleToggle(district)}
                              className={`leading-5 border flex items-center rounded-full py-2 px-4 text-sm transition-colors duration-150 cursor-pointer ${
                                isSelected
                                  ? "bg-primary text-white border-primary shadow-sm"
                                  : "bg-bg border-light-gray text-text-dark hover:border-muted/50"
                              }`}
                            >
                              {district}
                            </button>
                          );
                        })}
                      </div>
                    );
                  }}
                />
                {errors.workArea && (
                  <span className="text-xs text-soft-danger">
                    {errors.workArea.message}
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <label className="text-xs font-semibold text-primary uppercase tracking-wide">
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

              <div className="grid gap-2">
                <label className="text-xs font-semibold text-primary uppercase tracking-wide">
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
        </div>

        <hr className="border-light-gray" />

        {/* 3. Base of Operations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <IoLocationOutline className="text-accent text-lg" />
              <h3 className="text-base font-semibold text-primary">
                Base of Operations
              </h3>
            </div>
            <p className="text-sm text-muted">
              Pin your primary location. This helps us match you with local job
              leads.
            </p>
          </div>

          <div className="md:col-span-2 bg-card-bg rounded-2xl border border-light-gray shadow-sm overflow-hidden p-6 sm:p-8">
            <AddressFormStep />
          </div>
        </div>

        <hr className="border-light-gray" />

        {/* 4. Plan & Tokens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <IoWalletOutline className="text-accent text-lg" />
              <h3 className="text-base font-semibold text-primary">
                Plan & Tokens
              </h3>
            </div>
            <p className="text-sm text-muted">
              Manage your subscription tier and track your available lead
              tokens.
            </p>
          </div>

          <div className="md:col-span-2 bg-card-bg rounded-2xl border border-light-gray shadow-sm overflow-hidden p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-primary">
                    {activeTier === "FREE" ? "Starter" : activeTier} Plan
                  </span>
                  <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                    Active
                  </span>
                </div>

                <div className="bg-light rounded-xl p-4 border border-light-gray mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted font-medium">
                      Tokens remaining
                    </span>
                    <span className="text-2xl font-black text-primary">
                      {tokenBalance}
                    </span>
                  </div>
                  <p className="text-xs text-muted mt-2">
                    Each token unlocks one customer lead.
                  </p>
                </div>
              </div>

              {activeTier === "FREE" && (
                <div className="bg-primary rounded-2xl p-5 flex flex-col gap-3 min-w-60 shadow-md">
                  <div className="flex items-center gap-2">
                    <IoSparklesOutline className="text-accent text-sm" />
                    <span className="text-xs font-bold text-accent uppercase tracking-widest">
                      Pro Plan
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white/90 leading-snug">
                    Unlock unlimited leads & 0% platform commission.
                  </p>
                  <button
                    type="button"
                    className="mt-2 w-full py-2.5 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent/90 transition-all shadow-sm"
                  >
                    Upgrade Now
                  </button>
                </div>
              )}
            </div>
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
              {isPending ? "Saving changes..." : "Save Profile"}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default ProviderProfileSettings;
