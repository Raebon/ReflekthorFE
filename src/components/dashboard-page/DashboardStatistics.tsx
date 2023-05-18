"use client";
import { FC, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Button } from "@/ui/Button";
import { toast } from "@/ui/Toast";
interface DashboardNavBarProps {}

const DashboardStatistics: FC<DashboardNavBarProps> = ({}) => {
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
    <Tabs defaultValue={"my-statistics"} className="w-full">
      <TabsList>
        <TabsTrigger value="my-statistics">My Statistics</TabsTrigger>
        <TabsTrigger value="blog-statistics">Blog Statistics</TabsTrigger>
      </TabsList>
      <TabsContent value="my-statistics">
        my stats
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
      <TabsContent value="blog-statistics">Blogs stats</TabsContent>
    </Tabs>
  );
};

export default DashboardStatistics;
