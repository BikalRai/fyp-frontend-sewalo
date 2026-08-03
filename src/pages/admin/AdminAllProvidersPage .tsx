import SeSpinner from "@/components/spinner/SeSpinner";
import { useAllProvidersAdmin } from "@/hooks/mutations/useAdmin";
import type {
  AdminProviderListDto,
  ProviderStatusFilter,
} from "@/types/admin.types";
import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { LuUserRound } from "react-icons/lu";

const STATUS_TABS: ProviderStatusFilter[] = [
  "ALL",
  "APPROVED",
  "PENDING_APPROVAL",
  "SUSPENDED",
  "REJECTED",
];

const STATUS_STYLES: Record<AdminProviderListDto["status"], string> = {
  DRAFT: "bg-gray-100 text-gray-500",
  PENDING_APPROVAL: "bg-amber-50 text-amber-600",
  APPROVED: "bg-emerald-50 text-emerald-600",
  REJECTED: "bg-red-50 text-red-600",
  SUSPENDED: "bg-red-50 text-red-600",
};

const TIER_STYLES: Record<AdminProviderListDto["tier"], string> = {
  FREE: "bg-gray-100 text-gray-500",
  PRO: "bg-purple-50 text-purple-600",
  BUSINESS: "bg-blue-50 text-blue-600",
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const AdminAllProvidersPage = () => {
  const { data: providers, isLoading, isError } = useAllProvidersAdmin();
  const [filter, setFilter] = useState<ProviderStatusFilter>("ALL");

  console.log(providers, "PROVIDERS");

  if (isLoading)
    return (
      <div className="p-12 flex justify-center">
        <SeSpinner />
      </div>
    );

  if (isError)
    return (
      <div className="p-12 text-center text-red-500 font-medium">
        Failed to load providers.
      </div>
    );

  const filteredProviders =
    filter === "ALL"
      ? (providers ?? [])
      : (providers ?? []).filter((p) => p.status === filter);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">All Providers</h1>
        <p className="text-sm text-gray-500 mt-1">
          {providers?.length ?? 0} provider{providers?.length === 1 ? "" : "s"}{" "}
          registered on the marketplace.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              filter === tab
                ? "bg-primary text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {tab.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Table / Empty State */}
      {filteredProviders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-16 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center mb-4">
            <FiCheckCircle size={26} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            No providers found
          </h3>
          <p className="text-sm text-gray-500 mt-1 max-w-sm">
            No providers match this filter right now.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left font-semibold text-gray-500 uppercase text-xs tracking-wider px-6 py-4">
                  Provider
                </th>
                <th className="text-left font-semibold text-gray-500 uppercase text-xs tracking-wider px-6 py-4">
                  Status
                </th>
                <th className="text-left font-semibold text-gray-500 uppercase text-xs tracking-wider px-6 py-4">
                  Tier
                </th>
                <th className="text-center font-semibold text-gray-500 uppercase text-xs tracking-wider px-6 py-4">
                  Credits
                </th>
                <th className="text-center font-semibold text-gray-500 uppercase text-xs tracking-wider px-6 py-4">
                  Unlocks
                </th>
                <th className="text-center font-semibold text-gray-500 uppercase text-xs tracking-wider px-6 py-4">
                  Bids
                </th>
                <th className="text-left font-semibold text-gray-500 uppercase text-xs tracking-wider px-6 py-4">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProviders.map((provider) => (
                <tr
                  key={provider.id}
                  className="hover:bg-gray-50/60 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <LuUserRound size={16} />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {provider.fullName}
                        </div>
                        <div className="text-xs text-gray-400">
                          {provider.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[provider.status]}`}
                    >
                      {provider.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TIER_STYLES[provider.tier]}`}
                    >
                      {provider.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600 font-medium">
                    {provider.creditBalance}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600 font-medium">
                    {provider.jobsUnlocked}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600 font-medium">
                    {provider.bidsPlaced}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {formatDate(provider.joinedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminAllProvidersPage;
