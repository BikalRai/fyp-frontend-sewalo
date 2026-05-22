import JobCategoryCard from "@/components/card/JobCategoryCard";
import { useJobPostStore } from "@/store/jobStore";
import type { IJobCategoryProps } from "@/types/job.types";
import {
  LuDroplets,
  LuHammer,
  LuPaintRoller,
  LuSparkles,
  LuWrench,
  LuZap,
} from "react-icons/lu";

const categories: IJobCategoryProps[] = [
  { Icon: LuDroplets, title: "Plumbing" },
  { Icon: LuZap, title: "Electrical" },
  { Icon: LuPaintRoller, title: "Painting" },
  { Icon: LuHammer, title: "Carpentry" },
  { Icon: LuSparkles, title: "Cleaning" },
  { Icon: LuWrench, title: "Appliance Repair" },
];

const Category = () => {
  const { selectedCategory, setSelectedCategory } = useJobPostStore();

  return (
    <div className="grid gap-4 w-full h-full">
      <div className="flex flex-wrap items-center justify-center gap-4 lg:grid lg:grid-cols-3">
        {categories.map((cat, i) => (
          <JobCategoryCard
            key={i + 1}
            Icon={cat.Icon}
            title={cat.title}
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
