import type { Metadata } from "next";
import CategoryManage from "@/components/dashboard-page/CategoryManage";

export const metadata: Metadata = {
  title: "Reflektor | Categories",
  description: "Reflektor",
};

export default function Category() {
  return (
    <section>
      <CategoryManage />
    </section>
  );
}
