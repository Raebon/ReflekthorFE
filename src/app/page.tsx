import type { Metadata } from "next";
import SelectCategoriesBar from "@/components/main-page/SelectCategoriesBar";
import NewBlogSlider from "@/components/main-page/NewBlogSlider";
import NewBlogsGrid from "@/components/main-page/NewBlogsGrid";
import MostReadBlog from "@/components/main-page/MostReadBlog";
import { config } from "@/config";
import {
  CategoryDto,
  PostDto,
  PostsRequest,
} from "@/types/reflektor-api-service";
import axios, { AxiosResponse } from "axios";
//import { getNewBlogs } from "@/utils/api/query/getBlogQueryKey";

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.description,
  applicationName: config.seo.applicationName,
  authors: config.seo.authors,
  keywords: config.seo.keywords,
};

async function getNewBlogs(body: PostsRequest) {
  try {
    const response: AxiosResponse<PostDto[]> = await axios.post(
      `${process.env.API_URL}/blogs/posts`,
      body
    );
    return response.data;
  } catch (error) {
    // Handle the error
    throw error;
  }
}

async function getCategories(): Promise<CategoryDto[]> {
  try {
    const response: AxiosResponse<CategoryDto[]> = await axios.get(
      `${process.env.API_URL}/blogs/categories`
    );
    return response.data;
  } catch (error) {
    // Handle the error
    throw error;
  }
}

const blogSliderBodyRequest = {
  skip: 0,
  take: 5,
  showOnlyPublished: true,
};

const blogGridBodyRequest = {
  skip: 0,
  take: 10,
  showOnlyPublished: true,
  showLatestPosts: true,
};

const mostReadBlogBodyRequest = {
  skip: 0,
  take: 10,
  showOnlyPublished: true,
  showMostReadPosts: true,
};

export default async function Home() {
  const initialSliderData = await getNewBlogs(blogSliderBodyRequest);
  const initialCategoriesData = await getCategories();

  return (
    <div className="max-w-5xl mx-auto min-h-[80vh] px-6">
      <div className="py-2">
        <SelectCategoriesBar initialData={initialCategoriesData} />
        <NewBlogSlider
          initialData={initialSliderData}
          body={blogSliderBodyRequest}
        />
        <div className="w-full h-5" />
        <div className="grid md:grid-cols-3 gap-5">
          <div className="col-span-3 md:col-span-2 my-2">
            <h5 className="my-3 text-3xl font-semibold">Latest articles</h5>
            <NewBlogsGrid
              initialData={initialSliderData}
              body={blogGridBodyRequest}
            />
          </div>
          <div className="w-full my-2">
            <h5 className="my-3 text-3xl font-semibold">Most read articles</h5>
            <MostReadBlog
              initialData={initialSliderData}
              body={mostReadBlogBodyRequest}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
