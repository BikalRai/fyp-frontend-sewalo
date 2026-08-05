import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProviderCredits,
  initiateCreditPayment,
  initiateEsewaPayment,
  verifyCreditPayment,
  verifyEsewaPayment,
} from "@/services/billing.service";
import { billingKeys } from "@/lib/queryKeys";
import type { PurchaseType } from "@/types/billing.types";
import type { ApiErrorResponse } from "@/types/api.types";
import { getEffectiveSubscription } from "@/lib/subscription";
import { toast } from "sonner";
import type { AxiosError } from "axios";

export const useProviderCredits = () => {
  const query = useQuery({
    queryKey: billingKeys.credits(),
    queryFn: getProviderCredits,
    staleTime: 1000 * 60 * 5,
  });

  const subscription = getEffectiveSubscription(query.data);

  return { ...query, ...subscription };
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
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data.details);
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

export const useInitiateEsewa = () => {
  return useMutation({
    mutationFn: ({
      amount,
      purchaseType,
    }: {
      amount: number;
      purchaseType: PurchaseType;
    }) => initiateEsewaPayment(amount, purchaseType),
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(
        error.response?.data?.message || "Failed to initiate eSewa payment.",
      );
    },
  });
};

export const useVerifyEsewa = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (refId: string) => verifyEsewaPayment(refId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: billingKeys.credits() });
    },
    onError: (error: ApiErrorResponse) => {
      console.error("Failed to verify eSewa payment:", error.message);
    },
  });
};
