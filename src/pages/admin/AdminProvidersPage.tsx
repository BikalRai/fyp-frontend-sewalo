import {
  usePendingProviders,
  useVerifyProvider,
} from "@/hooks/mutations/useAdmin";
import SeSpinner from "@/components/spinner/SeSpinner";
import { LuBuilding2, LuMail } from "react-icons/lu";
import { IoCheckmarkCircle } from "react-icons/io5";
import { FiCheckCircle } from "react-icons/fi";

const AdminProvidersPage = () => {
  const { data: providers, isLoading, isError } = usePendingProviders();
  const { mutate: verifyProvider, isPending: isVerifying } =
    useVerifyProvider();

  if (isLoading) {
    return (
      <div className="p-12 flex justify-center">
        <SeSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-12 text-center text-red-500 font-medium">
        Failed to load pending provider approvals.
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Provider Verification Queue
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Approve or reject service provider accounts applying to join Sewalo.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {providers?.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <IoCheckmarkCircle size={24} />
            </div>
            <h3 className="text-base font-bold text-gray-900">
              All caught up!
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              There are no providers waiting for verification right now.
            </p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                <th className="px-6 py-4 font-semibold">Business / Provider</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {providers?.map((provider) => (
                <tr
                  key={provider.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                        <LuBuilding2 size={18} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">
                          {provider.businessName || "Unnamed Business"}
                        </div>
                        <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                          <LuMail size={12} /> ID: {provider.id.slice(0, 8)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">
                    <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs">
                      {provider.categoryName || "General Services"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/50">
                      Pending Review
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => verifyProvider(provider.id)}
                      disabled={isVerifying}
                      className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                    >
                      <FiCheckCircle size={16} />
                      Approve Provider
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminProvidersPage;
