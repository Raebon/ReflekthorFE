"use client";
import { FC } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useGetCategoriesSetupQuery } from "@/utils/api/query/getCategoriesQueryKey";
import { CategoryDto } from "@/types/reflektor-api-service";

interface DataTableComponentProps {
  initialData: CategoryDto[];
}

const DataTableComponent: FC<DataTableComponentProps> = ({ initialData }) => {
  const { data } = useGetCategoriesSetupQuery(initialData);
  return <DataTable columns={columns} data={data ?? []} />;
};

export default DataTableComponent;
