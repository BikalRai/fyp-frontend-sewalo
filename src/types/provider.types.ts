import { z } from "zod";
import type { UserProfileType } from "./user.types";
import type { Path } from "react-hook-form";

export interface IProviderStep {
  title: string;
  description: string;
  component: React.ElementType;
  fields: Path<MasterProviderType>[];
}

export interface IProvider {
  id: string;
  gender: string;
  workDistrict: string[];
  bio: string;
  pricingBasis: string;
  startingRate: string;
  latitude: number;
  longitude: number;
  address: string;
  user: UserProfileType;
}

// In types/provider.types.ts
export const providerPersonalDetails = z.object({
  imageUrl: z
    .any()
    .refine(
      (val) => val instanceof File || typeof val === "string",
      "Profile image is required",
    ),
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
