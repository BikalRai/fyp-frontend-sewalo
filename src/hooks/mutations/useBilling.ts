import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProviderCredits,
  initiateCreditPayment,
  verifyCreditPayment,
} from "@/services/billing.service";
import { billingKeys } from "@/lib/queryKeys";
import type { PurchaseType } from "@/types/billing.types";
import type { ApiErrorResponse } from "@/types/api.types";

export const useProviderCredits = () => {
  return useQuery({
    queryKey: billingKeys.credits(),
    queryFn: getProviderCredits,
    staleTime: 1000 * 60 * 5,
  });
};

export const useInitiatePayment = () => {
  return useMutation({
    mutationFn: ({
      creditsRequested = 0,
      purchaseType,
    }: {
      creditsRequested?: number;
      purchaseType: PurchaseType;
    }) => initiateCreditPayment(creditsRequested, purchaseType),
    onError: (error: ApiErrorResponse) => {
      console.error("Failed to initiate Khalti session:", error.message);
    },
  });
};

export const useVerifyPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pidx: string) => verifyCreditPayment(pidx),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: billingKeys.credits(),
      });
    },
    onError: (error: ApiErrorResponse) => {
      console.error("Failed to verify Khalti payment:", error.message);
    },
  });
};
