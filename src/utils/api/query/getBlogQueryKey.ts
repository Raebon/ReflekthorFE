import { PostsRequest, PostDto } from "@/types/reflektor-api-service";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

/* Get blogs */
export const getBlogQueryKeyPrefix = "blog-posts";

async function getNewBlogs(body: PostsRequest) {
  try {
    const response: AxiosResponse<PostDto[]> = await axios.post(
      `/blogs/posts`,
      body
    );
    return response.data;
  } catch (error) {
    // Handle the error
    throw error;
  }
}

export const getBlogsQueryKey = (body?: PostsRequest) => [
  getBlogQueryKeyPrefix,
  // body,
];

export const getBlogsSetupQuery = (body: PostsRequest) => {
  return getNewBlogs(body);
};

export const useGetBlogsSetupQuery = (
  body: PostsRequest
): UseQueryResult<PostDto[]> => {
  return useQuery(getBlogsQueryKey(body), () => getBlogsSetupQuery(body));
};

/* Get blog object from slug */
export const getBlogBySlugQueryKeyPrefix = "blog-post";
async function getBlogBySlug(body: string) {
  try {
    const response: AxiosResponse<PostDto> = await axios.get(`/blogs/${body}`);
    return response.data;
  } catch (error) {
    // Handle the error
    throw error;
  }
}

export const getBlogBySlugQueryKey = (body: string) => [
  getBlogBySlugQueryKeyPrefix,
  body,
];

export const getBlogBySlugSetupQuery = (body: string) => {
  return getBlogBySlug(body);
};

export const useGetBlogBySlugSetupQuery = (
  body: string
): UseQueryResult<PostDto> => {
  return useQuery(
    getBlogBySlugQueryKey(body),
    () => getBlogBySlugSetupQuery(body),
    {
      retryOnMount: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};
