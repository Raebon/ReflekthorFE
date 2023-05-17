import type { Metadata } from "next";
import DashboardNavBar from "@/components/dashboard-page/DashboardStatistics";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Reflektor | Dashboard",
  description: "Reflektor",
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  return (
    <section>
      <DashboardNavBar token={session.accessToken.accessToken} />
    </section>
  );
}
