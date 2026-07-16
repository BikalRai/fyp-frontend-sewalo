import { api } from "@/config/api";
import type { BidResponse } from "@/types/bid.types";

export const getJobBids = async (id: string): Promise<BidResponse[]> => {
  const { data } = await api.get(`/jobs/${id}/bids`);

  return data.data;
};

export const acceptBid = async (
  jobId: string,
  bidId: string,
): Promise<BidResponse> => {
  return await api
    .patch(`/jobs/${jobId}/bids/${bidId}/accept`)
    .then((res) => res.data.data);
};
