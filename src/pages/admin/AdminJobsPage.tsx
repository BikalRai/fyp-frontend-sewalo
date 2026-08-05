import SeSpinner from "@/components/spinner/SeSpinner";
import { useAllJobsAdmin } from "@/hooks/mutations/useAdmin";
import type { AdminJobDto, JobStatusFilter } from "@/types/admin.types";
import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import {
  LuBriefcase,
  LuLayers,
  LuCircleDot,
  LuTimer,
  LuCheckCheck,
  LuCircle,
} from "react-icons/lu";

const STATUS_TABS: JobStatusFilter[] = [
  "ALL",
  "OPEN",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
];

const STATUS_STYLES: Record<AdminJobDto["status"], string> = {
  ANALYZING: "bg-[#f3e8ff] text-[#7c3aed]",
  OPEN: "bg-[#dbeafe] text-[#2563eb]",
  IN_PROGRESS: "bg-[#fef3c7] text-[#d97706]",
  AWAITING_CONFIRMATION: "bg-[#fef3c7] text-[#d97706]",
  COMPLETED: "bg-[#d1fae5] text-[#059669]",
  CANCELLED: "bg-[#f3f4f6] text-[#6b7280]",
  EXPIRED: "bg-[#f3f4f6] text-[#6b7280]",
  FAILED: "bg-[#fee2e2] text-[#dc2626]",
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  ALL: <LuLayers size={18} />,
  OPEN: <LuCircleDot size={18} />,
  IN_PROGRESS: <LuTimer size={18} />,
  COMPLETED: <LuCheckCheck size={18} />,
  CANCELLED: <LuCircle size={18} />,
};

const formatDate = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

const AdminJobsPage = () => {
  const { data: jobs, isLoading, isError } = useAllJobsAdmin();
  const [filter, setFilter] = useState<JobStatusFilter>("ALL");

  if (isLoading)
    return (
      <div className="p-12 flex justify-center">
        <SeSpinner />
      </div>
    );

  if (isError)
    return (
      <div className="p-12 text-center text-danger font-medium">
        Failed to load jobs.
      </div>
    );

  const filteredJobs =
    filter === "ALL"
      ? (jobs ?? [])
      : (jobs ?? []).filter((j) => j.status === filter);

  const statusCounts = STATUS_TABS.reduce(
    (acc, tab) => {
      acc[tab] =
        tab === "ALL"
          ? (jobs ?? []).length
          : (jobs ?? []).filter((j) => j.status === tab).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-text-dark">Jobs Overview</h1>
          <p className="text-sm text-muted mt-1">
            {jobs?.length ?? 0} total job{jobs?.length === 1 ? "" : "s"} posted
            on the marketplace.
          </p>
        </div>
      </div>

      {/* Filter Tabs — Icon + Count */}
      <div className="flex gap-2 flex-wrap">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
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
      {filteredJobs.length === 0 ? (
        <div className="bg-card-bg rounded-2xl border border-light-gray shadow-[0_2px_12px_rgba(25,53,87,0.04)] p-16 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-light text-muted flex items-center justify-center mb-4">
            <FiCheckCircle size={26} />
          </div>
          <h3 className="text-lg font-bold text-text-dark">No jobs found</h3>
          <p className="text-sm text-muted mt-1 max-w-sm">
            No jobs match this filter right now.
          </p>
        </div>
      ) : (
        <div className="bg-card-bg rounded-2xl border border-light-gray shadow-[0_2px_12px_rgba(25,53,87,0.04)] overflow-hidden">
          {/* Scrollable table wrapper */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[800px]">
              <thead>
                <tr className="border-b border-light-gray bg-light">
                  <th className="text-left font-bold text-muted uppercase text-[10px] tracking-widest px-6 py-4 whitespace-nowrap">
                    Job
                  </th>
                  <th className="text-left font-bold text-muted uppercase text-[10px] tracking-widest px-6 py-4 whitespace-nowrap">
                    Customer
                  </th>
                  <th className="text-left font-bold text-muted uppercase text-[10px] tracking-widest px-6 py-4 whitespace-nowrap">
                    Status
                  </th>
                  <th className="text-center font-bold text-muted uppercase text-[10px] tracking-widest px-6 py-4 whitespace-nowrap">
                    Bids
                  </th>
                  <th className="text-center font-bold text-muted uppercase text-[10px] tracking-widest px-6 py-4 whitespace-nowrap">
                    Unlocks
                  </th>
                  <th className="text-left font-bold text-muted uppercase text-[10px] tracking-widest px-6 py-4 whitespace-nowrap">
                    Posted
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-gray">
                {filteredJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="hover:bg-light/60 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <LuBriefcase size={16} />
                        </div>
                        <span className="font-semibold text-text-dark max-w-[200px] truncate">
                          {job.description}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted whitespace-nowrap">
                      {job.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLES[job.status]}`}
                      >
                        {job.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-muted font-medium whitespace-nowrap">
                      {job.bidCount}
                    </td>
                    <td className="px-6 py-4 text-center text-muted font-medium whitespace-nowrap">
                      {job.unlockCount}/3
                    </td>
                    <td className="px-6 py-4 text-muted whitespace-nowrap">
                      {formatDate(job.createdAt)}
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

export default AdminJobsPage;
