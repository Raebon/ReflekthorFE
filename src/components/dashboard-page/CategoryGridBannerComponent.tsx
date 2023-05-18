"use client";
import React, { FC } from "react";
import CategoryCreateDialog from "./CategoryCreateDialog";
import { TokenContext } from "@/components/Providers";

interface CategoryCreateComponentProps {}

const CategoryGridBannerComponent: FC<CategoryCreateComponentProps> = ({}) => {
  const token = React.useContext(TokenContext);
  return (
    <div className="flex justify-end mb-2">
      <CategoryCreateDialog token={token} />
    </div>
  );
};

export default CategoryGridBannerComponent;
