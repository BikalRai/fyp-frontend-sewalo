export interface BidResponse {
  id: string;
  jobId: string;
  providerId: string;
  providerName: string;
  providerImageUrl: string | null;
  providerBio: string | null;
  providerStartingRate: number | null;
  message: string;
  quotedPrice: number;
  pricingBasis: "VISIT" | "FIXED" | string;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "WITHDRAWN";
  contactUnlocked: boolean;
  providerPhone: string | null;
  createdAt: string;
}
