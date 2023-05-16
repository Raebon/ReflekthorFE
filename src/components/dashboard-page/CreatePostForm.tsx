"use client";
import { ChangeEvent, FC } from "react";
import PostEditor from "@/components/PostEditor";
import { Input } from "@/ui/Input";
import { Label } from "@/ui/Label";
import CustomCheckbox from "@/components/forms/CustomCheckbox";
import { Button } from "@/ui/Button";
import { useForm } from "react-hook-form";
import { CreatePostRequest } from "@/types/reflektor-api-service";
import { CheckedState } from "@radix-ui/react-checkbox";
import { convertBase64 } from "@/utils/convertBase64";
import { useCreatePostMutation } from "@/utils/api/mutation/useBlogMutation";

interface CreatePostFormProps {
  token: string;
}

const CreatePostForm: FC<CreatePostFormProps> = ({ token }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreatePostRequest>({
    defaultValues: {
      title: undefined,
      content: undefined,
      categoryId: 1,
      isPublished: false,
      image: undefined,
      imageCaption: undefined,
    },
  });
  const createPost = useCreatePostMutation();
  const handleSetObjectValueFromPostEditor = (
    editorState: any,
    editor: string
  ) => {
    setValue("content", editor);
    //console.log(editorState, editor);
  };

  const onSubmit = (e: CreatePostRequest) => {
    console.log(e);
    let payload = {
      body: e,
      token: token,
    };
    createPost.mutateAsync(payload, {
      onSuccess: () => {
        console.log("success");
      },
      onError: () => {
        console.log("error");
      },
    });
  };

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const base64 = await convertBase64(file);
      setValue("image", base64 as any);
    }
  };
  const handleOnCheckedChange = (e: CheckedState) =>
    setValue("isPublished", e as boolean);

  return (
    <div>
      <div className="grid gap-4 mb-2">
        <div>
          <Label size="sm">Title</Label>
          <Input className="mt-1" {...register("title")} required />
        </div>
        <div className="flex gap-4 w-full">
          <div className="w-full">
            <Label size="sm">Upload image</Label>
            <Input
              className="mt-1"
              type="file"
              onChange={onChange}
              accept="image/png, image/jpeg, image/webp"
              required
            />
          </div>
          <div className="w-full">
            <Label className="mt-1" size="sm">
              Alt image text
            </Label>
            <Input className="mt-1" {...register("imageCaption")} required />
          </div>
        </div>

        <div>
          <Label size="sm">Category</Label>
          <div className="grid grid-cols-2 gap-4 mt-1">
            {/* TODO select */}
            <Input />
            <CustomCheckbox
              id="checkbox-publish"
              onCheckedChange={handleOnCheckedChange}
              label="Publish post"
              mutedLabel=" If you check then this post will be published after creating post"
            />
          </div>
        </div>
      </div>
      <PostEditor getEditorObjectValue={handleSetObjectValueFromPostEditor} />
      <div className="mt-4 flex justify-end">
        <Button type="button" onClick={handleSubmit(onSubmit)}>
          Create post
        </Button>
      </div>
    </div>
  );
};

export default CreatePostForm;
