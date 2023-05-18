"use client";
import { FC } from "react";
import Image from "next/image";
import { PostDto, PostsRequest } from "@/types/reflektor-api-service";
import { useGetBlogsSetupQuery } from "@/utils/api/query/getBlogQueryKey";
import { formatDistance, subDays } from "date-fns";
import { Skeleton } from "@/ui/Skeleton";
import { convertUtcToLocal } from "@/utils/convertUtcToLocal";
import Link from "next/link";

interface MostReadBlogProps {
  body: PostsRequest;
}

const MostReadBlog: FC<MostReadBlogProps> = ({ body }) => {
  const { data, isLoading } = useGetBlogsSetupQuery(body);
  const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <section className="grid gap-5">
      {isLoading &&
        skeletonArray.map((item, index) => (
          <div key={index} className={`flex gap-3`}>
            <Skeleton className="w-[115px] h-[153px]" />
            <div className="flex flex-col gap-1">
              <Skeleton className="w-[185px] h-[10px]" />
              <Skeleton className="w-[185px] h-[10px]" />
              <Skeleton className="w-[185px] h-[10px]" />
              <Skeleton className="w-[185px] h-[10px]" />
              <Skeleton className="w-[185px] h-[10px]" />
              <Skeleton className="w-[185px] h-[10px]" />
              <Skeleton className="w-[185px] h-[10px]" />
              <Skeleton className="w-[185px] h-[10px]" />
              <Skeleton className="w-[185px] h-[10px]" />
              <Skeleton className="w-[185px] h-[20px]" />
            </div>
          </div>
        ))}
      {data &&
        data.map((item, index) => {
          return <BlogItem key={index} data={item} />;
        })}
    </section>
  );
};

export default MostReadBlog;

function BlogItem({ data }: { data: PostDto }) {
  const {
    slug,
    title,
    category,
    publishDate,
    content,
    authorName,
    imageSmallPath,
  } = data;

  return (
    <Link className="flex gap-3" href={`/posts/${slug}`}>
      <Image
        className="object-cover w-[115px] h-[153px]"
        src={`https://reflecthorstorage.blob.core.windows.net/images/${imageSmallPath}`}
        width={115}
        height={153}
        alt="test"
      />
      <div className="leading-5 tracking-tight flex flex-col gap-2 py-1">
        <div
          className={`h-0.5 w-7`}
          style={{ backgroundColor: category?.color ?? "gray" }}
        />
        <span className="text-sm font-semibold">{title}</span>
        <span className="text-sm mt-2">
          {" "}
          {formatDistance(
            new Date(convertUtcToLocal(publishDate ?? new Date())),
            new Date(),
            {
              includeSeconds: true,
              addSuffix: true,
            }
          )}
        </span>
      </div>
    </Link>
  );
}
