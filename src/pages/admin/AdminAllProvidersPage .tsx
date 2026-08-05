import SeSpinner from "@/components/spinner/SeSpinner";
import { useAllProvidersAdmin } from "@/hooks/mutations/useAdmin";
import type {
  AdminProviderListDto,
  ProviderStatusFilter,
} from "@/types/admin.types";
import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import {
  LuUserRound,
  LuUsers,
  LuShieldCheck,
  LuClock,
  LuBan,
  LuCircle,
} from "react-icons/lu";

const STATUS_TABS: ProviderStatusFilter[] = [
  "ALL",
  "APPROVED",
  "PENDING_APPROVAL",
  "SUSPENDED",
  "REJECTED",
];

const STATUS_STYLES: Record<AdminProviderListDto["status"], string> = {
  DRAFT: "bg-[#f3f4f6] text-[#6b7280]",
  PENDING_APPROVAL: "bg-[#fef3c7] text-[#d97706]",
  APPROVED: "bg-[#d1fae5] text-[#059669]",
  REJECTED: "bg-[#fee2e2] text-[#dc2626]",
  SUSPENDED: "bg-[#fee2e2] text-[#dc2626]",
};

const TIER_STYLES: Record<AdminProviderListDto["tier"], string> = {
  FREE: "bg-[#f3f4f6] text-[#6b7280] border-[#e5e7eb]",
  PRO: "bg-[#f3e8ff] text-[#7c3aed] border-[#ddd6fe]",
  BUSINESS: "bg-[#dbeafe] text-[#2563eb] border-[#bfdbfe]",
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  ALL: <LuUsers size={18} />,
  APPROVED: <LuShieldCheck size={18} />,
  PENDING_APPROVAL: <LuClock size={18} />,
  SUSPENDED: <LuBan size={18} />,
  REJECTED: <LuCircle size={18} />,
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

  if (isLoading)
    return (
      <div className="p-12 flex justify-center">
        <SeSpinner />
      </div>
    );

  if (isError)
    return (
      <div className="p-12 text-center text-danger font-medium">
        Failed to load providers.
      </div>
    );

  const filteredProviders =
    filter === "ALL"
      ? (providers ?? [])
      : (providers ?? []).filter((p) => p.status === filter);

  const statusCounts = STATUS_TABS.reduce(
    (acc, tab) => {
      acc[tab] =
        tab === "ALL"
          ? (providers ?? []).length
          : (providers ?? []).filter((p) => p.status === tab).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    // min-w-0 prevents the flex container from stretching beyond the viewport
    <div className="space-y-6 w-full min-w-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-text-dark">All Providers</h1>
          <p className="text-sm text-muted mt-1">
            {providers?.length ?? 0} provider
            {providers?.length === 1 ? "" : "s"} registered on the marketplace.
          </p>
        </div>
      </div>

      {/* Filter Tabs — Mobile Swipeable Row */}
      {/* overflow-x-auto and whitespace-nowrap replace flex-wrap to create a clean horizontal scroll on small screens */}
      <div className="flex gap-2 overflow-x-auto whitespace-nowrap pb-2 w-full custom-scrollbar-hide">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 shrink-0 ${
              filter === tab
                ? "bg-primary text-white shadow-[0_4px_12px_rgba(25,53,87,0.25)]"
                : "bg-card-bg text-muted border border-light-gray hover:border-primary hover:text-primary"
            }`}
          >
            <span className={filter === tab ? "text-white" : "text-muted"}>
              {STATUS_ICONS[tab]}
            </span>
            {tab.replace("_", " ")}
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                filter === tab
                  ? "bg-white/20 text-white"
                  : "bg-light text-muted"
              }`}
            >
              {statusCounts[tab]}
            </span>
          </button>
        ))}
      </div>

      {/* Table / Empty State */}
      {filteredProviders.length === 0 ? (
        <div className="bg-card-bg rounded-2xl border border-light-gray shadow-[0_2px_12px_rgba(25,53,87,0.04)] p-16 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-light text-muted flex items-center justify-center mb-4">
            <FiCheckCircle size={26} />
          </div>
          <h3 className="text-lg font-bold text-text-dark">
            No providers found
          </h3>
          <p className="text-sm text-muted mt-1 max-w-sm">
            No providers match this filter right now.
          </p>
        </div>
      ) : (
        <div className="bg-card-bg rounded-2xl border border-light-gray shadow-[0_2px_12px_rgba(25,53,87,0.04)] overflow-hidden w-full">
          {/* Scrollable table wrapper */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-sm min-w-[850px]">
              <thead>
                <tr className="border-b border-light-gray bg-light">
                  <th className="text-left font-bold text-muted uppercase text-[10px] tracking-widest px-6 py-4 whitespace-nowrap">
                    Provider
                  </th>
                  <th className="text-left font-bold text-muted uppercase text-[10px] tracking-widest px-6 py-4 whitespace-nowrap">
                    Status
                  </th>
                  <th className="text-left font-bold text-muted uppercase text-[10px] tracking-widest px-6 py-4 whitespace-nowrap">
                    Tier
                  </th>
                  <th className="text-center font-bold text-muted uppercase text-[10px] tracking-widest px-6 py-4 whitespace-nowrap">
                    Credits
                  </th>
                  <th className="text-center font-bold text-muted uppercase text-[10px] tracking-widest px-6 py-4 whitespace-nowrap">
                    Unlocks
                  </th>
                  <th className="text-center font-bold text-muted uppercase text-[10px] tracking-widest px-6 py-4 whitespace-nowrap">
                    Bids
                  </th>
                  <th className="text-left font-bold text-muted uppercase text-[10px] tracking-widest px-6 py-4 whitespace-nowrap">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-gray">
                {filteredProviders.map((provider) => (
                  <tr
                    key={provider.id}
                    className="hover:bg-light/60 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <LuUserRound size={16} />
                        </div>
                        <div>
                          <div className="font-semibold text-text-dark">
                            {provider.fullName}
                          </div>
                          <div className="text-xs text-muted">
                            {provider.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLES[provider.status]}`}
                      >
                        {provider.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${TIER_STYLES[provider.tier]}`}
                      >
                        {provider.tier}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-muted font-medium whitespace-nowrap">
                      {provider.creditBalance}
                    </td>
                    <td className="px-6 py-4 text-center text-muted font-medium whitespace-nowrap">
                      {provider.jobsUnlocked}
                    </td>
                    <td className="px-6 py-4 text-center text-muted font-medium whitespace-nowrap">
                      {provider.bidsPlaced}
                    </td>
                    <td className="px-6 py-4 text-muted whitespace-nowrap">
                      {formatDate(provider.joinedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAllProvidersPage;
