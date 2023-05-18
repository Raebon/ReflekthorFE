import type { Metadata } from "next";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import CategoryGrid from "@/components/dashboard-page/CategoryGrid";

export const metadata: Metadata = {
  title: "Reflektor | Categories",
  description: "Reflektor",
};

export default async function Category() {
  const session = await getServerSession(authOptions);

  return (
    <section>
      <CategoryGrid categories={[]} />
    </section>
  );
}
