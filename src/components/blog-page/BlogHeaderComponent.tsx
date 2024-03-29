import { FC } from "react";
import Heading from "@/ui/Heading";
import Image from "next/image";
import { BlogContentCreatorLink } from "./BlogContentCreatorLink";

interface BlogHeaderComponentProps {
  title: string;
  imagePath: string;
  publishDate: string;
  author: string;
}

const BlogHeaderComponent: FC<BlogHeaderComponentProps> = ({
  title,
  imagePath,
  publishDate,
  author,
}) => {
  return (
    <div>
      <div className="flex gap-5 mb-2">
        <small className="cursor-pointer">
          <BlogContentCreatorLink author={author} />
          {/* {author} */}
        </small>
        <small className="font-bold">{publishDate}</small>
        {/*  <small>15 seconds</small> */}
      </div>

      <Heading>{title}</Heading>

      <Image
        className="object-fill max-h-[350px] max-w-[976px] w-full my-5"
        src={
          `https://reflekthorstorage.blob.core.windows.net/images/${imagePath}` ||
          "/"
        }
        width={1440}
        height={1080}
        sizes="(max-width: 768px) 100vh, (max-width: 1200px) 50vh, 33vh"
        alt={title!}
        loading="eager"
      />
    </div>
  );
};

export default BlogHeaderComponent;
