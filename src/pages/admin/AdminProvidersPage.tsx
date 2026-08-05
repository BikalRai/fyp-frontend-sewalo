import {
  usePendingProviders,
  useVerifyProvider,
  useRejectProvider,
} from "@/hooks/mutations/useAdmin";
import SeSpinner from "@/components/spinner/SeSpinner";
import { LuX, LuUserRound } from "react-icons/lu";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useState } from "react";
import { toast } from "sonner";
import type { PendingProviderDto } from "@/types/admin.types";

const AdminProvidersPage = () => {
  const { data: providers, isLoading, isError } = usePendingProviders();
  const { mutateAsync: verifyProvider, isPending: isVerifying } =
    useVerifyProvider();
  const { mutateAsync: rejectProvider, isPending: isRejecting } =
    useRejectProvider();

  const [selectedProvider, setSelectedProvider] =
    useState<PendingProviderDto | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectInput, setShowRejectInput] = useState(false);

  const handleApprove = async () => {
    if (!selectedProvider) return;
    toast.promise(verifyProvider(selectedProvider.id), {
      loading: "Approving provider...",
      success: () => {
        setSelectedProvider(null);
        return "Provider approved successfully!";
      },
      error: "Failed to approve provider.",
    });
  };

  const handleReject = async () => {
    if (!selectedProvider) return;
    if (!rejectionReason.trim()) {
      toast.error("Please provide a rejection reason.");
      return;
    }
    toast.promise(
      rejectProvider({ id: selectedProvider.id, reason: rejectionReason }),
      {
        loading: "Rejecting provider...",
        success: () => {
          setSelectedProvider(null);
          setRejectionReason("");
          setShowRejectInput(false);
          return "Provider rejected. An email has been sent.";
        },
        error: "Failed to reject provider.",
      },
    );
  };

  const closeModal = () => {
    setSelectedProvider(null);
    setRejectionReason("");
    setShowRejectInput(false);
  };

  if (isLoading)
    return (
      <div className="p-12 flex justify-center">
        <SeSpinner />
      </div>
    );

  if (isError)
    return (
      <div className="p-12 text-center text-red-500 font-medium">
        Failed to load queue.
      </div>
    );

  const pendingCount = providers?.length || 0;

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Provider Approvals</h1>
        <p className="text-sm text-gray-500 mt-1">
          {pendingCount} provider{pendingCount === 1 ? "" : "s"} waiting for
          credential review.
        </p>
      </div>

      {/* Table / Empty State */}
      {pendingCount === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-16 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <FiCheckCircle size={26} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">All caught up</h3>
          <p className="text-sm text-gray-500 mt-1 max-w-sm">
            There are no providers currently waiting on approval.
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
                  Email
                </th>
                <th className="text-left font-semibold text-gray-500 uppercase text-xs tracking-wider px-6 py-4">
                  Phone
                </th>
                <th className="text-right font-semibold text-gray-500 uppercase text-xs tracking-wider px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {providers?.map((provider) => (
                <tr
                  key={provider.id}
                  className="hover:bg-gray-50/60 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <LuUserRound size={16} />
                      </div>
                      <span className="font-semibold text-gray-900">
                        {provider.fullName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{provider.email}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {provider.phoneNumber}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedProvider(provider)}
                      className="px-4 py-2 rounded-lg text-sm font-semibold text-primary border border-primary/20 hover:bg-primary/5 transition-colors"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Review Modal */}
      {selectedProvider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Review Identity Documents
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedProvider.fullName} ({selectedProvider.email})
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-500"
              >
                <LuX size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 bg-gray-50 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Citizenship Front
                  </label>
                  <img
                    src={selectedProvider.citizenshipFrontUrl}
                    alt="ID Front"
                    className="w-full h-auto rounded-xl border border-gray-200 shadow-sm object-cover bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Citizenship Back
                  </label>
                  <img
                    src={selectedProvider.citizenshipBackUrl}
                    alt="ID Back"
                    className="w-full h-auto rounded-xl border border-gray-200 shadow-sm object-cover bg-white"
                  />
                </div>
              </div>

              {showRejectInput && (
                <div className="bg-red-50 p-4 rounded-xl border border-red-100 space-y-3">
                  <label className="block text-sm font-bold text-red-900">
                    Why are you rejecting these documents?
                  </label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="e.g., The front image is too blurry to read the ID number..."
                    className="w-full p-3 rounded-lg border border-red-200 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                    rows={3}
                  />
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-100 bg-white flex justify-end gap-3 shrink-0">
              {!showRejectInput ? (
                <>
                  <button
                    onClick={() => setShowRejectInput(true)}
                    className="px-6 py-2.5 rounded-xl font-bold text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={handleApprove}
                    disabled={isVerifying}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors disabled:opacity-50"
                  >
                    <FiCheckCircle size={18} /> Approve Account
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowRejectInput(false)}
                    className="px-6 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Cancel Rejection
                  </button>
                  <button
                    onClick={handleReject}
                    disabled={isRejecting}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    <FiXCircle size={18} /> Confirm Rejection
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProvidersPage;
