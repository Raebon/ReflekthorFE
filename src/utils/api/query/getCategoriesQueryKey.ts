import { CategoryDto } from "@/types/reflektor-api-service";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

/* Get categories for blog */
export const getCategoriesQueryKeyPrefix = "categories";

export async function getCategories(): Promise<CategoryDto[]> {
  try {
    const response: AxiosResponse<CategoryDto[]> = await axios.get(
      `/blogs/categories`
    );
    return response.data;
  } catch (error) {
    // Handle the error
    throw error;
  }
}

export const getCategoriesQueryKey = () => [getCategoriesQueryKeyPrefix];

export const getCategoriesSetupQuery = () => {
  return getCategories();
};

export const useGetCategoriesSetupQuery = (
  initialData?: CategoryDto[]
): UseQueryResult<CategoryDto[]> => {
  return useQuery({
    queryKey: getCategoriesQueryKey(),
    queryFn: () => getCategoriesSetupQuery(),
    initialData: initialData,
  });
};
