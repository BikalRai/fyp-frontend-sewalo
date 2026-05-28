import { LuCamera } from "react-icons/lu";

const ProviderUploadImage = () => {
  return (
    <div className="flex items-center gap-6">
      <div className="w-24 h-24 bg-muted/10 rounded-full flex items-center justify-center">
        <LuCamera className="w-8 h-8 stroke-muted" />
      </div>
      <div className="text-sm font-medium flex flex-col gap-2">
        <label htmlFor="image" className="text-muted leading-3.5">
          Profile photo <span className="text-danger">*</span>
        </label>
        <button
          type="button"
          className="text-text-dark leading-5 rounded-xl bg-bg/30 border border-muted/10 py-2 px-3 cursor-pointer relative"
        >
          Upload photo
          <input
            type="file"
            name="image"
            id="image"
            className="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer"
          />
        </button>
        <p className="text-xs text-muted leading-4">JPG or PNG, max 5 MB</p>
      </div>
    </div>
  );
};

export default ProviderUploadImage;
