export interface PendingProviderDto {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  citizenshipFrontUrl: string;
  citizenshipBackUrl: string;
}

export interface LiquidityStat {
  date: string;
  jobs: number;
  bids: number;
  unlocks: number;
}

// ── Add these to @/types/admin.types.ts ──────────────────────────────

// ---------- Jobs (oversight) ----------
export type JobStatusFilter =
  | "ALL"
  | "OPEN"
  | "IN_PROGRESS"
  | "AWAITING_CONFIRMATION"
  | "COMPLETED"
  | "CANCELLED"
  | "EXPIRED"
  | "ANALYZING"
  | "FAILED";

export interface AdminJobDto {
  id: string;
  description: string;
  status:
    | "OPEN"
    | "IN_PROGRESS"
    | "AWAITING_CONFIRMATION"
    | "COMPLETED"
    | "CANCELLED"
    | "EXPIRED"
    | "ANALYZING"
    | "FAILED";
  customerName: string;
  bidCount: number;
  unlockCount: number;
  createdAt: string;
  expiresAt: string | null;
}

// ---------- Providers (oversight, full list) ----------
export type ProviderStatusFilter =
  | "ALL"
  | "APPROVED"
  | "SUSPENDED"
  | "PENDING_APPROVAL"
  | "REJECTED";

export interface AdminProviderListDto {
  id: string;
  fullName: string;
  email: string;
  status: "DRAFT" | "PENDING_APPROVAL" | "APPROVED" | "REJECTED" | "SUSPENDED";
  creditBalance: number;
  tier: "FREE" | "PRO" | "BUSINESS";
  jobsUnlocked: number;
  bidsPlaced: number;
  joinedAt: string; // ISO
}

// ---------- Transactions (financial oversight) ----------
export type TransactionStatusFilter =
  | "ALL"
  | "PENDING"
  | "COMPLETED"
  | "FAILED";

export interface AdminTransactionDto {
  id: string;
  pidx: string;
  providerName: string;
  purchaseType: "TOKEN_TOP_UP" | "SUBSCRIPTION_PRO" | "SUBSCRIPTION_BUSINESS";
  creditsRequested: number;
  amountPaisa: number;
  status: "PENDING" | "COMPLETED" | "FAILED";
  createdAt: string; // ISO
}

export interface RevenueSummaryDto {
  totalRevenuePaisa: number;
  totalTopUpPaisa: number;
  totalSubscriptionPaisa: number;
  completedCount: number;
  failedCount: number;
  pendingCount: number;
}
