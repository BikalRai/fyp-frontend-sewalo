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
  COMPLETED: "bg-[#d1fae5] text-[#059669]",
  PENDING: "bg-[#fef3c7] text-[#d97706]",
  FAILED: "bg-[#fee2e2] text-[#dc2626]",
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
      <div className="p-12 text-center text-danger font-medium">
        Failed to load transactions.
      </div>
    );

  const filteredTransactions =
    filter === "ALL"
      ? (transactions ?? [])
      : (transactions ?? []).filter((t) => t.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-dark">Transactions</h1>
        <p className="text-sm text-muted mt-1">
          Credit purchases and subscription payments via Khalti.
        </p>
      </div>

      {/* Revenue Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="bg-card-bg p-6 rounded-2xl border border-light-gray shadow-[0_2px_12px_rgba(25,53,87,0.04)]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
              Total Revenue
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#d1fae5] text-[#059669] flex items-center justify-center">
              <LuWallet size={20} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-text-dark">
            {formatRs(summary?.totalRevenuePaisa ?? 0)}
          </div>
          <p className="text-xs text-muted mt-1">
            {summary?.completedCount ?? 0} completed payments
          </p>
        </div>

        <div className="bg-card-bg p-6 rounded-2xl border border-light-gray shadow-[0_2px_12px_rgba(25,53,87,0.04)]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
              Top-ups vs Subscriptions
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#f3e8ff] text-[#7c3aed] flex items-center justify-center">
              <LuTrendingUp size={20} />
            </div>
          </div>
          <div className="text-lg font-bold text-text-dark">
            {formatRs(summary?.totalTopUpPaisa ?? 0)}{" "}
            <span className="text-muted font-medium text-sm">top-ups</span>
          </div>
          <div className="text-lg font-bold text-text-dark">
            {formatRs(summary?.totalSubscriptionPaisa ?? 0)}{" "}
            <span className="text-muted font-medium text-sm">subs</span>
          </div>
        </div>

        <div className="bg-card-bg p-6 rounded-2xl border border-light-gray shadow-[0_2px_12px_rgba(25,53,87,0.04)]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
              Needs Attention
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#fef3c7] text-[#d97706] flex items-center justify-center">
              <LuClock size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-4">
            <div>
              <span className="text-2xl font-extrabold text-[#d97706]">
                {summary?.pendingCount ?? 0}
              </span>
              <span className="text-xs text-muted ml-1">pending</span>
            </div>
            <div>
              <span className="text-2xl font-extrabold text-danger">
                {summary?.failedCount ?? 0}
              </span>
              <span className="text-xs text-muted ml-1">failed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
              filter === tab
                ? "bg-primary text-white shadow-[0_4px_12px_rgba(25,53,87,0.25)]"
                : "bg-card-bg text-muted border border-light-gray hover:border-primary hover:text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table / Empty State */}
      {filteredTransactions.length === 0 ? (
        <div className="bg-card-bg rounded-2xl border border-light-gray shadow-[0_2px_12px_rgba(25,53,87,0.04)] p-16 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-light text-muted flex items-center justify-center mb-4">
            <FiCheckCircle size={26} />
          </div>
          <h3 className="text-lg font-bold text-text-dark">
            No transactions found
          </h3>
          <p className="text-sm text-muted mt-1 max-w-sm">
            No transactions match this filter right now.
          </p>
        </div>
      ) : (
        <div className="bg-card-bg rounded-2xl border border-light-gray shadow-[0_2px_12px_rgba(25,53,87,0.04)] overflow-hidden">
          {/* Scrollable table wrapper — key for responsiveness */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px] lg:min-w-[850px]">
              <thead>
                <tr className="border-b border-light-gray bg-light">
                  <th className="text-left font-bold text-muted uppercase text-[10px] tracking-widest px-4 sm:px-6 py-4 whitespace-nowrap">
                    Provider
                  </th>
                  <th className="text-left font-bold text-muted uppercase text-[10px] tracking-widest px-4 sm:px-6 py-4 whitespace-nowrap">
                    Type
                  </th>
                  <th className="text-center font-bold text-muted uppercase text-[10px] tracking-widest px-4 sm:px-6 py-4 whitespace-nowrap">
                    Credits
                  </th>
                  <th className="text-right font-bold text-muted uppercase text-[10px] tracking-widest px-4 sm:px-6 py-4 whitespace-nowrap">
                    Amount
                  </th>
                  <th className="text-left font-bold text-muted uppercase text-[10px] tracking-widest px-4 sm:px-6 py-4 whitespace-nowrap">
                    Status
                  </th>
                  <th className="text-left font-bold text-muted uppercase text-[10px] tracking-widest px-4 sm:px-6 py-4 whitespace-nowrap">
                    Date
                  </th>
                  <th className="text-left font-bold text-muted uppercase text-[10px] tracking-widest px-4 sm:px-6 py-4 whitespace-nowrap">
                    pidx
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-gray">
                {filteredTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-light/60 transition-colors"
                  >
                    <td className="px-4 sm:px-6 py-4 font-semibold text-text-dark whitespace-nowrap">
                      {tx.providerName}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-muted whitespace-nowrap">
                      {PURCHASE_TYPE_LABEL[tx.purchaseType]}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-center text-muted font-medium whitespace-nowrap">
                      {tx.creditsRequested}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-right font-semibold text-text-dark whitespace-nowrap">
                      {formatRs(tx.amountPaisa)}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLES[tx.status]}`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-muted whitespace-nowrap">
                      {formatDate(tx.createdAt)}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-muted/60 font-mono text-xs whitespace-nowrap">
                      {tx.pidx}
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

export default AdminTransactionsPage;
