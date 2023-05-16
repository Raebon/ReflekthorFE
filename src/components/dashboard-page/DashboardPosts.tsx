"use client";
import { FC } from "react";
import DashboardPostGrid from "@/components/dashboard-page/DashboardPostGrid";
import { useGetBlogsSetupQuery } from "@/utils/api/query/getBlogQueryKey";
import { PostsRequest } from "@/types/reflektor-api-service";

interface DashboardPostsProps {}

const body: PostsRequest = {
  skip: 0,
  take: 10,
};

const DashboardPosts: FC<DashboardPostsProps> = ({}) => {
  const { data, isLoading } = useGetBlogsSetupQuery(body);
  return <DashboardPostGrid posts={data ?? []} />;
};

export default DashboardPosts;
