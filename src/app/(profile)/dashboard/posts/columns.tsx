import DeleteDialog from "@/components/DeleteDialog";
import { TokenContext } from "@/components/Providers";
import { toast } from "@/components/ui/Toast";
import { PostDto } from "@/types/reflektor-api-service";
import {
  DeletePostBody,
  useDeletePostMutation,
} from "@/utils/api/mutation/useBlogMutation";
import { formatDatetime } from "@/utils/formatDatetime";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

export const columns: ColumnDef<PostDto>[] = [
  {
    accessorKey: "isPublished",
    header: "",
    cell: ({ row }) => {
      return (
        <div
          className={`w-2 h-2 rounded-full ${
            row.getValue("isPublished")
              ? "bg-green-500 animate-pulse "
              : "bg-red-500"
          }`}
        ></div>
      );
    },
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
  {
    accessorKey: "authorName",
    header: "Author",
  },
  {
    accessorKey: "publishDate",
    header: "Published date",
    cell: ({ row }) => {
      return (
        <span>
          {formatDatetime(new Date(row.getValue("publishDate")), "P")}
        </span>
      );
    },
  },
  {
    accessorKey: "postId",
    header: "",
    cell: ({ row }) => {
      const token = React.useContext(TokenContext);
      const deletePost = useDeletePostMutation();

      const handleDeletePost = () => {
        let payload: DeletePostBody = {
          id: Number(row.getValue("postId")),
          token: token,
        };
        deletePost.mutateAsync(payload, {
          onSuccess: () => {
            toast({
              title: "Success",
              message: "Category is created successfully!",
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
          <DeleteDialog
            description="This action cannot be undone. This will permanently delete post."
            handleOnDelete={handleDeletePost}
          />
        </div>
      );
    },
  },
];
