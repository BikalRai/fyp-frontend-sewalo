import { api } from "@/config/api";
import type {
  UpdateUserAddressParams,
  UserAddressType,
  UserProfileType,
} from "@/types/user.types";

export const fetchUserProfile = async (): Promise<UserProfileType> => {
  const { data } = await api.get("/users/me");

  return data.data;
};

export const updateUserAddress = async ({
  id,
  updateData,
}: UpdateUserAddressParams): Promise<UserAddressType> => {
  console.log(updateData, " IN SERVICE");
  const { data } = await api.patch(`/users/update-address/${id}`, updateData);

  return data.data;
};
