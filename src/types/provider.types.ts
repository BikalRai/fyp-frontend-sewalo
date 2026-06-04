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

export const masterProviderSchema = providerPersonalDetails
  .merge(providerServicesSchema)
  .merge(providerWorkAreaSchema)
  .merge(providerAboutSchema);

export type MasterProviderType = z.infer<typeof masterProviderSchema>;
