import DeleteDialog from "@/components/DeleteDialog";
import { TokenContext } from "@/components/Providers";
import CategoryEditDialog from "@/components/dashboard-page/CategoryEditDialog";
import { toast } from "@/components/ui/Toast";
import { CategoryDto } from "@/types/reflektor-api-service";
import {
  DeleteCategoryBody,
  useDeleteCategoryMutation,
} from "@/utils/api/mutation/useCategoryMutation";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";

export const columns: ColumnDef<CategoryDto>[] = [
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <div
            className="w-[40px] h-[20px] rounded-md"
            style={{ backgroundColor: row.getValue("color") }}
          ></div>
          <span>{row.getValue("color")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "categoryId",
    header: "",
    cell: ({ row }) => {
      const token = React.useContext(TokenContext);
      const deleteCategory = useDeleteCategoryMutation();
      const [category, setCategory] = useState<CategoryDto>({
        categoryId: row.getValue("categoryId"),
        name: row.getValue("name"),
        color: row.getValue("color"),
      });

      useEffect(() => {
        setCategory({
          categoryId: row.getValue("categoryId"),
          name: row.getValue("name"),
          color: row.getValue("color"),
        });
      }, [row.getValue("name"), row.getValue("color")]);

      const handleDeleteCategory = (id: number) => {
        let payload: DeleteCategoryBody = {
          id: id,
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
        <div className="flex gap-1 justify-end">
          <CategoryEditDialog category={category} token={token} />
          <DeleteDialog
            description="This action cannot be undone. This will permanently delete category."
            handleOnDelete={() =>
              handleDeleteCategory(Number(row.getValue("categoryId")))
            }
          />
        </div>
      );
    },
  },
];
