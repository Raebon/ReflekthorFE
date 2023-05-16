import Blog from "@/components/blog-page/Blog";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: `Reflektor | Post`,
  description: "Learning Next.js SEO",
};
export default function Page({ params }: any) {
  return <Blog slug={params.slug} />;
}
