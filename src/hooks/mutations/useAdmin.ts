import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPendingProviders, verifyProvider } from "@/services/admin.service";
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
      toast.success("Provider has been verified successfully!");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const msg =
          error?.response?.data?.details || "Failed to fetch pending providers";
        toast.error(msg);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });
};
