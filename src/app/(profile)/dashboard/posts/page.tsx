import DashboardPosts from "@/components/dashboard-page/DashboardPosts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reflektor | Dashboard",
  description: "Reflektor",
};

export default function PostsOverview() {
  return (
    <section>
      <DashboardPosts />
    </section>
  );
}
