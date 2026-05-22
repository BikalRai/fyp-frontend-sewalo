import SeInput from "@/components/input/SeInput";
import { useImageStore, useUrgencyStore } from "@/store/jobStore";
import { IoCloseSharp } from "react-icons/io5";
import { LuCamera } from "react-icons/lu";

type urgency = {
  name: string;
};

const urgencies: urgency[] = [
  { name: "Emergency" },
  { name: "Standard" },
  { name: "Planning Ahead" },
];

const Desciptions = () => {
  const { urgency: selectedUrgency, setUrgency } = useUrgencyStore();
  const { addImages, selectedImages, removeImage } = useImageStore();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    addImages(files);
  };

  return (
    <div className="bg-light/20 rounded-2xl shadow-sm border border-muted/5 py-8 px-6">
      {/* job title */}
      <SeInput
        label="JOB TITLE"
        name="jobTitle"
        placeholderText="e.g. Kitchen pipe leak repair"
      />

      <div className="grid gap-3 mt-5">
        <h4 className="text-sm text-text-dark font-medium uppercase">
          Urgency
        </h4>

        {/* urgency */}
        <div className="flex items-center gap-2  flex-wrap">
          {urgencies.map((urgency, i) => (
            <div
              key={i + 1}
              className={`rounded-full flex items-center justify-center py-3 px-4 border hover:bg-accent/20 ${selectedUrgency === urgency.name ? "bg-accent/20 border-accent" : "bg-light border-muted/5"} transition-colors duration-150 cursor-pointer`}
              onClick={() => setUrgency(urgency.name)}
            >
              {urgency.name}
            </div>
          ))}
        </div>

        {/* description */}
        <div className="grid gap-3 mt-5">
          <h4 className="text-sm text-text-dark font-medium uppercase">
            Description
          </h4>
          <div className="border-2 border-muted/20 rounded-xl h-26.5 focus-within:border-accent">
            <textarea
              name=""
              id=""
              placeholder="Describe the problem in detail..."
              className="w-full h-full resize-none py-3 px-4 rounded-xl border-0 outline-0"
            ></textarea>
          </div>
        </div>

        {/* photos  */}
        <div
          className="w-full
         flex items-center gap-5 mt-14"
        >
          <div>
            <h4 className="text-sm text-text-dark font-medium uppercase">
              <span>photos</span>
              <span className="text-muted lowercase">{` (max 3)`}</span>
            </h4>
            <div className="relative rounded-xl w-24 h-24">
              <svg
                className="absolute inset-0 h-full w-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1"
                  y="1"
                  width="94"
                  height="94"
                  rx="12"
                  ry="12"
                  fill="none"
                  stroke="#6c7e93"
                  strokeWidth="2"
                  strokeDasharray="8 6"
                />
              </svg>
              <input
                type="file"
                className="w-full h-full opacity-0 absolute top-0 left-0 cursor-pointer"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <div className="w-full h-full">
                <div className="flex flex-col justify-center items-center gap-1 h-full">
                  <LuCamera className="w-5 h-5 stroke-muted" />
                  <h3 className="text-muted text-small font-semibold">
                    ADD PHOTO
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-3">
            {selectedImages.map((img, i) => (
              <div
                key={i + 1}
                className="w-24 h-24 overflow-hidden  rounded-xl relative"
              >
                <img
                  src={URL.createObjectURL(img)}
                  alt="image"
                  className="w-full h-full object-cover"
                />

                <div
                  className="absolute top-1 right-1 h-5 w-5 rounded-full p-1 bg-light hover:bg-soft-danger
                hover:text-light transition-colors duration-200 cursor-pointer"
                  onClick={() => removeImage(i)}
                >
                  <IoCloseSharp className="h-full w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desciptions;
