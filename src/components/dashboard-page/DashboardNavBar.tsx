import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import CreatePostForm from "@/components/dashboard-page/CreatePostForm";
import DashboardPosts from "@/components/dashboard-page/DashboardPosts";

interface DashboardNavBarProps {
  token: string;
}

const DashboardNavBar: FC<DashboardNavBarProps> = ({ token }) => {
  console.log(token);
  return (
    <Tabs defaultValue="statistics" className="w-full">
      <TabsList>
        <TabsTrigger value="statistics">Statistics</TabsTrigger>
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="create-post">Create Post</TabsTrigger>
      </TabsList>
      <TabsContent value="statistics">Statistics content</TabsContent>
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
