// 1. Swap useState for RHF tools
import { Controller, useFormContext } from "react-hook-form";

const districts = ["Kathmandu", "Lalitpur", "Bhaktapur"];

const WorkArea = () => {
  // 2. Grab the control engine from the Master Clipboard
  const { control } = useFormContext();

  return (
    <div className="w-full text-text-dark flex flex-col gap-3">
      <label className="text-sm font-medium leading-3.5">
        <span>Districts you serve</span>
      </label>

      {/* 3. Wrap the custom buttons in a Controller */}
      <Controller
        name="workArea" // Must match the key in your Zod schema perfectly
        control={control}
        render={({ field }) => {
          // 4. Update the array directly on the Master Clipboard
          const handleToggle = (district: string) => {
            const currentValues = field.value || []; // Fallback to empty array

            if (currentValues.includes(district)) {
              // Remove district
              field.onChange(
                currentValues.filter((item: string) => item !== district),
              );
            } else {
              // Add district
              field.onChange([...currentValues, district]);
            }
          };

          return (
            <div className="flex items-center flex-wrap gap-2">
              {districts.map((district, i) => {
                // 5. Read the selected state from the Master Clipboard
                const isSelected = (field.value || []).includes(district);

                return (
                  <button
                    type="button"
                    key={i + 1}
                    onClick={() => handleToggle(district)}
                    className={`leading-5 max-h-9.5 border flex items-center border-muted/20 rounded-full py-2.5 px-4.5 active:shadow-md ${
                      isSelected ? "bg-primary text-light" : "bg-bg/20"
                    } hover:border-muted transition-colors duration-150 cursor-pointer`}
                  >
                    {district}
                  </button>
                );
              })}
            </div>
          );
        }}
      />

      <p className="text-xs leading-4 mt-2 text-text-dark/70">
        Pick all the districts where you're willing to take jobs.
      </p>
    </div>
  );
};

export default WorkArea;
