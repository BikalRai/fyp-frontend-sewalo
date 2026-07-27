import { usePendingProviders } from "@/hooks/mutations/useAdmin";
import {
  LuShieldCheck,
  LuBriefcase,
  LuTrendingUp,
  LuUsers,
} from "react-icons/lu";
import SeSpinner from "@/components/spinner/SeSpinner";
import { useNavigate } from "react-router-dom";

const AdminDashboardHome = () => {
  const navigate = useNavigate();
  const { data: pendingProviders, isLoading } = usePendingProviders();

  if (isLoading) {
    return (
      <div className="p-12 flex justify-center">
        <SeSpinner />
      </div>
    );
  }

  const pendingCount = pendingProviders?.length || 0;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Admin Control Center
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of marketplace activity, provider verifications, and system
          health.
        </p>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Pending Approvals */}
        <div
          onClick={() => navigate("/admin/providers")}
          className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-primary transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Pending Providers
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <LuUsers size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900">
              {pendingCount}
            </span>
            <span className="text-xs text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-full">
              Action Required
            </span>
          </div>
        </div>

        {/* Card 2: Active System Status */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Platform Status
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <LuShieldCheck size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-emerald-600">
              Healthy
            </span>
            <span className="text-xs text-gray-400 font-medium">
              WebSocket Live
            </span>
          </div>
        </div>

        {/* Card 3: Marketplace Volume (Placeholder for scaling) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Total Job RFQs
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <LuBriefcase size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900">--</span>
            <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">
              Live Feed
            </span>
          </div>
        </div>

        {/* Card 4: Growth Metric */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Conversion Rate
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <LuTrendingUp size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900">94.2%</span>
            <span className="text-xs text-emerald-600 font-semibold">
              +2.4% this week
            </span>
          </div>
        </div>
      </div>

      {/* Quick Action Banner */}
      <div className="bg-linear-to-r from-primary to-primary/80 rounded-2xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div>
          <h2 className="text-xl font-bold">
            Review Pending Provider Approvals
          </h2>
          <p className="text-sm text-light/80 mt-1 max-w-xl">
            You have {pendingCount} provider(s) waiting for credential review.
            Approving them allows them to purchase tokens and bid on customer
            job requests.
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/providers")}
          className="bg-accent hover:bg-accent/90 text-primary font-bold px-6 py-3 rounded-xl transition-colors shrink-0 shadow-sm"
        >
          View Approvals Queue
        </button>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
