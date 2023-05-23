import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Textarea } from "@/components/ui/Textarea";
import {
  CommentsRequest,
  CreateCommentRequest,
} from "@/types/reflektor-api-service";
import {
  CreateCommentBody,
  useCreateCommentMutation,
} from "@/utils/api/mutation/useCommentMutation";
import { useGetCommentsSetupQuery } from "@/utils/api/query/getCommentsQueryKey";
import className from "classnames";
import { Heart } from "lucide-react";
import { FC, useCallback, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { TokenContext } from "../Providers";
import { Button } from "../ui/Button";
import { toast } from "../ui/Toast";
import { formatDistance } from "date-fns";
import { convertUtcToLocal } from "@/utils/convertUtcToLocal";
interface BlogCommentComponentProps {
  postId: number;
}

const CommentItem = ({
  content,
  published,
}: {
  content: string;
  published: string;
}) => {
  return (
    <div className="flex gap-3 my-2">
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/vercel.png" />
          <AvatarFallback>VC</AvatarFallback>
        </Avatar>
      </div>
      <div className="grid gap-2 w-full">
        <div className="font-medium text-md border rounded-md p-2 tracking-tight">
          {content}
        </div>
        <div className="flex justify-between gap-2">
          {/*  <CornerUpLeft className="w-4" /> */}
          <small className="opacity-80">{published}</small>
          <div className="flex gap-1 items-center">
            <Heart className="w-4" />
            <small>13 likes</small>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogCommentComponent: FC<BlogCommentComponentProps> = ({ postId }) => {
  const token = useContext(TokenContext);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateCommentRequest>({
    defaultValues: {
      content: "",
      postId: postId,
    },
  });
  const [body, setBody] = useState<CommentsRequest>({
    skip: 0,
    take: 5,
    postId: postId,
  });
  const [showCommentSection, setShowCommentSection] = useState<boolean>(false);
  const { data } = useGetCommentsSetupQuery(body, token);
  const createComment = useCreateCommentMutation();

  const submitComment = (e: CreateCommentRequest) => {
    let payload: CreateCommentBody = {
      body: e,
      token: token,
    };
    createComment.mutateAsync(payload, {
      onSuccess: () => {
        toast({
          title: "Success",
          message: "Comment is created successfully!",
          type: "success",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          message: "Something is wrong, please check your form!",
          type: "error",
        });
      },
    });
  };

  const handleShowMoreComments = (comentsNumber: number = 5) => {
    setBody((prev) => {
      return {
        skip: prev.skip!,
        take: prev.take! + comentsNumber,
        postId: postId,
      };
    });
  };

  const toggleCommentSection = useCallback(() => {
    setShowCommentSection((prev) => !prev);
  }, []);

  const commentSectionCss = className("flex flex-col gap-2", {
    hidden: !showCommentSection,
  });

  return (
    <div className="my-5" id="blog-comment-section">
      <div
        className="flex justify-center p-3 bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-100 cursor-pointer my-2"
        onClick={toggleCommentSection}
      >
        {showCommentSection ? "Hide comments section" : "Show comments section"}
      </div>
      <div className={commentSectionCss}>
        <Textarea {...register("content")} />
        <div className="flex justify-end mb-5">
          <Button onClick={handleSubmit(submitComment)}>Add comment</Button>
        </div>
        <div className="grid gap-2">
          {data &&
            data.map((item, id) => {
              return (
                <CommentItem
                  key={id}
                  content={item.content as string}
                  published={formatDistance(
                    convertUtcToLocal(item.publishDate ?? new Date()),
                    new Date(),
                    {
                      includeSeconds: true,
                      addSuffix: true,
                    }
                  )}
                />
              );
            })}
          <Button variant="link" onClick={() => handleShowMoreComments(5)}>
            Show more comments
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogCommentComponent;
