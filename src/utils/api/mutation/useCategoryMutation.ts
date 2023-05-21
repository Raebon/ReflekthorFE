import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "@/types/reflektor-api-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { getCategoriesQueryKey } from "../query/getCategoriesQueryKey";

//Create category
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

//Delete category
async function deleteCategory(
  id: number,
  token: string
): Promise<AxiosResponse> {
  try {
    const response: AxiosResponse = await axios.delete(
      `/blogs/categories/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    // Handle the error
    throw error;
  }
}

export interface DeleteCategoryBody {
  id: number;
  token: string;
}

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (body: DeleteCategoryBody) => deleteCategory(body.id, body.token),
    {
      onSuccess: () => queryClient.invalidateQueries(getCategoriesQueryKey()),
    }
  );
};

//Edit category
async function editCategory(body: UpdateCategoryRequest, token: string) {
  try {
    const response: AxiosResponse = await axios.put(
      `/blogs/categories/${body.categoryId}`,
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

export interface EditCategoryBody {
  body: UpdateCategoryRequest;
  token: string;
}

export const useEditCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (body: EditCategoryBody) => editCategory(body.body, body.token),
    {
      onSuccess: () => queryClient.invalidateQueries(getCategoriesQueryKey()),
    }
  );
};
