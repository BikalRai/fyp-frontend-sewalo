import { providerKeys } from "@/lib/queryKeys";
import { updateProviderPersonalDetails } from "@/services/provider.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
