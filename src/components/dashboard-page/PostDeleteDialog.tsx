import React from "react";
import { FC } from "react";
import { TokenContext } from "../Providers";
import {
  DeletePostBody,
  useDeletePostMutation,
} from "@/utils/api/mutation/useBlogMutation";
import { PostDto } from "@/types/reflektor-api-service";
import { Row } from "@tanstack/react-table";
import { toast } from "../ui/Toast";
import DeleteDialog from "../DeleteDialog";

interface PostDeleteDialogProps {
  row: Row<PostDto>;
}

const PostDeleteDialog: FC<PostDeleteDialogProps> = ({ row }) => {
  const token = React.useContext(TokenContext);
  const deletePost = useDeletePostMutation();

  const handleDeletePost = () => {
    let payload: DeletePostBody = {
      id: Number(row.getValue("postId")),
      token: token,
    };
    deletePost.mutateAsync(payload, {
      onSuccess: () => {
        toast({
          title: "Success",
          message: "Category is created successfully!",
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
  return (
    <DeleteDialog
      description="This action cannot be undone. This will permanently delete post."
      handleOnDelete={handleDeletePost}
    />
  );
};

export default PostDeleteDialog;
