import { ArrowBigLeftDash, MessageSquare } from "lucide-react";
import { FC } from "react";

interface BlogTopRedirectBannerProps {}

const BlogTopRedirectBanner: FC<BlogTopRedirectBannerProps> = ({}) => {
  return (
    <div className="flex justify-between my-3 border-b py-2">
      <div className="flex gap-1 items-center">
        <ArrowBigLeftDash className="w-3.5" />
        <span className="">back</span>
      </div>
      <div>
        <a href="#blog-comment-section" title="Scroll into comment section">
          <MessageSquare className="w-3.5 hover:cursor-pointer" />
        </a>
      </div>
    </div>
  );
};

export default BlogTopRedirectBanner;
