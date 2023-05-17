import { ArrowBigLeftDash, MessageSquare } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface BlogTopRedirectBannerProps {}

const BlogTopRedirectBanner: FC<BlogTopRedirectBannerProps> = ({}) => {
  return (
    <div className="flex justify-between my-3 border-b py-2">
      <Link
        href="/"
        className="flex gap-1 items-center hover:text-slate-800 dark:hover:text-slate-200 hover:scale-110"
      >
        <ArrowBigLeftDash className="w-3.5" />
        <span>back</span>
      </Link>
      <div>
        <a href="#blog-comment-section" title="Scroll into comment section">
          <MessageSquare className="w-3.5 hover:cursor-pointer hover:text-slate-800 dark:hover:text-slate-200 hover:scale-110" />
        </a>
      </div>
    </div>
  );
};

export default BlogTopRedirectBanner;
