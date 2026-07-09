import { api } from "@/config/api";
import axios from "axios";

export const uploadImagesToCloudinary = async (
  files: File[],
): Promise<string[]> => {
  if (!files || files.length === 0) return [];

  // 1. Fetch the secure signature using YOUR authenticated api instance
  const sigResponse = await api.get("/uploads/cloudinary-signature");

  // Axios automatically parses JSON, so we destructure `data` directly
  const { signature, timestamp, apiKey, cloudName, folder } =
    sigResponse.data.data;

  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  // 2. Prepare concurrent upload promises
  const uploadPromises = files.map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);
    formData.append("folder", folder);

    // 3. CRITICAL: Use RAW axios here, not your `api` instance, to avoid leaking the Bearer token
    const uploadRes = await axios.post(CLOUDINARY_URL, formData);

    return uploadRes.data.secure_url;
  });

  // 4. Execute all uploads in parallel
  return Promise.all(uploadPromises);
};
