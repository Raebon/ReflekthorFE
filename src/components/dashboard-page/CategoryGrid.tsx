"use client";
import { CategoryDto } from "@/types/reflektor-api-service";
import { ThemeProvider, createTheme } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumnHeaderParams,
  GridRowParams,
  type GridColDef,
} from "@mui/x-data-grid";
import { Delete, Eye, Pencil } from "lucide-react";
import { useTheme } from "next-themes";
import { FC } from "react";

const columnsDraft: GridColDef[] = [
  {
    field: "col0",
    headerName: "Color",
    width: 140,
    sortable: false,
    renderCell(params) {
      return (
        <div
          className={`w-[100px] h-5 rounded-md`}
          style={{ backgroundColor: params.value }}
        ></div>
      );
    },
  },
  {
    field: "col1",
    headerName: "Category Name",
    width: 250,
    renderHeader(params) {
      return (
        <strong className="font-semibold">{params.colDef.headerName} 🔑</strong>
      );
    },
  },
  {
    field: "col2",
    headerName: "",
    width: 920,
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
      />,
      <GridActionsCellItem
        key={"gridAction3"}
        icon={<Delete />}
        onClick={() => console.log(params.id)}
        label="Delete"
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
