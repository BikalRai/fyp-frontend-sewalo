import SeSpinner from "@/components/spinner/SeSpinner";
import {
  useAllTransactions,
  useRevenueSummary,
} from "@/hooks/mutations/useAdmin";
import type {
  AdminTransactionDto,
  TransactionStatusFilter,
} from "@/types/admin.types";
import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { LuClock, LuTrendingUp, LuWallet } from "react-icons/lu";

const STATUS_TABS: TransactionStatusFilter[] = [
  "ALL",
  "COMPLETED",
  "PENDING",
  "FAILED",
];

const STATUS_STYLES: Record<AdminTransactionDto["status"], string> = {
  COMPLETED: "bg-emerald-50 text-emerald-600",
  PENDING: "bg-amber-50 text-amber-600",
  FAILED: "bg-red-50 text-red-600",
};

const PURCHASE_TYPE_LABEL: Record<AdminTransactionDto["purchaseType"], string> =
  {
    TOKEN_TOP_UP: "Credit Top-up",
    SUBSCRIPTION_PRO: "Pro Subscription",
    SUBSCRIPTION_BUSINESS: "Business Subscription",
  };

const formatRs = (paisa: number) =>
  `Rs ${(paisa / 100).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const AdminTransactionsPage = () => {
  const { data: transactions, isLoading, isError } = useAllTransactions();
  const { data: summary, isLoading: summaryLoading } = useRevenueSummary();
  const [filter, setFilter] = useState<TransactionStatusFilter>("ALL");

  if (isLoading || summaryLoading)
    return (
      <div className="p-12 flex justify-center">
        <SeSpinner />
      </div>
    );

  if (isError)
    return (
      <div className="p-12 text-center text-red-500 font-medium">
        Failed to load transactions.
      </div>
    );

  const filteredTransactions =
    filter === "ALL"
      ? (transactions ?? [])
      : (transactions ?? []).filter((t) => t.status === filter);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <p className="text-sm text-gray-500 mt-1">
          Credit purchases and subscription payments via Khalti.
        </p>
      </div>

      {/* Revenue Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Total Revenue
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <LuWallet size={20} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-gray-900">
            {formatRs(summary?.totalRevenuePaisa ?? 0)}
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {summary?.completedCount ?? 0} completed payments
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Top-ups vs Subscriptions
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <LuTrendingUp size={20} />
            </div>
          </div>
          <div className="text-lg font-bold text-gray-900">
            {formatRs(summary?.totalTopUpPaisa ?? 0)}{" "}
            <span className="text-gray-400 font-medium text-sm">top-ups</span>
          </div>
          <div className="text-lg font-bold text-gray-900">
            {formatRs(summary?.totalSubscriptionPaisa ?? 0)}{" "}
            <span className="text-gray-400 font-medium text-sm">subs</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Needs Attention
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <LuClock size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-4">
            <div>
              <span className="text-2xl font-extrabold text-amber-600">
                {summary?.pendingCount ?? 0}
              </span>
              <span className="text-xs text-gray-400 ml-1">pending</span>
            </div>
            <div>
              <span className="text-2xl font-extrabold text-red-600">
                {summary?.failedCount ?? 0}
              </span>
              <span className="text-xs text-gray-400 ml-1">failed</span>
            </div>
          </div>
        </div>
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
            {tab}
          </button>
        ))}
      </div>

      {/* Table / Empty State */}
      {filteredTransactions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-16 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center mb-4">
            <FiCheckCircle size={26} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            No transactions found
          </h3>
          <p className="text-sm text-gray-500 mt-1 max-w-sm">
            No transactions match this filter right now.
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
                  Type
                </th>
                <th className="text-center font-semibold text-gray-500 uppercase text-xs tracking-wider px-6 py-4">
                  Credits
                </th>
                <th className="text-right font-semibold text-gray-500 uppercase text-xs tracking-wider px-6 py-4">
                  Amount
                </th>
                <th className="text-left font-semibold text-gray-500 uppercase text-xs tracking-wider px-6 py-4">
                  Status
                </th>
                <th className="text-left font-semibold text-gray-500 uppercase text-xs tracking-wider px-6 py-4">
                  Date
                </th>
                <th className="text-left font-semibold text-gray-500 uppercase text-xs tracking-wider px-6 py-4">
                  pidx
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-gray-50/60 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {tx.providerName}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {PURCHASE_TYPE_LABEL[tx.purchaseType]}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600 font-medium">
                    {tx.creditsRequested}
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-gray-900">
                    {formatRs(tx.amountPaisa)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[tx.status]}`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {formatDate(tx.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-gray-400 font-mono text-xs">
                    {tx.pidx}
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

export default AdminTransactionsPage;
