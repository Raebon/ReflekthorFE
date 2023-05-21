import CategoryDeleteDialog from "@/components/dashboard-page/CategoryDeleteDialog";
import CategoryEditDialog from "@/components/dashboard-page/CategoryEditDialog";
import { CategoryDto } from "@/types/reflektor-api-service";
import { ColumnDef } from "@tanstack/react-table";

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
      return (
        <div className="flex gap-1 justify-end">
          <CategoryEditDialog row={row} />
          <CategoryDeleteDialog row={row} />
        </div>
      );
    },
  },
];
