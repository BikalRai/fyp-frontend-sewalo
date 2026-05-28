import { useState } from "react";

interface AboutYouData {
  bio: string;
  startingPrice: number;
  priceType: "visit" | "fixed";
}

const AboutYou = () => {
  const [formData, setFormData] = useState<AboutYouData>({
    bio: "",
    startingPrice: 500,
    priceType: "visit",
  });

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, 300); // Enforce 300 char limit
    setFormData((prev) => ({ ...prev, bio: value }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setFormData((prev) => ({ ...prev, startingPrice: value }));
  };

  const handleTypeChange = (type: "visit" | "fixed") => {
    setFormData((prev) => ({ ...prev, priceType: type }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Provider Setup:", formData);
    // Proceed to trigger lead bidding system initialization
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Short Bio Field */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-slate-700">
              Short bio
            </label>
            <span className="text-xs text-slate-400">
              {formData.bio.length}/300
            </span>
          </div>
          <textarea
            value={formData.bio}
            onChange={handleBioChange}
            placeholder="A few sentences about your work, specialties, and what clients can expect."
            className="w-full min-h-30 p-4 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-400 resize-none transition-colors"
            required
          />
        </div>

        {/* Localized Price Field */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Pricing Basis
          </label>

          {/* Subtle toggle tabs to switch between Visit Fee and Base Rate */}
          <div className="flex gap-2 p-1 bg-slate-100 rounded-lg max-w-md mb-4">
            <button
              type="button"
              onClick={() => handleTypeChange("visit")}
              className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${
                formData.priceType === "visit"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Minimum Visit Fee
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange("fixed")}
              className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${
                formData.priceType === "fixed"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Starting Service Price
            </button>
          </div>

          {/* Price Input */}
          <div className="relative max-w-md">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">
              Rs.
            </span>
            <input
              type="number"
              value={formData.startingPrice || ""}
              onChange={handlePriceChange}
              placeholder="500"
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              required
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {formData.priceType === "visit"
              ? "This is the baseline charge just to visit the location and inspect the job."
              : "The absolute lowest rate your service packages start from."}
          </p>
        </div>
      </form>
    </div>
  );
};

export default AboutYou;
