import { CreatePostRequest } from "@/types/reflektor-api-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { getBlogsQueryKey } from "../query/getBlogQueryKey";

async function createPost(body: CreatePostRequest, token: string) {
  try {
    const response: AxiosResponse = await axios.post(`/blogs`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    // Handle the error
    throw error;
  }
}

interface CreatePostBody {
  body: CreatePostRequest;
  token: string;
}

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (body: CreatePostBody) => createPost(body.body, body.token),
    {
      onSuccess: () => queryClient.invalidateQueries(getBlogsQueryKey()),
    }
  );
};

//Delete post
async function deletePost(id: number, token: string): Promise<AxiosResponse> {
  try {
    const response: AxiosResponse = await axios.delete(`/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    // Handle the error
    throw error;
  }
}

export interface DeletePostBody {
  id: number;
  token: string;
}

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (body: DeletePostBody) => deletePost(body.id, body.token),
    {
      onSuccess: () => queryClient.invalidateQueries(getBlogsQueryKey()),
    }
  );
};
