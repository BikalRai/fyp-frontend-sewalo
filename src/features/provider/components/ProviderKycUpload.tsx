import { useState, useRef } from "react";
import { toast } from "sonner";
import { LuCloudUpload, LuShieldCheck } from "react-icons/lu";
import {
  getCloudinarySignature,
  uploadToCloudinary,
  submitKycDocuments,
} from "@/services/provider.service";
import SeSpinner from "@/components/spinner/SeSpinner";

// --- ACCEPT THE STATUS PROP ---
const ProviderKycUpload = ({ currentStatus }: { currentStatus?: string }) => {
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Track if they just submitted, OR if they logged in and are already pending
  const [isSubmitted, setIsSubmitted] = useState(
    currentStatus === "PENDING_APPROVAL",
  );

  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    side: "front" | "back",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Maximum size is 5MB.");
      return;
    }

    if (side === "front") setFrontImage(file);
    else setBackImage(file);
  };

  const handleSubmit = async () => {
    if (!frontImage || !backImage) {
      toast.error("Please upload both the front and back of your ID.");
      return;
    }

    setIsUploading(true);
    try {
      const signatureData = await getCloudinarySignature();

      toast.loading("Uploading front image...", { id: "upload" });
      const frontId = await uploadToCloudinary(frontImage, signatureData);

      toast.loading("Uploading back image...", { id: "upload" });
      const backId = await uploadToCloudinary(backImage, signatureData);

      toast.loading("Securing documents...", { id: "upload" });
      await submitKycDocuments({
        citizenshipFrontId: frontId,
        citizenshipBackId: backId,
      });

      toast.success("Documents submitted successfully!", { id: "upload" });

      // Flip the UI to the "Under Review" state
      setIsSubmitted(true);

      // Note: Do NOT invalidate the user query here immediately,
      // otherwise it will trigger a full remount. The state change is enough.
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload documents. Please try again.", {
        id: "upload",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // --- UI STATE 1: WAITING ROOM ---
  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-2xl border border-gray-200 shadow-sm text-center space-y-4">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <LuShieldCheck size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Documents Under Review
        </h2>
        <p className="text-gray-500">
          We have received your citizenship documents. Our Admin team will
          review them shortly. You will receive an email once your account is
          approved.
        </p>
      </div>
    );
  }

  // --- UI STATE 2: REJECTED NOTIFICATION ---
  const isRejected = currentStatus === "REJECTED";

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Verify Your Identity
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          To ensure trust on Sewalo, we require a clear photo of your official
          citizenship document.
        </p>
      </div>

      {isRejected && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
          <h3 className="text-red-800 font-bold">Verification Failed</h3>
          <p className="text-sm text-red-600 mt-1">
            Your previous submission was rejected. Please upload clearer photos
            and ensure all text is visible.
          </p>
        </div>
      )}

      {/* --- REMAINDER OF THE UPLOAD FORM STAYS THE SAME --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-700">
            Citizenship (Front)
          </label>
          <div
            onClick={() => frontInputRef.current?.click()}
            className="h-48 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative overflow-hidden group"
          >
            {frontImage ? (
              <img
                src={URL.createObjectURL(frontImage)}
                alt="Front preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="text-center p-4">
                <LuCloudUpload
                  size={32}
                  className="mx-auto text-gray-400 mb-2"
                />
                <p className="text-sm font-medium text-gray-600">
                  Click to upload
                </p>
              </div>
            )}
            <input
              type="file"
              ref={frontInputRef}
              className="hidden"
              accept="image/jpeg, image/png"
              onChange={(e) => handleFileChange(e, "front")}
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-700">
            Citizenship (Back)
          </label>
          <div
            onClick={() => backInputRef.current?.click()}
            className="h-48 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative overflow-hidden group"
          >
            {backImage ? (
              <img
                src={URL.createObjectURL(backImage)}
                alt="Back preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="text-center p-4">
                <LuCloudUpload
                  size={32}
                  className="mx-auto text-gray-400 mb-2"
                />
                <p className="text-sm font-medium text-gray-600">
                  Click to upload
                </p>
              </div>
            )}
            <input
              type="file"
              ref={backInputRef}
              className="hidden"
              accept="image/jpeg, image/png"
              onChange={(e) => handleFileChange(e, "back")}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button
          onClick={handleSubmit}
          disabled={isUploading || !frontImage || !backImage}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? <SeSpinner /> : <LuShieldCheck size={20} />}
          {isUploading ? "Uploading..." : "Submit for Verification"}
        </button>
      </div>
    </div>
  );
};

export default ProviderKycUpload;
