import { useNavigate } from "react-router-dom";
import {
  useImageStore,
  useJobPostStore,
  useLocationStore,
  useUrgencyStore,
  useDescriptionStore, // Import wherever your description state lives
} from "@/store/jobStore";
import { useCreateJob } from "@/hooks/mutations/useJob";

const Review = () => {
  const navigate = useNavigate();

  const { selectedCategory } = useJobPostStore();
  const urgency = useUrgencyStore((s) => s.urgency);
  const description = useDescriptionStore((s) => s.description); // Pull the description
  const { location, phoneNumber } = useLocationStore();
  const { selectedImages, clearImages } = useImageStore();

  const { mutate: createJob, isPending, isError, error } = useCreateJob();

  const handleSubmit = () => {
    // 1. Strict UX Guard: Added description check
    if (
      !selectedCategory?.id ||
      !urgency ||
      !description ||
      !location.address ||
      !phoneNumber
    ) {
      console.error("Missing required fields");
      return;
    }

    // 2. The Payload: Coordinates are safely sent to the API, hidden from the UI
    createJob(
      {
        category: selectedCategory.id,
        urgency,
        description, // Added to the API payload
        address: location.address,
        latitude: location.lat,
        longitude: location.lng,
        phoneNumber,
        images: selectedImages,
      },
      {
        onSuccess: () => {
          // Complete Transient Cleanup
          useJobPostStore.getState().reset();
          useUrgencyStore.getState().reset();
          useDescriptionStore.getState().reset();
          useLocationStore.getState().reset();
          clearImages();

          navigate("/dashboard/my-posts");
        },
      },
    );
  };

  return (
    <div className="grid gap-6 bg-light rounded-xl p-4">
      {/* --- Existing Display UI --- */}
      <div>
        <h3 className="font-semibold">Category</h3>
        <p>{selectedCategory?.name}</p>
      </div>

      <div>
        <h3 className="font-semibold">Urgency</h3>
        <p>{urgency}</p>
      </div>

      {/* WHY: Added the Description block for the user to review */}
      <div>
        <h3 className="font-semibold">Description</h3>
        <p className="whitespace-pre-wrap">{description}</p>
      </div>

      <div>
        <h3 className="font-semibold">Address</h3>
        <p>{location.address}</p>
      </div>

      {/* The Coordinates block has been entirely removed from the UI */}

      <div>
        <h3 className="font-semibold">Phone Number</h3>
        <p>{phoneNumber}</p>
      </div>

      <div>
        <h3 className="font-semibold">Images</h3>
        <div className="flex gap-3 flex-wrap">
          {selectedImages.map((image, index) => (
            <div key={index}>
              <img
                src={URL.createObjectURL(image)}
                alt="Job preview"
                className="w-24 h-24 object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      {/* --- Action Area --- */}

      {isError && (
        <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-100">
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred while submitting."}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={isPending}
        className="mt-4 w-full bg-accent text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/80 transition-all cursor-pointer"
      >
        {isPending ? "Publishing Job..." : "Confirm & Submit Job"}
      </button>
    </div>
  );
};

export default Review;
