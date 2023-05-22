"use client";
import { FC } from "react";
import Image from "next/image";
import { PostDto, PostsRequest } from "@/types/reflektor-api-service";
import { formatDistance, subDays } from "date-fns";
import { useGetBlogsSetupQuery } from "@/utils/api/query/getBlogQueryKey";
import { Skeleton } from "@/ui/Skeleton";
import { convertUtcToLocal } from "@/utils/convertUtcToLocal";
import Link from "next/link";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
interface BlogGridProps {
  body: PostsRequest;
}

const NewBlogsGrid: FC<BlogGridProps> = ({ body }) => {
  const { data, isLoading } = useGetBlogsSetupQuery(body);
  const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <section className="grid md:grid-cols-2 gap-5">
      {isLoading &&
        skeletonArray.map((item, index) => (
          <div key={index} className={`flex flex-col`}>
            <Skeleton className="w-max-[312px] h-[188px]" />
            <Skeleton className="w-max-[312px] h-[10px] mt-2" />
            <Skeleton className="w-max-[312px] h-[10px] mt-1" />
            <Skeleton className="w-max-[312px] h-[10px] mt-1" />
            <Skeleton className="w-max-[312px] h-[20px] mt-1" />
          </div>
        ))}

      {data &&
        data.map((item: PostDto, index: number) => {
          return <BlogItem key={index} data={item} />;
        })}
    </section>
  );
};
export default NewBlogsGrid;

function BlogItem({ data }: { data: PostDto }) {
  const {
    slug,
    title,
    category,
    publishDate,
    content,
    authorName,
    imageMediumPath,
  } = data;
  return (
    <Link href={`/posts/${slug}`} className="flex flex-col">
      <Image
        className="w-full h-[188px]"
        src={
          `https://reflecthorstorage.blob.core.windows.net/images/${imageMediumPath}` ||
          "/"
        }
        width={600}
        height={400}
        alt={title!}
      />
      <div className="leading-5 tracking-tight flex flex-col mt-2">
        <span className="text-sm font-semibold">{title}</span>
        <span className="text-sm text-start mt-1">
          {formatDistance(
            convertUtcToLocal(publishDate ?? new Date()),
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
