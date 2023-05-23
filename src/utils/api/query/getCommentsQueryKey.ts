import {
  Comment,
  PostDto,
  PostSeo,
  CommentsRequest,
} from "@/types/reflektor-api-service";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

/* Get blogs */
export const getCommentsQueryKeyPrefix = "comments";

export async function getComments(body: CommentsRequest, token: string) {
  try {
    const response: AxiosResponse<PostDto[]> = await axios.post(
      `/comments`,
      body,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    // Handle the error
    throw error;
  }
}

export const getCommentsQueryKey = (body?: CommentsRequest) => [
  getCommentsQueryKeyPrefix,
  // body,
];

export const getCommentsSetupQuery = (body: CommentsRequest, token: string) => {
  return getComments(body, token);
};

export const useGetCommentsSetupQuery = (
  body: CommentsRequest,
  token: string
): UseQueryResult<Comment[]> => {
  return useQuery(getCommentsQueryKey(body), () =>
    getCommentsSetupQuery(body, token)
  );
};
