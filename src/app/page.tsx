import type { Metadata } from "next";
import { Suspense } from "react";
import SelectCategoriesBar from "@/components/main-page/SelectCategoriesBar";
import NewBlogSlider from "@/components/main-page/NewBlogSlider";
import NewBlogsGrid from "@/components/main-page/NewBlogsGrid";
import MostReadBlog from "@/components/main-page/MostReadBlog";

export const metadata: Metadata = {
  title: "Reflektor | Domovská stránka",
  description: "Reflektor",
  applicationName: "ReflekthorBlogCMS",
  authors: {
    name: "REFLEKTHOR",
    url: "http://www.reflekthor.com",
  },
  generator: "Next.js",
  keywords: "reflekthor, finance, technology, blog, lifestyle",
};

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto min-h-[80vh] px-6">
      <div className="py-2">
        <SelectCategoriesBar />
        <Suspense fallback={<p>Loading feed...</p>}>
          <NewBlogSlider
            body={{
              skip: 0,
              take: 5,
              showOnlyPublished: true,
            }}
          />
        </Suspense>
        <div className="w-full h-5" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          <div className="col-span-3 md:col-span-2 my-2">
            <h5 className="my-3 text-3xl font-semibold">Latest articles</h5>
            <NewBlogsGrid
              body={{
                skip: 0,
                take: 10,
                showOnlyPublished: true,
                showLatestPosts: true,
              }}
            />
          </div>
          <div className="w-full my-2">
            <h5 className="my-3 text-3xl font-semibold">Most read articles</h5>
            <MostReadBlog
              body={{
                skip: 0,
                take: 10,
                showOnlyPublished: true,
                showMostReadPosts: true,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
