import PostDeleteDialog from "@/components/dashboard-page/PostDeleteDialog";
import PostEditButton from "@/components/dashboard-page/PostEditButton";
import { PostDto } from "@/types/reflektor-api-service";
import { formatDatetime } from "@/utils/formatDatetime";
import { ColumnDef } from "@tanstack/react-table";

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
      return (
        <div className="flex gap-1 justify-end">
          <PostEditButton postId={row.original.postId ?? 0} />
          <PostDeleteDialog row={row} />
        </div>
      );
    },
  },
];
