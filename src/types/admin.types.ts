export interface PendingProviderDto {
  id: string; // The providerId
  userId: string;
  businessName?: string;
  categoryName?: string;
  isVerified: boolean;
  // Add any other fields your ProviderProfile entity returns that you want to see in the table
}
