import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { LuCamera } from "react-icons/lu";

const ProviderUploadImage = () => {
  // 1. Grab setValue and watch from the Master Clipboard
  const { setValue, watch } = useFormContext();
  const currentImage = watch("imageUrl");

  // 2. Initialize preview with a string if one already exists from the DB
  const [preview, setPreview] = useState<string | null>(() => {
    if (typeof currentImage === "string") return currentImage;
    if (currentImage instanceof File) return URL.createObjectURL(currentImage);
    return null;
  });

  // 3. Intercept the file selection (Fixes the ESLint error!)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create the temporary URL immediately without useEffect
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Save the RAW FILE object to the Master Clipboard
    setValue("imageUrl", file, { shouldValidate: true });
  };

  // 4. Memory cleanup: Only runs when the component unmounts
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="flex items-center gap-6">
      <div className="w-24 h-24 bg-muted/10 rounded-full flex items-center justify-center overflow-hidden border border-muted/20">
        {preview ? (
          <img
            src={preview}
            alt="Profile preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <LuCamera className="w-8 h-8 stroke-muted" />
        )}
      </div>

      <div className="text-sm font-medium flex flex-col gap-2">
        <label htmlFor="image" className="text-muted leading-3.5">
          Profile photo <span className="text-danger">*</span>
        </label>
        <button
          type="button"
          className="text-text-dark leading-5 rounded-xl bg-bg/30 border border-muted/10 py-2 px-3 cursor-pointer relative hover:bg-bg/40 transition-colors"
        >
          Upload photo
          <input
            type="file"
            id="image"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            className="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer"
            onChange={handleFileChange} // Use our custom handler instead of {...registration}
          />
        </button>
        <p className="text-xs text-muted leading-4">JPG or PNG, max 5 MB</p>
      </div>
    </div>
  );
};

export default ProviderUploadImage;
