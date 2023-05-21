import CategoryGridBannerComponent from "@/components/dashboard-page/CategoryGridBannerComponent";
import type { Metadata } from "next";
import DataTableComponent from "./DataTableComponent";

export const metadata: Metadata = {
  title: "Reflektor | Categories",
  description: "Reflektor",
};

export default function Category() {
  return (
    <section>
      <CategoryGridBannerComponent />
      <DataTableComponent />
    </section>
  );
}
