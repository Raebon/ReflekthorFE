import {
  CreateCategoryRequest,
  CreateCommentRequest,
  UpdateCategoryRequest,
} from "@/types/reflektor-api-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { getCategoriesQueryKey } from "../query/getCategoriesQueryKey";
import { getCommentsQueryKey } from "../query/getCommentsQueryKey";

//Create category
async function createComment(body: CreateCommentRequest, token: string) {
  try {
    const response: AxiosResponse = await axios.post(`/comments/send`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    // Handle the error
    throw error;
  }
}

export interface CreateCommentBody {
  body: CreateCommentRequest;
  token: string;
}

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (body: CreateCommentBody) => createComment(body.body, body.token),
    {
      onSuccess: () => queryClient.invalidateQueries(getCommentsQueryKey()),
    }
  );
};
