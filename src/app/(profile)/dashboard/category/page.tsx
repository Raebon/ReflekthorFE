import CategoryGridBannerComponent from "@/components/dashboard-page/CategoryGridBannerComponent";
import type { Metadata } from "next";
import DataTableComponent from "./DataTableComponent";
import axios, { AxiosResponse } from "axios";
import { CategoryDto } from "@/types/reflektor-api-service";

export const metadata: Metadata = {
  title: "Reflektor | Categories",
  description: "Reflektor",
};

async function getCategories(): Promise<CategoryDto[]> {
  try {
    const response: AxiosResponse<CategoryDto[]> = await axios.get(
      `${process.env.API_URL}/blogs/categories`
    );
    return response.data;
  } catch (error) {
    // Handle the error
    throw error;
  }
}

export default async function Category() {
  const initialCategoriesData = await getCategories();
  return (
    <section>
      <CategoryGridBannerComponent />
      <DataTableComponent initialData={initialCategoriesData} />
    </section>
  );
}
