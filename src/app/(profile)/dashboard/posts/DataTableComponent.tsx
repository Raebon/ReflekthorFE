"use client";
import { FC } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useGetBlogsSetupQuery } from "@/utils/api/query/getBlogQueryKey";
import { PostsRequest } from "@/types/reflektor-api-service";
interface DataTableComponentProps {}

const body: PostsRequest = {
  skip: 0,
  take: 100,
};

const DataTableComponent: FC<DataTableComponentProps> = ({}) => {
  const { data, isLoading } = useGetBlogsSetupQuery(body);
  return <DataTable columns={columns} data={data ?? []} />;
};

export default DataTableComponent;
