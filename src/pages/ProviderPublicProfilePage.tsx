import { usePublicProviderProfile } from "@/hooks/mutations/useProvider";
import { useParams } from "react-router-dom";
import { Rating } from "@mantine/core";

const ProviderPublicProfilePage = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const { data: profile, isLoading } = usePublicProviderProfile(providerId!);

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (!profile)
    return <div className="p-8 text-center">Provider not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 lg:p-8 space-y-8">
      <div className="flex items-center gap-4">
        {profile.imageUrl && (
          <img
            src={profile.imageUrl}
            alt={profile.fullName}
            className="w-16 h-16 rounded-full object-cover"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {profile.fullName}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            {profile.avgRating != null ? (
              <>
                <Rating value={profile.avgRating} readOnly fractions={2} />
                <span className="text-sm text-gray-500">
                  {profile.avgRating.toFixed(1)} ({profile.ratingCount} reviews)
                </span>
              </>
            ) : (
              <span className="text-sm text-gray-400">No ratings yet</span>
            )}
          </div>
        </div>
      </div>

      {profile.services.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {profile.services.map((s) => (
            <span
              key={s}
              className="text-xs font-semibold px-2.5 py-1 rounded-md bg-gray-100 text-gray-600"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Reviews</h2>
        {profile.recentReviews.length === 0 ? (
          <p className="text-sm text-gray-400">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {profile.recentReviews.map((r) => (
              <div key={r.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-gray-900">
                    {r.customerName}
                  </span>
                  <Rating value={r.score} readOnly size="sm" />
                </div>
                {r.review && (
                  <p className="text-sm text-gray-600 mt-1">{r.review}</p>
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
