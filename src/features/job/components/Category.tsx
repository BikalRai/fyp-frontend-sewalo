import JobCategoryCard from "@/components/card/JobCategoryCard";
import { useCategories } from "@/hooks/mutations/useCategory";
import { useJobPostStore } from "@/store/jobStore";
import {
  LuDroplets,
  LuHammer,
  LuPaintRoller,
  LuSparkles,
  LuWrench,
  LuZap,
} from "react-icons/lu";

// const categories: IJobCategoryProps[] = [
//   { Icon: LuDroplets, title: "Plumbing" },
//   { Icon: LuZap, title: "Electrical" },
//   { Icon: LuPaintRoller, title: "Painting" },
//   { Icon: LuHammer, title: "Carpentry" },
//   { Icon: LuSparkles, title: "Cleaning" },
//   { Icon: LuWrench, title: "Appliance Repair" },
// ];

const iconMap: Record<string, React.ElementType> = {
  LuDroplets,
  LuZap,
  LuPaintRoller,
  LuHammer,
  LuSparkles,
  LuWrench,
};

const Category = () => {
  const { selectedCategory, setSelectedCategory } = useJobPostStore();
  const { data: categories, isLoading, isError } = useCategories();

  if (isLoading) return <div>Loading categories...</div>;

  if (isError || !categories) return <div>Failed to load categories.</div>;

  return (
    <div className="grid gap-4 w-full h-full">
      <div className="flex flex-wrap items-center justify-center gap-4 lg:grid lg:grid-cols-3">
        {categories?.map((cat) => (
          <JobCategoryCard
            key={cat.id}
            id={cat.id}
            Icon={iconMap[cat.iconUrl] ?? LuWrench}
            title={cat.name}
            // WHY: Pass only the string ID down so the child component's UI active state doesn't break
            selected={selectedCategory?.id ?? null}
            // WHY: Intercept the call to package the full object required by the updated Zustand store
            setSelected={() =>
              setSelectedCategory({ id: cat.id, name: cat.name })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
