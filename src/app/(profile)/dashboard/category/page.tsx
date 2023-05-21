"use client";
import CategoryGridBannerComponent from "@/components/dashboard-page/CategoryGridBannerComponent";
import { useGetCategoriesSetupQuery } from "@/utils/api/query/getCategoriesQueryKey";
import type { Metadata } from "next";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export const metadata: Metadata = {
  title: "Reflektor | Categories",
  description: "Reflektor",
};

export default function Category() {
  const { data } = useGetCategoriesSetupQuery();
  return (
    <section>
      <CategoryGridBannerComponent />
      <DataTable columns={columns} data={data ?? []} />
    </section>
  );
}
