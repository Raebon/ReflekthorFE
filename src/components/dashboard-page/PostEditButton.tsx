import { FC } from "react";
import { Button } from "../ui/Button";
import { Eye } from "lucide-react";
import Link from "next/link";

interface PostEditButtonProps {
  postId: number;
}

const PostEditButton: FC<PostEditButtonProps> = ({ postId }) => {
  return (
    <Link href={`/dashboard/posts/${postId}`}>
      <Button>
        <Eye className="w-4" />
      </Button>
    </Link>
  );
};

export default PostEditButton;
