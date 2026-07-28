import { providerKeys } from "@/lib/queryKeys";
import {
  getProviderProfile,
  updateProviderPersonalDetails,
} from "@/services/provider.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useProviderProfile = (isProvider?: boolean) => {
  return useQuery({
    // Use a specific key for the logged-in provider's profile
    queryKey: providerKeys.me(),
    queryFn: getProviderProfile,
    // Only run this query if we know the logged-in user is a provider
    enabled: isProvider === true,
  });
};

export const useUpdateProviderPersonal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProviderPersonalDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: providerKeys.me() });
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });
};
