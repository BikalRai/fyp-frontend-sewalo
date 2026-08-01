import { api } from "@/config/api";
import axios from "axios";
import imageCompression from "browser-image-compression";

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

  // --- NEW: Compression settings guaranteed to beat the 10MB limit ---
  const compressionOptions = {
    maxSizeMB: 9, // Safely under Cloudinary's 10MB limit
    maxWidthOrHeight: 1920, // Reasonable max resolution to preserve quality
    useWebWorker: true, // Offloads processing to a background thread to prevent UI freezing
  };

  // 2. Prepare concurrent upload promises
  const uploadPromises = files.map(async (file) => {
    // 3. Intercept and compress the file before attaching it
    const compressedFile = await imageCompression(file, compressionOptions);

    const formData = new FormData();
    formData.append("file", compressedFile); // Append the compressed file
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);
    formData.append("folder", folder);

    // 4. CRITICAL: Use RAW axios here, not your `api` instance, to avoid leaking the Bearer token
    const uploadRes = await axios.post(CLOUDINARY_URL, formData);

    return uploadRes.data.secure_url;
  });

  // 5. Execute all uploads in parallel
  return Promise.all(uploadPromises);
};
