import PostCreateForm from "@/components/dashboard-page/PostCreateForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reflektor | Dashboard",
  description: "Reflektor",
};

export default async function CreatePost() {
  return (
    <section>
      <PostCreateForm />
    </section>
  );
}
