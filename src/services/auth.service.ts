import { api } from "@/config/api";
import type {
  RegisterResponseType,
  UserRegisterType,
} from "@/types/user.types";

export const registerUser = async (
  payload: UserRegisterType,
): Promise<RegisterResponseType> => {
  const { data } = await api.post("/auth/register", payload);

  return data;
};
