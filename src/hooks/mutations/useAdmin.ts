import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPendingProviders,
  verifyProvider,
  rejectProvider,
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
      // Refresh the list immediately so the approved provider disappears
      queryClient.invalidateQueries({ queryKey: adminKeys.pendingProviders() });
      // Note: Removed toast.success here because toast.promise handles it in the component!
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
