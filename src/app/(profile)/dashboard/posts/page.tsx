import type { Metadata } from "next";
import DataTableComponent from "./DataTableComponent";

export const metadata: Metadata = {
  title: "Reflektor | Dashboard",
  description: "Reflektor",
};

export default function PostsOverview() {
  return (
    <section>
      <DataTableComponent />
    </section>
  );
}
