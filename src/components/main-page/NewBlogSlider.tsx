"use client";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import Image from "next/image";
import Link from "next/link";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { PostDto, PostsRequest } from "@/types/reflektor-api-service";
import { useGetBlogsSetupQuery } from "@/utils/api/query/getBlogQueryKey";
import { formatDistance, subDays } from "date-fns";
import { Skeleton } from "@/ui/Skeleton";
import { convertUtcToLocal } from "@/utils/convertUtcToLocal";

interface NewBlogSliderProps {
  body: PostsRequest;
}

const NewBlogSlider: FC<NewBlogSliderProps> = ({ body }) => {
  const { data, isLoading } = useGetBlogsSetupQuery(body);
  SwiperCore.use([Autoplay]);
  return (
    <div className="border-b py-2 dark:border-slate-700 w-full">
      <Swiper
        slidesPerView={1}
        navigation={true}
        pagination={true}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation, Pagination]}
      >
        {isLoading && <Skeleton className="w-max-[976px] h-[350px]" />}
        {data &&
          data.map((value, index) => (
            <SwiperSlide key={index}>
              {isLoading && <Skeleton className="w-max-[976px] h-[350px]" />}
              <Slide data={value}></Slide>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default NewBlogSlider;

function Slide({ data }: { data: PostDto }) {
  const { slug, title, category, publishDate, authorName, imagePath } = data;
  return (
    <>
      <div id="new-blog-image" className="mx-auto flex-none relative">
        <Image
          className="object-fill max-h-[350px] w-[1236px]"
          src={
            `https://reflecthorstorage.blob.core.windows.net/images/${imagePath}` ||
            "/"
          }
          width={350}
          height={1236}
          alt="test"
        />

        <div
          id="info"
          className="absolute w-full left-0 bottom-0 p-5 bg-slate-900/50 flex"
        >
          <div
            className={`w-1 mr-2 ${
              category?.color ? `bg-${category?.color}` : "bg-sky-500"
            }`}
          ></div>
          <div className="w-full">
            <Link href={`/posts/${slug}`}>
              <div id="new-blog-category">
                <span
                  className={`text-sm md:text-md ${
                    category?.color ? `text-${category?.color}` : "text-sky-500"
                  }`}
                >
                  {category?.name}
                </span>
                <span className="text-slate-400 text-sm md:text-md ">
                  {" "}
                  -{" "}
                  {formatDistance(convertUtcToLocal(publishDate!), new Date(), {
                    includeSeconds: true,
                    addSuffix: true,
                  })}
                </span>
              </div>
              <div id="new-blog-title">
                <span className="text-lg md:text-xl font-bold text-slate-100 line-clamp-3 md:line-clamp-2">
                  {title || "Unknown"}
                </span>
              </div>
              <div className="text-sm md:text-md text-slate-400">
                {authorName || "Unknown"}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
