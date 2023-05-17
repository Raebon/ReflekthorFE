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
import { PostDto } from "@/types/reflektor-api-service";
import { formatDatetime } from "@/utils/formatDatetime";
import { Button } from "@/ui/Button";
import { Delete, Eye, Pencil } from "lucide-react";

const columnsDraft: GridColDef[] = [
  {
    field: "col0",
    headerName: "",
    width: 5,
    sortable: false,
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
    width: 380,
  },
  { field: "col3", headerName: "Category", width: 150 },
  { field: "col4", headerName: "Author", width: 150 },
  { field: "col5", headerName: "Published date", width: 160 },
  {
    field: "col6",
    headerName: "",
    type: "actions",
    getActions: (params: GridRowParams) => [
      <GridActionsCellItem
        key={"gridAction1"}
        icon={<Eye />}
        label="Visit blog"
        showInMenu
      />,
      <GridActionsCellItem
        key={"gridAction2"}
        icon={<Pencil />}
        label="Edit"
        showInMenu
      />,
      <GridActionsCellItem
        key={"gridAction3"}
        icon={<Delete />}
        label="Delete"
        showInMenu
      />,
    ],
    /*     width: 500, */
    /*  renderCell(params) {
      return (
        <div className="space-x-2 w-full">
          <Button>
            <Eye className="w-7" />
          </Button>
          <Button>
            <Eye className="w-7" />
          </Button>
          <Button>
            <Eye className="w-7" />
          </Button>
        </div>
      );
    }, */
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
    col3: request.category?.name,
    col4: request.authorName,
    col5: formatDatetime(new Date(request.publishDate!), "P"),
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

export default DashboardPostGrid;
