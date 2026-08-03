import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPendingProviders,
  verifyProvider,
  rejectProvider,
  getLiquidityStats,
  getAllAdminJobs,
  getAllAdminProviders,
  getAllTransactions,
  getRevenueSummary,
} from "@/services/admin.service";
import { toast } from "sonner";
import axios from "axios";
import { adminKeys } from "@/lib/queryKeys";

export const usePendingProviders = () => {
  return useQuery({
    queryKey: adminKeys.pendingProviders(),
    queryFn: getPendingProviders,
  });
};

export const useVerifyProvider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (providerId: string) => verifyProvider(providerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.pendingProviders() });
      queryClient.invalidateQueries({ queryKey: adminKeys.providers() });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const msg =
          error?.response?.data?.details || "Failed to approve provider";
        toast.error(msg);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });
};

// --- NEW HOOK ---
export const useRejectProvider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: string; reason: string }) =>
      rejectProvider(params),
    onSuccess: () => {
      // Instantly clear the rejected provider from the UI list
      queryClient.invalidateQueries({ queryKey: adminKeys.pendingProviders() });
      queryClient.invalidateQueries({ queryKey: adminKeys.providers() });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const msg =
          error?.response?.data?.details || "Failed to reject provider";
        toast.error(msg);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });
};

export const useLiquidityStats = () => {
  return useQuery({
    queryKey: adminKeys.liquidityStats(),
    queryFn: getLiquidityStats,
    refetchInterval: 60000, // Background poll every 60s for the live dashboard feel
    staleTime: 30000, // Prevent unnecessary refetches if navigating away and back quickly
  });
};

export const useAllJobsAdmin = () => {
  return useQuery({
    queryKey: adminKeys.jobs(),
    queryFn: getAllAdminJobs,
  });
};

export const useAllProvidersAdmin = () => {
  return useQuery({
    queryKey: adminKeys.providers(),
    queryFn: getAllAdminProviders,
  });
};

export const useAllTransactions = () =>
  useQuery({
    queryKey: adminKeys.transactions(),
    queryFn: getAllTransactions,
  });

export const useRevenueSummary = () =>
  useQuery({
    queryKey: adminKeys.revenueSummary(),
    queryFn: getRevenueSummary,
  });
