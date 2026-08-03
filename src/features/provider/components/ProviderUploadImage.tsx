import { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { LuCamera } from "react-icons/lu";
import imageCompression from "browser-image-compression";
import { toast } from "sonner";

const ProviderUploadImage = () => {
  const { setValue, watch } = useFormContext();
  const currentImage = watch("imageUrl");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [localBlobUrl, setLocalBlobUrl] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  // Only revoke on actual component unmount — not on every localBlobUrl change
  useEffect(() => {
    return () => {
      if (localBlobUrl) URL.revokeObjectURL(localBlobUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 30 * 1024 * 1024) {
      toast.error("File is too large. Please select an image under 30MB.");
      return;
    }

    try {
      setIsCompressing(true);
      toast.loading("Optimizing image...", { id: "compressing" });

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      };

      // browser-image-compression returns a Blob, NOT a File — even though
      // it carries .name/.lastModified, `instanceof File` is false on it.
      // Wrap it back into a real File here so every downstream consumer
      // (preview, Zod schema, FormData upload) sees a genuine File.
      const compressedBlob = await imageCompression(file, options);
      const compressedFile = new File([compressedBlob], file.name, {
        type: compressedBlob.type,
        lastModified: Date.now(),
      });

      toast.dismiss("compressing");
      setIsCompressing(false);

      const newUrl = URL.createObjectURL(compressedFile);

      // Revoke the previous blob URL only when swapping to a new one
      setLocalBlobUrl((prevUrl) => {
        if (prevUrl) URL.revokeObjectURL(prevUrl);
        return newUrl;
      });

      // Save the actual File to form state
      setValue("imageUrl", compressedFile, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } catch (error) {
      toast.dismiss("compressing");
      setIsCompressing(false);
      toast.error("Failed to process image optimization.");
      console.error(error);
    }
  };

  const preview =
    typeof currentImage === "string" && currentImage !== ""
      ? currentImage
      : currentImage instanceof File
        ? localBlobUrl
        : null;

  return (
    <div className="flex items-center gap-6">
      <div className="w-24 h-24 bg-muted/10 rounded-full flex items-center justify-center overflow-hidden border border-muted/20 relative">
        {preview ? (
          <img
            src={preview}
            alt="Profile preview"
            className={`w-full h-full object-cover ${isCompressing ? "opacity-50" : "opacity-100"}`}
          />
        ) : (
          <LuCamera className="w-8 h-8 stroke-muted" />
        )}
      </div>

      <div className="text-sm font-medium flex flex-col gap-2">
        <label className="text-muted leading-3.5">
          Profile photo <span className="text-danger">*</span>
        </label>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/webp"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Trigger Button */}
        <button
          type="button"
          disabled={isCompressing}
          onClick={() => fileInputRef.current?.click()}
          className="text-text-dark leading-5 rounded-xl bg-bg/30 border border-muted/10 py-2 px-3 cursor-pointer hover:bg-bg/40 transition-colors disabled:opacity-50 text-left"
        >
          {isCompressing ? "Optimizing..." : "Upload photo"}
        </button>

        <p className="text-xs text-muted leading-4">
          JPG or PNG, auto-compressed
        </p>
      </div>
    </div>
  );
};

export default ProviderUploadImage;
