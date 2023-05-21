"use client";

import AlertBox from "@/components/AlertBox";
import {
  CategoryDto,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "@/types/reflektor-api-service";
import { Button } from "@/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/Dialog";
import { Input } from "@/ui/Input";
import { Label } from "@/ui/Label";
import {
  CreateCategoryBody,
  useEditCategoryMutation,
} from "@/utils/api/mutation/useCategoryMutation";
import { Pencil } from "lucide-react";
import { FC, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "../ui/Toast";

interface CategoryEditDialogProps {
  token: string;
  category: CategoryDto;
}

const CategoryEditDialog: FC<CategoryEditDialogProps> = ({
  token,
  category,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdateCategoryRequest>({
    defaultValues: {
      categoryId: category.categoryId,
      color: category.color,
      name: category.name,
    },
  });
  const colorWatch = watch("color");
  console.log(colorWatch);
  const editCategory = useEditCategoryMutation();

  const onSubmit = (e: CreateCategoryRequest) => {
    let payload: CreateCategoryBody = {
      body: e,
      token: token,
    };

    editCategory.mutateAsync(payload, {
      onSuccess: () => {
        toggleModal();
        toast({
          title: "Success",
          message: "Category is updated successfully!",
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

  const redirectToTailwindDocs = () =>
    window.open("https://tailwindcss.com/docs/customizing-colors", "_blank");

  const toggleModal = useCallback(() => {
    setShowModal((prev) => !prev);
  }, []);

  const resetForm = () =>
    reset({
      categoryId: category.categoryId,
      color: category.color,
      name: category.name,
    });

  return (
    <Dialog onOpenChange={toggleModal} open={showModal}>
      <DialogTrigger asChild onClick={resetForm}>
        <Button>
          <Pencil className="w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {category.name} category</DialogTitle>
          <DialogDescription>
            Fill form to create new blog category
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-2">
          <Label>Name</Label>
          <Input className="col-span-3" type="text" {...register("name")} />
          <Label>Color</Label>
          <Input
            className="col-span-3 mt-2"
            type="text"
            {...register("color")}
          />
          <div></div>
          <div
            className={`col-span-3 w-full rounded-md h-[25px]`}
            style={{ backgroundColor: colorWatch }}
          ></div>
          <div />
          <div className="col-span-4">
            <AlertBox
              title="How to choose color?"
              description={
                <span>
                  Please visit{" "}
                  <Button
                    className="p-0 h-[14px]"
                    variant="link"
                    onClick={redirectToTailwindDocs}
                  >
                    this site
                  </Button>{" "}
                  and choose a color from the palette. Copy and paste its color
                  code, such as [#475569] without the brackets. Then paste it
                  into the „Color“ input and check the corresponding color
                  displayed underneath.
                </span>
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            isLoading={editCategory.isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryEditDialog;
