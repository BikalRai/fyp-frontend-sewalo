import {
  useImageStore,
  useJobPostStore,
  useLocationStore,
  useUrgencyStore,
} from "@/store/jobStore";

const Review = () => {
  const selectedCategory = useJobPostStore((s) => s.selectedCategory);

  const urgency = useUrgencyStore((s) => s.urgency);

  const { location, phoneNumber } = useLocationStore();

  const selectedImages = useImageStore((s) => s.selectedImages);

  return (
    <div className="grid gap-6 bg-light rounded-xl p-4">
      <div>
        <h3 className="font-semibold">Category</h3>
        <p>{selectedCategory}</p>
      </div>

      <div>
        <h3 className="font-semibold">Urgency</h3>
        <p>{urgency}</p>
      </div>

      <div>
        <h3 className="font-semibold">Address</h3>
        <p>{location.address}</p>
      </div>

      <div>
        <h3 className="font-semibold">Coordinates</h3>
        <p>
          {location.lat}, {location.lng}
        </p>
      </div>

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
                alt=""
                className="w-24 h-24 object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
