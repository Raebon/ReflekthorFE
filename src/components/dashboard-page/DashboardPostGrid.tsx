"use client";
import { FC } from "react";
import {
  GridColumnHeaderParams,
  type GridColDef,
  DataGrid,
  GridCellParams,
} from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import { ThemeProvider, createTheme } from "@mui/material";
import { PostDto } from "@/types/reflektor-api-service";

const columnsDraft: GridColDef[] = [
  {
    field: "col0",
    headerName: "",
    width: 5,
    renderCell(params) {
      return (
        <div
          className={`w-2 h-2 rounded-full ${
            params.value ? "bg-green-500 animate-pulse " : "bg-red-500"
          }`}
        ></div>
      );
    },
  },
  {
    field: "col1",
    headerName: "Slug",
    width: 200,
    renderHeader(params) {
      return (
        <strong className="font-semibold">{params.colDef.headerName} 🔑</strong>
      );
    },
  },
  {
    field: "col2",
    headerName: "Title",
    width: 400,
    renderHeader(params) {
      return (
        <strong className="font-semibold">{params.colDef.headerName} 📕</strong>
      );
    },
  },
  { field: "col3", headerName: "categoryName", width: 150 },
  { field: "col4", headerName: "authorName", width: 150 },
  { field: "col5", headerName: "publishDate", width: 150 },
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
  posts: PostDto[];
}

const DashboardPostGrid: FC<DashboardPostGridProps> = ({ posts }) => {
  const { theme: applicationTheme } = useTheme();

  const theme = createTheme({
    palette: {
      mode: applicationTheme === "light" ? "light" : "dark",
    },
  });

  const rows = posts.map((request) => ({
    id: request.slug,
    col0: request.isPublished,
    col1: request.slug,
    col2: request.title,
    col3: request.categoryName,
    col4: request.authorName,
    col5: request.publishDate,
  }));

  return (
    <ThemeProvider theme={theme}>
      <DataGrid
        style={{
          backgroundColor: applicationTheme === "light" ? "white" : "#152238",
          fontSize: "1rem",
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        columns={columns}
        rows={rows}
      ></DataGrid>
    </ThemeProvider>
  );
};

export default DashboardPostGrid;
