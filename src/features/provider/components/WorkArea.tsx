import { useState } from "react";

const districts = ["Kathmandu", "Lalitpur", "Bhaktapur"];

const WorkArea = () => {
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);

  const handleToggle = (district: string) => {
    setSelectedDistricts((prev) => {
      if (prev.includes(district)) {
        return prev.filter((item) => item !== district);
      }

      return [...prev, district];
    });
  };
  return (
    <div className="w-full text-text-dark flex flex-col gap-3">
      <label className="text-sm font-medium leading-3.5">
        <span>Districts you serve</span>
      </label>
      <div className="flex items-center flex-wrap gap-2">
        {districts.map((district, i) => {
          const isSelected = selectedDistricts.includes(district);
          return (
            <button
              type="button"
              key={i + 1}
              onClick={() => handleToggle(district)}
              className={`leading-5 max-h-9.5 border flex items-center border-muted/20 rounded-full py-2.5 px-4.5 active:shadow-md ${isSelected ? "bg-primary text-light" : "bg-bg/20"} hover:border-muted transition-colors duration-150 cursor-pointer`}
            >
              {district}
            </button>
          );
        })}
      </div>
      <p className="text-xs leading-4">
        Pick all the districts where you're willing to take jobs.
      </p>
    </div>
  );
};

export default WorkArea;
