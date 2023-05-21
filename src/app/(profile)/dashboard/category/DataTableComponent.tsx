"use client";
import { FC } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useGetCategoriesSetupQuery } from "@/utils/api/query/getCategoriesQueryKey";

interface DataTableComponentProps {}

const DataTableComponent: FC<DataTableComponentProps> = ({}) => {
  const { data } = useGetCategoriesSetupQuery();
  return <DataTable columns={columns} data={data ?? []} />;
};

export default DataTableComponent;
