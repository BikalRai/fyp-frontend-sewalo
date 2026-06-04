import { api } from "@/config/api";
import type {
  IProvider,
  ProvderPersonalDetailsType,
} from "@/types/provider.types";

const PROVIDER_PREFIX = "/providers";

export const updateProviderPersonalDetails = async (
  data: ProvderPersonalDetailsType,
): Promise<IProvider> => {
  const res = await api.patch(`${PROVIDER_PREFIX}/update-personal`, data);

  return res.data.data;
};
