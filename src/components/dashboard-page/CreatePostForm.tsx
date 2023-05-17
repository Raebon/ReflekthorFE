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
import { toast } from "@/ui/Toast";
import { useGetCategoriesSetupQuery } from "@/utils/api/query/getCategoriesQueryKey";
import CustomSelect from "@/components/forms/CustomSelect";
import { SelectItemType } from "@/types/appTypes";
import { convertCategoryItems } from "@/utils/parsingItemsForSelect";

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
    control,
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
  const selectedCategoryWatch = watch("categoryId");
  const { data: categories, isLoading: categoriesIsLoading } =
    useGetCategoriesSetupQuery();

  const createPost = useCreatePostMutation();

  const handleSetObjectValueFromPostEditor = (
    editorState: any,
    editor: string
  ) => {
    setValue("content", editor);
    //console.log(editorState, editor);
  };

  const onSubmit = (e: CreatePostRequest) => {
    let payload = {
      body: e,
      token: token,
    };
    createPost.mutateAsync(payload, {
      onSuccess: () => {
        toast({
          title: "Success",
          message: "Post is created successfully!",
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

  const onSelectCategory = (e: string) => setValue("categoryId", Number(e));

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
      <div className="grid gap-4 mb-5">
        <div className="form-group required">
          <Label className="control-label" size="sm">
            Title
          </Label>
          <Input
            className={`mt-1 `}
            {...register("title", { required: "This is required." })}
            required
            errorMessage={errors.title?.message}
          />
        </div>
        <div className="flex gap-4 w-full">
          <div className="form-group required w-full">
            <Label className="control-label" size="sm">
              Upload image
            </Label>
            <Input
              className="mt-1"
              type="file"
              onChange={onChange}
              accept="image/png, image/jpeg, image/webp"
              required
            />
          </div>
          <div className="form-group required w-full">
            <Label className="control-label mt-1" size="sm">
              Alt image text
            </Label>
            <Input
              className="mt-1"
              {...register("imageCaption", { required: true })}
              required
            />
          </div>
        </div>

        <div>
          <Label size="sm">Category</Label>
          <div className="grid grid-cols-2 gap-4 mt-1">
            {/* TODO select */}
            <CustomSelect
              items={convertCategoryItems(categories)}
              onChangeValue={onSelectCategory}
              placeholder="Select category"
              value={String(selectedCategoryWatch)}
              isLoading={categoriesIsLoading}
            />
            <CustomCheckbox
              id="checkbox-publish"
              onCheckedChange={handleOnCheckedChange}
              label="Publish post"
              mutedLabel="If you check then this post will be published after creating post"
            />
          </div>
        </div>
      </div>
      <PostEditor getEditorObjectValue={handleSetObjectValueFromPostEditor} />
      <div className="mt-4 flex justify-end">
        <Button
          type="button"
          onClick={handleSubmit(onSubmit)}
          isLoading={createPost.isLoading}
        >
          Create post
        </Button>
      </div>
    </div>
  );
};

export default CreatePostForm;
