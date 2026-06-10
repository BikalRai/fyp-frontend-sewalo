import { useFormContext } from "react-hook-form";
import type { MasterProviderType } from "@/types/provider.types";

const PreviewProfile = () => {
  // 1. Grab getValues from the Master Clipboard
  const { getValues } = useFormContext<MasterProviderType>();

  // 2. Read the entire finalized object
  const data = getValues();

  const displayImage =
    data.imageUrl instanceof File
      ? URL.createObjectURL(data.imageUrl)
      : data.imageUrl || "/default-avatar.png";

  return (
    <div className="flex flex-col gap-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
      {/* Header Profile Section */}
      <div className="flex items-center gap-6 border-b border-slate-200 pb-6">
        <img
          src={displayImage || "/default-avatar.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm"
        />
        <div>
          {/* Note: You might want to pull the user's Name from your global Auth context here */}
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            Your Public Profile
          </h3>
          <p className="text-slate-500 font-medium">{data.phoneNumber}</p>
        </div>
      </div>

      {/* Services & Rates */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Services Offered
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.services?.map((service) => (
              <span
                key={service}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Base Rate
          </h4>
          <p className="text-lg font-medium text-slate-800">
            Rs. {data.startingRate}{" "}
            <span className="text-sm text-slate-500 font-normal">
              ({data.pricingBasis})
            </span>
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Experience: {data.experience}
          </p>
        </div>
      </div>

      {/* Bio */}
      <div>
        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
          About You
        </h4>
        <p className="text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-100">
          {data.bio}
        </p>
      </div>

      {/* Work Area */}
      <div>
        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Service Areas
        </h4>
        <p className="text-slate-700 font-medium">
          {data.workArea?.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default PreviewProfile;
