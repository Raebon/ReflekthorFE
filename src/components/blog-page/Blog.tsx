"use client";
import { FC } from "react";
import { useGetBlogBySlugSetupQuery } from "@/utils/api/query/getBlogQueryKey";
import BlogHeaderComponent from "./BlogHeaderComponent";
import { formatDatetime } from "@/utils/formatDatetime";
import BlogContentComponent from "./BlogContentComponent";
import { Skeleton } from "@/ui/Skeleton";
import BlogTopRedirectBanner from "./BlogTopRedirectBanner";
import BlogCommentComponent from "./BlogCommentComponent";

interface BlogProps {
  slug: string;
}

const Blog: FC<BlogProps> = ({ slug }) => {
  const { data, isLoading } = useGetBlogBySlugSetupQuery(slug);
  return (
    <div>
      <BlogTopRedirectBanner />
      {isLoading ? (
        <div className="flex flex-col">
          <div className="flex gap-5 mb-2">
            <Skeleton className="w-[110px] h-[20px]" />
            <Skeleton className="w-[110px] h-[20px]" />
            <Skeleton className="w-[70px] h-[20px]" />
          </div>
          <Skeleton className="w-full h-[60px] mt-5 mb-2" />
          <Skeleton className="w-full h-[60px] mb-5" />
          <Skeleton className="w-full h-[350px] my-5" />
          <Skeleton className="w-full h-[20px] mb-1" />
          <Skeleton className="w-full h-[20px] mb-1" />
          <Skeleton className="w-full h-[20px] mb-1" />
          <Skeleton className="w-full h-[20px] mb-1" />
          <Skeleton className="w-full h-[20px] mb-1" />
          <Skeleton className="w-full h-[20px] mb-1" />
          <Skeleton className="w-full h-[20px] mb-1" />
          <Skeleton className="w-full h-[20px] mb-1" />
          <Skeleton className="w-full h-[20px] mb-1" />
        </div>
      ) : null}
      {data ? (
        <>
          <BlogHeaderComponent
            title={data?.title!}
            imagePath={data?.imagePath!}
            publishDate={formatDatetime(new Date(data?.publishDate!))}
            author={data?.authorName!}
          />
          <BlogContentComponent content={data?.content!} />
        </>
      ) : null}
      {data && data?.postId && <BlogCommentComponent postId={data.postId} />}
    </div>
  );
};

export default Blog;
