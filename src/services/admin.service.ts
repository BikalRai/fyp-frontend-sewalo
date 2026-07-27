import { api } from "@/config/api";
import type { PendingProviderDto } from "@/types/admin.types";

export const getPendingProviders = async (): Promise<PendingProviderDto[]> => {
  const { data } = await api.get("/admin/providers/pending");
  // Assuming your APIResponse wraps the list in `data`
  return data.data;
};

export const verifyProvider = async (providerId: string): Promise<void> => {
  const { data } = await api.patch(`/admin/providers/${providerId}/verify`);
  return data.data;
};
