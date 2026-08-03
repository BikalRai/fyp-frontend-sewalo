import { z } from "zod";
import {
  experienceEnum,
  pricingBasisEnum,
  roleEnumSchema,
  type UserProfileType,
} from "./user.types";
import type { Path } from "react-hook-form";
import type { IRating } from "./job.types";

export interface IProviderStep {
  title: string;
  description: string;
  component: React.ElementType;
  fields: Path<MasterProviderType>[];
}

export interface IProvider {
  id: string;
  status:
    | "DRAFT"
    | "PENDING_APPROVAL"
    | "APPROVED"
    | "REJECTED"
    | "SUBSCRIBED"
    | "SUSPENDED";
  rejectionReason?: string;
  gender: string;
  workDistrict: string[];
  services: string[];
  bio: string;
  pricingBasis: string;
  startingRate: number;
  latitude: number;
  longitude: number;
  address: string;
  user: UserProfileType;
  activeTier: "FREE" | "PRO" | "BUSINESS";
  tokenBalance: number;
  subscriptionExpiresAt: string | null;
  experience: string;
}

// --- Cloudinary & KYC Types ---
export interface ICloudinarySignature {
  signature: string;
  timestamp: number | string;
  apiKey: string;
  cloudName: string;
  folder: string; // Add this
  type: string;
}

export interface IKycSubmissionPayload {
  citizenshipFrontId: string;
  citizenshipBackId: string;
}

// Replaced z.any() with a strict type-checked union
export const providerPersonalDetails = z.object({
  imageUrl: z.union([z.instanceof(File), z.string()], {
    error: () => ({ message: "Profile image is required" }),
  }),
  phoneNumber: z.string(),
  gender: z.string(),
});

export type ProvderPersonalDetailsType = z.infer<
  typeof providerPersonalDetails
>;

export const providerServicesSchema = z.object({
  services: z.array(z.string()).min(1),
  experience: z.string(),
});

export type ProvderServicesType = z.infer<typeof providerServicesSchema>;

export const providerWorkAreaSchema = z.object({
  workArea: z.array(z.string()).min(1),
});

export type ProvderWorkAreaType = z.infer<typeof providerWorkAreaSchema>;

export const providerAboutSchema = z.object({
  bio: z.string().min(10),
  pricingBasis: z.string(),
  startingRate: z.string(),
});

export const providerLocationSchema = z.object({
  latitude: z.number().min(-90).max(90, "Invalid latitude"),
  longitude: z.number().min(-180).max(180, "Invalid longitude"),
  address: z.string().min(2, "Please pin a valid location on the map"),
});

export type ProviderLocationType = z.infer<typeof providerLocationSchema>;

export const masterProviderSchema = providerPersonalDetails
  .merge(providerAboutSchema)
  .merge(providerLocationSchema)
  .merge(providerServicesSchema)
  .merge(providerWorkAreaSchema);

export type MasterProviderType = z.infer<typeof masterProviderSchema>;

export interface IPublicProviderProfile {
  providerId: string;
  fullName: string;
  imageUrl: string | null;
  services: string[];
  avgRating: number | null;
  ratingCount: number;
  recentReviews: IRating[];
  activeTier?: "FREE" | "PRO" | "BUSINESS" | string;
}

export const providerProfileUpdateSchema = z.object({
  imageUrl: z.union([z.instanceof(File), z.string()]),
  phoneNumber: z.string().min(1, "Phone number is required"),
  services: z.array(z.string()).min(1, "At least one service is required"),
  experience: z.string().min(1, "Experience level is required"),
  workArea: z.array(z.string()).min(1, "At least one work area is required"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  pricingBasis: z.string().min(1, "Pricing basis is required"),
  startingRate: z.number().min(0, "Starting rate cannot be negative"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  address: z.string().min(2, "Please pin a valid location"),
});

export type ProviderProfileUpdateType = z.infer<
  typeof providerProfileUpdateSchema
>;

export const providerProfileFormSchema = z.object({
  phoneNumber: z.string().min(1, "Phone number is required"),
  experience: z.string().min(1, "Experience level is required"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),

  // CHANGED FROM z.string() TO z.array()
  services: z.array(z.string()).min(1, "At least one service is required"),
  workArea: z.array(z.string()).min(1, "At least one work area is required"),

  pricingBasis: z.string().min(1, "Pricing basis is required"),
  startingRate: z.number().min(0, "Starting rate cannot be negative"),
  imageUrl: z
    .union([z.instanceof(File), z.string()])
    .nullable()
    .optional(),
});

export type ProviderProfileFormType = z.infer<typeof providerProfileFormSchema>;

export const providerResponseSchema = z.object({
  id: z.string().uuid(),
  status: z.enum([
    "DRAFT",
    "PENDING_APPROVAL",
    "APPROVED",
    "REJECTED",
    "SUBSCRIBED",
    "SUSPENDED",
  ]),
  rejectionReason: z.string().nullable().optional(),
  gender: z.string().nullable().optional(),
  experience: experienceEnum.nullable().optional(),
  services: z.array(z.string()).default([]),
  workDistrict: z.array(z.string()).default([]),
  bio: z.string().nullable().optional(),
  pricingBasis: pricingBasisEnum.nullable().optional(),
  startingRate: z.number().nullable().optional(),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
  address: z.string().nullable().optional(),
  activeTier: z.enum(["FREE", "PRO", "BUSINESS"]),
  tokenBalance: z.number(),
  subscriptionExpiresAt: z.string().datetime().nullable(),
  user: z.object({
    id: z.string().uuid(),
    fullName: z.string(),
    email: z.string().email(),
    phoneNumber: z.string().nullable(),
    imageUrl: z.string().nullable(),
    role: roleEnumSchema,
    createdAt: z.string().datetime(),
    isActive: z.boolean(),
    accountLocked: z.boolean(),
    isOnboarded: z.boolean(),
    lockedAt: z.string().datetime().nullable(),
  }),
});

export type ProviderResponseType = z.infer<typeof providerResponseSchema>;
