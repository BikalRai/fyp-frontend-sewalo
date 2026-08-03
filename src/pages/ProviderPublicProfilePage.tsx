import { usePublicProviderProfile } from "@/hooks/mutations/useProvider";
import { useParams } from "react-router-dom";
import { Rating } from "@mantine/core";
import { LuMessageSquare, LuStar, LuUser } from "react-icons/lu";
import { FaCircleCheck } from "react-icons/fa6";

const ProviderPublicProfilePage = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const { data: profile, isLoading } = usePublicProviderProfile(providerId!);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
          <div className="w-48 h-6 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
        <LuUser className="w-16 h-16 mb-4 text-gray-300" />
        <h2 className="text-xl font-semibold text-gray-900">
          Provider Not Found
        </h2>
        <p>This profile may have been removed or suspended.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-8 space-y-6">
      {/* --- Main Profile Identity Card --- */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Cover Banner */}
        <div className="h-32 sm:h-40 bg-linear-to-r from-primary to-primary/80"></div>

        <div className="px-6 sm:px-10 pb-8 sm:pb-10 relative flex flex-col items-center text-center">
          {/* Avatar (Overlapping the banner) */}
          <div className="-mt-16 sm:-mt-20 mb-4 relative">
            {profile.imageUrl ? (
              <img
                src={profile.imageUrl}
                alt={profile.fullName}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-md bg-white"
              />
            ) : (
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-md bg-primary text-white flex items-center justify-center text-4xl font-bold">
                {profile.fullName.charAt(0)}
              </div>
            )}
            <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-sm">
              <FaCircleCheck className="w-6 h-6 text-emerald-500" />
            </div>
          </div>

          {/* Name & Subscription Badge */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center justify-center gap-3 flex-wrap">
            {profile.fullName}
            {profile.activeTier === "PRO" && (
              <span className="bg-blue-50 text-blue-600 border border-blue-200 text-xs font-bold uppercase tracking-wider py-1 px-2.5 rounded-full">
                Pro
              </span>
            )}
            {profile.activeTier === "BUSINESS" && (
              <span className="bg-purple-50 text-purple-600 border border-purple-200 text-xs font-bold uppercase tracking-wider py-1 px-2.5 rounded-full">
                Business
              </span>
            )}
          </h1>

          {/* Rating Summary Pill */}
          <div className="flex items-center gap-2 mt-3 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 shadow-inner">
            {profile.avgRating != null && profile.avgRating > 0 ? (
              <>
                <Rating
                  value={profile.avgRating}
                  readOnly
                  fractions={2}
                  size="sm"
                />
                <span className="text-sm font-semibold text-gray-700">
                  {profile.avgRating.toFixed(1)}
                </span>
                <span className="text-sm font-medium text-gray-400">
                  ({profile.ratingCount}{" "}
                  {profile.ratingCount === 1 ? "review" : "reviews"})
                </span>
              </>
            ) : (
              <span className="text-sm font-medium text-gray-500 flex items-center gap-1.5">
                <LuStar className="w-4 h-4 text-gray-400" /> New to Sewalo
              </span>
            )}
          </div>

          {/* Services Offered */}
          {profile.services.length > 0 && (
            <div className="mt-8 w-full max-w-2xl">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Verified Skills
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {profile.services.map((s) => (
                  <span
                    key={s}
                    className="text-sm font-medium px-4 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-default"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- Reviews Section Card --- */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sm:p-10">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <LuMessageSquare className="text-primary" /> Client Reviews
        </h2>

        {profile.recentReviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">
              This provider hasn't received any reviews yet.
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Hire them to be the first!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.recentReviews.map((r) => (
              <div
                key={r.id}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center justify-between mb-3 border-b border-gray-200/60 pb-3">
                  <span className="font-bold text-sm text-gray-900">
                    {r.customerName}
                  </span>
                  <Rating value={r.score} readOnly size="sm" />
                </div>
                {r.review ? (
                  <p className="text-sm text-gray-600 leading-relaxed italic">
                    "{r.review}"
                  </p>
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    No written feedback provided.
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderPublicProfilePage;
