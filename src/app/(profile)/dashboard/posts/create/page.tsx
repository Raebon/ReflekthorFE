import CreatePostForm from "@/components/dashboard-page/CreatePostForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reflektor | Dashboard",
  description: "Reflektor",
};

export default async function CreatePost() {
  return (
    <section>
      <CreatePostForm />
    </section>
  );
}
