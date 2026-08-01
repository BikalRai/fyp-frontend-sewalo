import { api } from "@/config/api";
import type {
  IProvider,
  ProvderPersonalDetailsType,
  ICloudinarySignature,
  IKycSubmissionPayload,
  IPublicProviderProfile,
} from "@/types/provider.types";
import axios from "axios";

const PROVIDER_PREFIX = "/providers";

export const updateProviderPersonalDetails = async (
  data: ProvderPersonalDetailsType,
): Promise<IProvider> => {
  const res = await api.patch(`${PROVIDER_PREFIX}/update-personal`, data);

  return res.data.data;
};

export const getProviderProfile = async (): Promise<IProvider> => {
  const { data } = await api.get(`${PROVIDER_PREFIX}/me`);
  return data.data; // Assumes your backend wraps the response in APIResponse
};

// 1. Get the signature from your backend
export const getCloudinarySignature =
  async (): Promise<ICloudinarySignature> => {
    const { data } = await api.get("/uploads/cloudinary-kyc-signature");
    return data.data;
  };

// 2. Upload directly to Cloudinary using the signature
export const uploadToCloudinary = async (
  file: File,
  signatureData: ICloudinarySignature & { type: string; folder: string }, // include type & folder
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signatureData.apiKey);
  formData.append("timestamp", String(signatureData.timestamp));
  formData.append("signature", signatureData.signature);

  // MUST MATCH THE BACKEND EXACTLY:
  formData.append("folder", signatureData.folder); // "sewalo/kyc_docs"
  formData.append("type", signatureData.type); // "authenticated"

  const res = await axios.post<{ public_id: string }>(
    `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/image/upload`,
    formData,
  );
  return res.data.public_id;
};

// 3. Submit the final IDs to your database
export const submitKycDocuments = async (
  payload: IKycSubmissionPayload,
): Promise<void> => {
  const { data } = await api.post("/providers/kyc", payload);
  return data;
};

export const getPublicProviderProfile = async (
  providerId: string,
): Promise<IPublicProviderProfile> => {
  const { data } = await api.get(`${PROVIDER_PREFIX}/${providerId}/public`);
  return data.data;
};
