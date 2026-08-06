import { userKeys } from "@/lib/queryKeys";
import {
  fetchUserProfile,
  updateCustomerProfile,
  updateUserAddress,
} from "@/services/user.service";
import { useAuthStore } from "@/store/authStore";
import type { ApiErrorResponse } from "@/types/api.types";
import type { UpdateCustomerPayload } from "@/types/user.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUserProfile = () => {
  const { accessToken } = useAuthStore();
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: fetchUserProfile,
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateUserAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserAddress,
    onSuccess: (data) => {
      console.log("Address updated successfully!", data);

      queryClient.invalidateQueries({ queryKey: userKeys.me() });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useUpdateCustomerProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // Wire the service function directly into the mutationFn
    mutationFn: (payload: UpdateCustomerPayload) =>
      updateCustomerProfile(payload),

    onSuccess: () => {
      toast.success("Profile updated successfully");

      // Force the profile data to instantly refresh across the app
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
    },
    onError: (error: ApiErrorResponse) => {
      console.log(error);

      toast.error(error.details);
    },
  });
};
