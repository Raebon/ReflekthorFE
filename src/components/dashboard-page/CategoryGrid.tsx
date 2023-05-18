"use client";
import { FC } from "react";
import {
  GridColumnHeaderParams,
  type GridColDef,
  DataGrid,
  GridCellParams,
  GridRowParams,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import { ThemeProvider, createTheme } from "@mui/material";
import { CategoryDto, PostDto } from "@/types/reflektor-api-service";
import { formatDatetime } from "@/utils/formatDatetime";
import { Button } from "@/ui/Button";
import { Delete, Eye, Pencil } from "lucide-react";

const columnsDraft: GridColDef[] = [
  {
    field: "col0",
    headerName: "Color",
    width: 5,
    sortable: false,
    renderCell(params) {
      return <div className={`w-2 h-2 rounded-full bg-${params.value}`}></div>;
    },
  },
  {
    field: "col1",
    headerName: "Category Name",
    width: 200,
    renderHeader(params) {
      return (
        <strong className="font-semibold">{params.colDef.headerName} 🔑</strong>
      );
    },
  },
  {
    field: "col2",
    headerName: "",
    type: "actions",
    getActions: (params: GridRowParams) => [
      <GridActionsCellItem
        key={"gridAction1"}
        icon={<Eye />}
        onClick={() => console.log(params.id)}
        label="Visit category page"
      />,
      <GridActionsCellItem
        key={"gridAction2"}
        icon={<Pencil />}
        onClick={() => console.log(params.id)}
        label="Edit"
        showInMenu
      />,
      <GridActionsCellItem
        key={"gridAction3"}
        icon={<Delete />}
        onClick={() => console.log(params.id)}
        label="Delete"
        showInMenu
      />,
    ],
  },
];

const columns = columnsDraft.map((col) => {
  if (col.field === "col1") {
    return col;
  }
  return {
    ...col,
    renderHeader(params: GridColumnHeaderParams<any, any, any>) {
      return (
        <strong className="font-semibold">{params.colDef.headerName}</strong>
      );
    },
  };
});

/* type ModifiedRequestType<K extends keyof PostDto> = Omit<PostDto, K> & {
  timestamp: string;
}; */

interface DashboardPostGridProps {
  categories: CategoryDto[];
}

const CategoryGrid: FC<DashboardPostGridProps> = ({ categories }) => {
  const { theme: applicationTheme } = useTheme();

  const theme = createTheme({
    palette: {
      mode: applicationTheme === "light" ? "light" : "dark",
    },
  });

  const rows = categories.map((request) => ({
    id: request.categoryId,
    col0: request.color,
    col1: request.name,
    col2: request.categoryId,
  }));

  return (
    <ThemeProvider theme={theme}>
      <DataGrid
        style={{
          backgroundColor: applicationTheme === "light" ? "white" : "#152238",
          fontSize: "1rem",
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25,
            },
          },
        }}
        columns={columns}
        rows={rows}
      ></DataGrid>
    </ThemeProvider>
  );
};

export default CategoryGrid;
