import SeSpinner from "@/components/spinner/SeSpinner";
import { useAllJobsAdmin } from "@/hooks/mutations/useAdmin";
import type { AdminJobDto, JobStatusFilter } from "@/types/admin.types";
import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { LuBriefcase } from "react-icons/lu";

const STATUS_TABS: JobStatusFilter[] = [
  "ALL",
  "OPEN",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
];

const STATUS_STYLES: Record<AdminJobDto["status"], string> = {
  ANALYZING: "bg-purple-50 text-purple-600",
  OPEN: "bg-blue-50 text-blue-600",
  IN_PROGRESS: "bg-amber-50 text-amber-600",
  AWAITING_CONFIRMATION: "bg-amber-50 text-amber-600",
  COMPLETED: "bg-emerald-50 text-emerald-600",
  CANCELLED: "bg-gray-100 text-gray-500",
  EXPIRED: "bg-gray-100 text-gray-500",
  FAILED: "bg-red-50 text-red-600",
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

  console.log(jobs, "JOBS");

  if (isLoading)
    return (
      <div className="p-12 flex justify-center">
        <SeSpinner />
      </div>
    );

  if (isError)
    return (
      <div className="p-12 text-center text-red-500 font-medium">
        Failed to load jobs.
      </div>
    );

  const filteredJobs =
    filter === "ALL"
      ? (jobs ?? [])
      : (jobs ?? []).filter((j) => j.status === filter);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Jobs Overview</h1>
        <p className="text-sm text-gray-500 mt-1">
          {jobs?.length ?? 0} total job{jobs?.length === 1 ? "" : "s"} posted on
          the marketplace.
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
      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-16 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center mb-4">
            <FiCheckCircle size={26} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No jobs found</h3>
          <p className="text-sm text-gray-500 mt-1 max-w-sm">
            No jobs match this filter right now.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left font-semibold text-gray-500 uppercase text-xs tracking-wider px-6 py-4">
                  Job
                </th>
                <th className="text-left font-semibold text-gray-500 uppercase text-xs tracking-wider px-6 py-4">
                  Customer
                </th>
                <th className="text-left font-semibold text-gray-500 uppercase text-xs tracking-wider px-6 py-4">
                  Status
                </th>
                <th className="text-center font-semibold text-gray-500 uppercase text-xs tracking-wider px-6 py-4">
                  Bids
                </th>
                <th className="text-center font-semibold text-gray-500 uppercase text-xs tracking-wider px-6 py-4">
                  Unlocks
                </th>
                <th className="text-left font-semibold text-gray-500 uppercase text-xs tracking-wider px-6 py-4">
                  Posted
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredJobs.map((job) => (
                <tr
                  key={job.id}
                  className="hover:bg-gray-50/60 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <LuBriefcase size={16} />
                      </div>
                      <span className="font-semibold text-gray-900">
                        {job.description}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {job.customerName}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[job.status]}`}
                    >
                      {job.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600 font-medium">
                    {job.bidCount}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600 font-medium">
                    {job.unlockCount}/3
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {formatDate(job.createdAt)}
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

export default AdminJobsPage;
