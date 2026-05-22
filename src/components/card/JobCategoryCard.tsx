import type { IJobCategoryCard } from "@/types/job.types";

const JobCategoryCard = ({
  Icon,
  title,
  selected,
  setSelected,
}: IJobCategoryCard) => {
  const isSelected = selected?.toLowerCase() === title?.toLowerCase();
  return (
    <div
      className={`w-full max-w-56 rounded-2xl flex flex-col justify-center items-center gap-3 py-6 border-2 shadow-2xs cursor-pointer
        transition-all duration-150 ease-out
        ${
          isSelected
            ? "bg-accent border-accent scale-[1.03] shadow-md"
            : "bg-light border-muted/20 hover:bg-accent/10 hover:border-accent/50 hover:scale-[1.01] hover:shadow-sm"
        }`}
      onClick={() => setSelected(title)}
    >
      <div
        className={`transition-transform duration-150 ${isSelected ? "scale-110" : ""}`}
      >
        <Icon
          className={`h-7 w-7 transition-colors duration-150 ${isSelected ? "stroke-light" : "stroke-muted"}`}
        />
      </div>
      <h3
        className={`text-sm font-medium leading-5 transition-colors duration-150 ${isSelected ? "text-light" : "text-text-dark"}`}
      >
        {title}
      </h3>
    </div>
  );
};

export default JobCategoryCard;
