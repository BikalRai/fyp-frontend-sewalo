import {
  requiredEmail,
  requiredPassword,
  requiredString,
} from "@/schemas/zod.schema";
import { z } from "zod";

export const userRegisterBody = z.object({
  fullName: requiredString("full name"),
  email: requiredEmail(),
  password: requiredPassword(),
  role: z
    .enum(["CUSTOMER", "PROVIDER"], {
      error: "Value of CUSTOMER / PROVIDER only",
    })
    .nonoptional(),
});

export type UserRegisterType = z.infer<typeof userRegisterBody>;

export const userLoginBody = z.object({
  email: requiredEmail(),
  password: requiredPassword(),
});

export type UserLoginType = z.infer<typeof userLoginBody>;

export const RegisterResponse = z.object({
  id: z.string().uuid(),
  fullName: z.string(),
  email: z.string().email(),
  role: z.enum(["CUSTOMER", "PROVIDER"]),
  createdAt: z.string().datetime(),
  isActive: z.boolean(),
  accountLocked: z.boolean(),
  lockedAt: z.string().datetime(),
});

export type RegisterResponseType = z.infer<typeof RegisterResponse>;

export const AuthReponse = z.object({});

export type AuthReponseType = z.infer<typeof AuthReponse>;
