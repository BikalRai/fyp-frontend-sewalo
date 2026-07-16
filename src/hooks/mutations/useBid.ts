import { bidKeys, jobKeys } from "@/lib/queryKeys";
import { acceptBid, getJobBids } from "@/services/bid.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useJobBids = (id: string) => {
  return useQuery({
    queryKey: bidKeys.jobBids(id),
    queryFn: () => getJobBids(id),
  });
};

export const useAcceptBid = (jobId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bidId: string) => acceptBid(jobId, bidId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bidKeys.jobBids(jobId) });
      queryClient.invalidateQueries({ queryKey: jobKeys.detail(jobId) });
    },
  });
};
