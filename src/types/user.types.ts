import {
  requiredEmail,
  requiredPassword,
  requiredString,
} from "@/schemas/zod.schema";
import { z } from "zod";

export const roleEnumSchema = z.enum(["CUSTOMER", "PROVIDER"], {
  error: "Value of CUSTOMER / PROVIDER only",
});

export type RoleType = z.infer<typeof roleEnumSchema>;

export const userRegisterBody = z.object({
  fullName: requiredString("full name"),
  email: requiredEmail(),
  password: requiredPassword(),
  role: roleEnumSchema.nonoptional(),
});

export type UserRegisterType = z.infer<typeof userRegisterBody>;

export const userLoginBody = z.object({
  email: requiredEmail(),
  password: requiredPassword(),
});

export type UserLoginType = z.infer<typeof userLoginBody>;

export const UserResponse = z.object({
  access_token: z.string(),
  user: z.object({
    id: z.string().uuid(),
    fullName: z.string(),
    email: z.string().email(),
    role: roleEnumSchema,
    createdAt: z.string().datetime(),
    isActive: z.boolean(),
    accountLocked: z.boolean(),
    lockedAt: z.string().datetime(),
    isOnboarded: z.boolean(),
  }),
});

export type UserResponseType = z.infer<typeof UserResponse>;

export const AuthReponse = z.object({
  access_token: z.string(),
  role: roleEnumSchema,
  userId: z.string().uuid(),
  isActive: z.boolean(),
  isOnboarded: z.boolean(),
});

export type AuthReponseType = z.infer<typeof AuthReponse>;

export const UserProfileSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  role: roleEnumSchema,
  createdAt: z.string().datetime(),
  isActive: z.boolean(),
  accountLocked: z.boolean(),
  onboarded: z.boolean(),
  lockedAt: z.string().datetime().nullable(),
  address: z.string(),
  lat: z.number(),
  lng: z.number(),
});

export type UserProfileType = z.infer<typeof UserProfileSchema>;

export const UserAddressSchema = z.object({
  id: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  address: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  user: UserProfileSchema,
});

export type UserAddressType = z.infer<typeof UserAddressSchema>;

export const UserUpdateAddressPayload = z.object({
  lng: z.number().nonoptional(),
  lat: z.number().nonoptional(),
  address: z.string().nonoptional(),
});

export type UserUpdateAddressPayload = z.infer<typeof UserUpdateAddressPayload>;

export interface UpdateUserAddressParams {
  id: string;
  updateData: UserUpdateAddressPayload;
}

export const experienceEnum = z.enum(["BEGINNER", "INTERMEDIATE", "EXPERT"]);
export const pricingBasisEnum = z.enum(["VISIT", "FIXED"]);

export const providerResponseSchema = UserProfileSchema.extend({
  gender: z.string().nullable().optional(),
  experience: experienceEnum.nullable().optional(),

  // Java backend expects List<String>, so Zod expects an array of strings
  services: z.array(z.string()).default([]),
  workDistrict: z.array(z.string()).default([]),

  bio: z.string().nullable().optional(),
  pricingBasis: pricingBasisEnum.nullable().optional(),
  startingRate: z.coerce.string().min(1, "Rate is required"),
});

export type ProviderResponseType = z.infer<typeof providerResponseSchema>;
