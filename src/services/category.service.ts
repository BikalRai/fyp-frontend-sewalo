import { api } from "@/config/api";
import type { ICategoryResponseDto } from "@/types/category.types";

export const getAllCategories = async (): Promise<ICategoryResponseDto[]> => {
  const { data } = await api.get("/categories");

  return data.data;
};
