import { api } from "@/config/api";
import type {
  AdminJobDto,
  AdminProviderListDto,
  AdminTransactionDto,
  PendingProviderDto,
  RevenueSummaryDto,
} from "@/types/admin.types";
import type { LiquidityData } from "@/types/chart.types";

const ADMIN_PREFIX = "admin";

export const getPendingProviders = async (): Promise<PendingProviderDto[]> => {
  const { data } = await api.get(`/${ADMIN_PREFIX}/providers/pending`); // your actual route
  return data.data;
};

// UPDATED: Matches the backend @PostMapping("/{providerId}/approve")
export const verifyProvider = async (providerId: string): Promise<void> => {
  const { data } = await api.post(
    `/${ADMIN_PREFIX}/providers/${providerId}/approve`,
  );
  return data.data;
};

// NEW: Matches the backend @PostMapping("/{providerId}/reject")
export const rejectProvider = async (params: {
  id: string;
  reason: string;
}): Promise<void> => {
  const { data } = await api.post(
    `/${ADMIN_PREFIX}/providers/${params.id}/reject`,
    {
      reason: params.reason, // This maps to the KycRejectionDto in Spring Boot
    },
  );
  return data.data;
};

export const getLiquidityStats = async (): Promise<LiquidityData[]> => {
  const { data } = await api.get(`/${ADMIN_PREFIX}/liquidity-stats`);

  return data.data;
};

export const getAllAdminJobs = async (): Promise<AdminJobDto[]> => {
  const { data } = await api.get(`${ADMIN_PREFIX}/jobs`);

  return data.data;
};

export const getAllAdminProviders = async (): Promise<
  AdminProviderListDto[]
> => {
  const { data } = await api.get(`${ADMIN_PREFIX}/providers`);

  return data.data;
};

export const getAllTransactions = async (): Promise<AdminTransactionDto[]> => {
  const { data } = await api.get(`/${ADMIN_PREFIX}/transactions`);
  return data.data;
};

export const getRevenueSummary = async (): Promise<RevenueSummaryDto> => {
  const { data } = await api.get(`/${ADMIN_PREFIX}/transactions/summary`);
  return data.data;
};
