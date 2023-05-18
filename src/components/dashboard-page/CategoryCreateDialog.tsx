"use client";

import { signIn } from "next-auth/react";
import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/ui/Dialog";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { Label } from "@/ui/Label";
import { useForm, FieldValues } from "react-hook-form";
import { CreateCategoryRequest } from "@/types/reflektor-api-service";
import { PlusCircle } from "lucide-react";
import AlertBox from "@/components/AlertBox";
import {
  CreateCategoryBody,
  useCreateCategoryMutation,
} from "@/utils/api/mutation/useCategoryMutation";
import { toast } from "../ui/Toast";
//import { toast } from "./toast";

interface CategoryCreateDialogProps {
  token: string; //TODO: context?
}

const CategoryCreateDialog: FC<CategoryCreateDialogProps> = ({ token }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateCategoryRequest>({
    defaultValues: {
      color: "black",
      name: undefined,
    },
  });
  const colorWatch = watch("color");
  const createCategory = useCreateCategoryMutation();

  const onSubmit = (e: CreateCategoryRequest) => {
    let payload: CreateCategoryBody = {
      body: e,
      token: token,
    };

    createCategory.mutateAsync(payload, {
      onSuccess: () => {
        toast({
          title: "Success",
          message: "Category is created successfully!",
          type: "success",
        });
        reset();
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

  const resetForm = () => {
    reset();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={resetForm}>
          <PlusCircle className="w-4 mr-2" /> Create new category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new category</DialogTitle>
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
                  Please visit
                  <Button
                    className="p-0 h-[14px]"
                    variant="link"
                    onClick={redirectToTailwindDocs}
                  >
                    this site
                  </Button>
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
            type="button"
            isLoading={createCategory.isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryCreateDialog;
