import { api } from "@/config/api";
import type { UserProfileType } from "@/types/user.types";

export const userProfile = async (): Promise<UserProfileType> => {
  const { data } = await api.get("/users/me");

  return data.data;
};
