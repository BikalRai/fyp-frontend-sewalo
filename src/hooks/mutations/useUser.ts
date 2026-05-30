import { userKeys } from "@/lib/queryKeys";
import { userProfile } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export const useUserProfile = () => {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: userProfile,
    staleTime: 1000 * 60 * 5,
  });
};
