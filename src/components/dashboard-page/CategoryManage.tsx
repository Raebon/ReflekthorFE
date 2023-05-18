"use client";
import { FC } from "react";
import CategoryGrid from "./CategoryGrid";
import { useGetCategoriesSetupQuery } from "@/utils/api/query/getCategoriesQueryKey";
import CategoryGridBannerComponent from "./CategoryGridBannerComponent";

interface CategoryManageProps {}

const CategoryManage: FC<CategoryManageProps> = ({}) => {
  const { data } = useGetCategoriesSetupQuery();
  return (
    <>
      <CategoryGridBannerComponent />
      <CategoryGrid categories={data ?? []} />
    </>
  );
};

export default CategoryManage;
