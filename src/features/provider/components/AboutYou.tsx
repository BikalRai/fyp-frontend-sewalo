// 1. Import useFormContext and Controller
import { useFormContext, Controller } from "react-hook-form";

const AboutYou = () => {
  // 2. Grab register, control, and watch from the Master Clipboard
  const { register, control, watch } = useFormContext();

  // 3. Watch the specific fields we need for UI rendering
  const bioValue = watch("bio") || "";
  const pricingBasisValue = watch("pricingBasis") || "visit";

  return (
    // 4. Removed the <form> wrapper and local submit handler!
    <div className="space-y-6">
      {/* Short Bio Field */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-slate-700">
            Short bio
          </label>
          <span className="text-xs text-slate-400">
            {/* 5. Use the watched value for the character count */}
            {bioValue.length}/300
          </span>
        </div>
        <textarea
          {...register("bio")} // 6. Standard input, so we use register
          maxLength={300} // HTML native way to prevent typing past 300
          placeholder="A few sentences about your work, specialties, and what clients can expect."
          className="w-full min-h-30 p-4 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-400 resize-none transition-colors"
        />
      </div>

      {/* Localized Price Field */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Pricing Basis
        </label>

        {/* 7. Custom buttons, so we use Controller */}
        <Controller
          name="pricingBasis"
          control={control}
          render={({ field }) => (
            <div className="flex gap-2 p-1 bg-slate-100 rounded-lg max-w-md mb-4">
              <button
                type="button"
                onClick={() => field.onChange("visit")}
                className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${
                  field.value === "visit"
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Minimum Visit Fee
              </button>
              <button
                type="button"
                onClick={() => field.onChange("fixed")}
                className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${
                  field.value === "fixed"
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
            type="number"
            {...register("startingPrice")} // Standard input, so we use register
            placeholder="500"
            className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>

        {/* 8. Use the watched value to change the helper text */}
        <p className="text-xs text-slate-400 mt-2">
          {pricingBasisValue === "visit"
            ? "This is the baseline charge just to visit the location and inspect the job."
            : "The absolute lowest rate your service packages start from."}
        </p>
      </div>
    </div>
  );
};

export default AboutYou;
