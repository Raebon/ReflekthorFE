"use client";
import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import CreatePostForm from "@/components/dashboard-page/CreatePostForm";
import DashboardPosts from "@/components/dashboard-page/DashboardPosts";
import { Button } from "@/ui/Button";
import { toast } from "@/ui/Toast";

interface DashboardNavBarProps {
  token: string;
}

const DashboardNavBar: FC<DashboardNavBarProps> = ({ token }) => {
  const toastSuccess = () => {
    toast({
      title: "Success",
      message: "Success",
      type: "success",
    });
  };
  const toastError = () => {
    toast({
      title: "Error",
      message: "error",
      type: "error",
    });
  };
  const defaultError = () => {
    toast({
      title: "Default",
      message: "Default",
      type: "default",
    });
  };
  return (
    <Tabs defaultValue="statistics" className="w-full">
      <TabsList>
        <TabsTrigger value="statistics">Statistics</TabsTrigger>
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="create-post">Create Post</TabsTrigger>
      </TabsList>
      <br />
      <br />
      <span className="text-2xl text-red-500 mx-3.5 my-5">
        Tuhle komponentu odstraním. Tab komponenta se sem nehodí lepší bude
        navigační menu co je nahoře
      </span>
      <TabsContent value="statistics">
        <div className="space-x-2">
          <Button variant="outline" onClick={toastSuccess}>
            Toast Success
          </Button>
          <Button variant="destructive" onClick={toastError}>
            Toast Desctructive
          </Button>
          <Button onClick={defaultError}>Toast Default</Button>
        </div>
      </TabsContent>
      <TabsContent value="posts">
        <DashboardPosts />
      </TabsContent>
      <TabsContent value="create-post">
        <CreatePostForm token={token} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardNavBar;
