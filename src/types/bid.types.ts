import { z } from "zod";

export const placeBidSchema = z.object({
  quotedPrice: z
    .number({
      error: "Please provide a valid number",
    })
    .positive("Price must be greater than 0"),
  message: z
    .string({
      error: "Please provide a valid string",
    })
    .min(10, "Message must be at least 10 characters")
    .max(300, "Message cannot exceed 300 characters"),
});

export type PlaceBidRequestDto = z.infer<typeof placeBidSchema>;

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
  subscriptionTier?: string;
}
