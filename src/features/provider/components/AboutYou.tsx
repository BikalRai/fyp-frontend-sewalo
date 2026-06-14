import { useFormContext, Controller } from "react-hook-form";

const AboutYou = () => {
  const { register, control, watch } = useFormContext();

  const bioValue = watch("bio") || "";
  // 1. Default to the exact uppercase string your Zod schema expects
  const pricingBasisValue = watch("pricingBasis") || "VISIT";

  return (
    <div className="space-y-6">
      {/* Short Bio Field */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-slate-700">
            Short bio
          </label>
          <span className="text-xs text-slate-400">{bioValue.length}/300</span>
        </div>
        <textarea
          {...register("bio")}
          maxLength={300}
          placeholder="A few sentences about your work, specialties, and what clients can expect."
          className="w-full min-h-30 p-4 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-400 resize-none transition-colors"
        />
      </div>

      {/* Localized Price Field */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Pricing Basis
        </label>

        <Controller
          name="pricingBasis"
          control={control}
          render={({ field }) => (
            <div className="flex gap-2 p-1 bg-slate-100 rounded-lg max-w-md mb-4">
              <button
                type="button"
                // 2. Send exactly "VISIT"
                onClick={() => field.onChange("VISIT")}
                className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${
                  field.value === "VISIT"
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Minimum Visit Fee
              </button>
              <button
                type="button"
                // 3. Send exactly "FIXED"
                onClick={() => field.onChange("FIXED")}
                className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${
                  field.value === "FIXED"
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Starting Service Price
              </button>
            </div>
          )}
        />

        {/* Price Input */}
        <div className="relative max-w-md">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">
            Rs.
          </span>
          <input
            // 4. Use valid HTML type
            type="number"
            // 5. Force RHF to parse it as an integer for Zod and Java
            {...register("startingRate", { valueAsNumber: false })}
            placeholder="500"
            className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>

        {/* 6. Update conditional logic to match uppercase */}
        <p className="text-xs text-slate-400 mt-2">
          {pricingBasisValue === "VISIT"
            ? "This is the baseline charge just to visit the location and inspect the job."
            : "The absolute lowest rate your service packages start from."}
        </p>
      </div>
    </div>
  );
};

export default AboutYou;
