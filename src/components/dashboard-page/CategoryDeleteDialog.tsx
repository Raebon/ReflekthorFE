"use client";
import { CategoryDto } from "@/types/reflektor-api-service";
import {
  DeleteCategoryBody,
  useDeleteCategoryMutation,
} from "@/utils/api/mutation/useCategoryMutation";
import { Row } from "@tanstack/react-table";
import React, { FC } from "react";
import DeleteDialog from "../DeleteDialog";
import { TokenContext } from "../Providers";
import { toast } from "../ui/Toast";

interface CategoryDeleteDialogProps {
  row: Row<CategoryDto>;
}

const CategoryDeleteDialog: FC<CategoryDeleteDialogProps> = ({ row }) => {
  const token = React.useContext(TokenContext);
  const deleteCategory = useDeleteCategoryMutation();

  const handleDeleteCategory = () => {
    let payload: DeleteCategoryBody = {
      id: row.getValue("categoryId"),
      token: token,
    };
    deleteCategory.mutateAsync(payload, {
      onSuccess: () => {
        toast({
          title: "Success",
          message: "Category is deleted successfully!",
          type: "success",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          message: "Something is wrong, please check your form!",
          type: "error",
        });
      },
    });
  };
  return (
    <DeleteDialog
      description="This action cannot be undone. This will permanently delete category."
      handleOnDelete={handleDeleteCategory}
    />
  );
};

export default CategoryDeleteDialog;
