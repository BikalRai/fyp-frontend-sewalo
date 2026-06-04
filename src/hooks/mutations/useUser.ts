import { userKeys } from "@/lib/queryKeys";
import { fetchUserProfile, updateUserAddress } from "@/services/user.service";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
