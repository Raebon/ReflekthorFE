import type { Metadata } from "next";
import DashboardNavBar from "@/components/dashboard-page/DashboardStatistics";

export const metadata: Metadata = {
  title: "Dashboard | Reflekthor",
  description:
    "Reflekthor is a blog that focuses on and writes about all kinds of categories. Here you will find articles from different areas including technology, culture, travel and much more. ",
};

export default async function Dashboard() {
  return (
    <section>
      <DashboardNavBar />
    </section>
  );
}
