import { api } from "@/config/api";
import type { RoleFormType } from "@/pages/auth/GoogleAuthSetRole";
import type {
  UserResponseType,
  UserLoginType,
  UserRegisterType,
  AuthReponseType,
} from "@/types/user.types";

export const registerUser = async (
  payload: UserRegisterType,
): Promise<UserResponseType> => {
  const { data } = await api.post("/auth/register", payload);
  return data.data;
};

export const loginUser = async (
  payload: UserLoginType,
): Promise<AuthReponseType> => {
  const { data } = await api.post("/auth/login", payload);

  const res: AuthReponseType = data.data;

  return res;
};

export const googleAuth = async (idToken: string) => {
  const res = await api.post("/auth/google", {
    idToken,
  });

  return res.data;
};

export const googleAuthSetRole = async (payload: RoleFormType) => {
  const res = await api.post("/auth/google/set-role", payload);

  return res.data.data;
};

export const verifyAccount = async (token: string) => {
  const { data } = await api.post("/auth/verify-account", {
    otpToken: token,
  });

  return data;
};

export const resendVerificationCode = async (userId: string) => {
  const { data } = await api.post("/auth/resend-code", { userId });

  return data;
};

export const logoutUser = async () => {
  const { data } = await api.post("/logout");

  return data.data;
};
