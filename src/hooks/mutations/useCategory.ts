import { categorykeys } from "@/lib/queryKeys";
import { getAllCategories } from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  return useQuery({
    queryKey: categorykeys.all,
    queryFn: getAllCategories,
  });
};
