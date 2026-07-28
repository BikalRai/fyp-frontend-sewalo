import { api } from "@/config/api";
import type { PendingProviderDto } from "@/types/admin.types";

export const getPendingProviders = async (): Promise<PendingProviderDto[]> => {
  const { data } = await api.get("/admin/providers/pending"); // your actual route
  return data.data;
};

// UPDATED: Matches the backend @PostMapping("/{providerId}/approve")
export const verifyProvider = async (providerId: string): Promise<void> => {
  const { data } = await api.post(`/admin/providers/${providerId}/approve`);
  return data.data;
};

// NEW: Matches the backend @PostMapping("/{providerId}/reject")
export const rejectProvider = async (params: {
  id: string;
  reason: string;
}): Promise<void> => {
  const { data } = await api.post(`/admin/providers/${params.id}/reject`, {
    reason: params.reason, // This maps to the KycRejectionDto in Spring Boot
  });
  return data.data;
};
