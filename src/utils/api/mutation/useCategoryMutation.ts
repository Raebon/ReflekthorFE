import { CreateCategoryRequest } from "@/types/reflektor-api-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { getCategoriesQueryKey } from "../query/getCategoriesQueryKey";

async function createCategory(body: CreateCategoryRequest, token: string) {
  try {
    const response: AxiosResponse = await axios.post(
      `/blogs/categories`,
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

export interface CreateCategoryBody {
  body: CreateCategoryRequest;
  token: string;
}

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (body: CreateCategoryBody) => createCategory(body.body, body.token),
    {
      onSuccess: () => queryClient.invalidateQueries(getCategoriesQueryKey()),
    }
  );
};
