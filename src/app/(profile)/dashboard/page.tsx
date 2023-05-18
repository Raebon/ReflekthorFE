import type { Metadata } from "next";
import DashboardNavBar from "@/components/dashboard-page/DashboardStatistics";

export const metadata: Metadata = {
  title: "Reflekthor | Dashboard",
  description: "Reflektor",
};

export default async function Dashboard() {
  return (
    <section>
      <DashboardNavBar />
    </section>
  );
}
