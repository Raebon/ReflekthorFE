"use client";

import type { Metadata } from "next";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useGetBlogsSetupQuery } from "@/utils/api/query/getBlogQueryKey";
import { PostsRequest } from "@/types/reflektor-api-service";

export const metadata: Metadata = {
  title: "Reflektor | Dashboard",
  description: "Reflektor",
};

const body: PostsRequest = {
  skip: 0,
  take: 100,
};

export default function PostsOverview() {
  const { data, isLoading } = useGetBlogsSetupQuery(body);
  return (
    <section>
      <DataTable columns={columns} data={data ?? []} />
    </section>
  );
}
