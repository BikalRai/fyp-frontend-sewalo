import { z } from "zod";

export const customerProfileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
});

export type CustomerProfileType = z.infer<typeof customerProfileSchema>;

export const providerProfileSchema = z.object({
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  experience: z.string().min(1, "Please select your experience level"),
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters to help customers know you"),
  services: z.string().min(3, "Please list at least one service"),
  pricingBasis: z.enum(["VISIT", "FIXED"]).nullish(),
  startingRate: z.coerce.string().min(1, "Rate is required"),
});

export type ProviderProfileFormType = z.infer<typeof providerProfileSchema>;
