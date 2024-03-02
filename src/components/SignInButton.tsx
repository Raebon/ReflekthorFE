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
//import { toast } from "./toast";

interface SignInButtonProps { }

const SignInButton: FC<SignInButtonProps> = ({ }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: undefined,
      password: undefined,
    },
  });

  const onSubmit = (e: FieldValues) => {
    let payload: { email: string; password: string } = {
      email: e.email,
      password: e.password,
    };
    signInWithCredentials(payload);
  };

  const signInWithCredentials = async (body: {
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      await signIn("credentials", {
        redirect: true,
        email: body.email,
        password: body.password,
        callbackUrl: `/`,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sign in</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Log-in into our site. Type your credentials here
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label>E-mail</Label>
          <Input className="col-span-3" type="email" {...register("email")} />
          <Label>Password</Label>
          <Input
            className="col-span-3"
            type="password"
            {...register("password")}
          />
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleSubmit(onSubmit)}
            isLoading={isLoading}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignInButton;

/* export async function getServerSideProps(context: any) {
  console.log(context);
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
} */
