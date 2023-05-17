import CreatePostForm from "@/components/dashboard-page/CreatePostForm";
import DashboardPosts from "@/components/dashboard-page/DashboardPosts";
import type { Metadata } from "next";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Reflektor | Dashboard",
  description: "Reflektor",
};

export default async function CreatePost() {
  const session = await getServerSession(authOptions);
  return (
    <section>
      <CreatePostForm token={session.accessToken.accessToken} />
    </section>
  );
}
