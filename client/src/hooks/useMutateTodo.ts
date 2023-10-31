import { Todo } from "utils/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";

// Define an interface for the useMutateTodo hook parameters
interface IUseMutateTodo {
  todo?: Todo;
  userId?: string;
  formReset?: () => void;
  hideModal?: () => void;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}
export const useMutateTodo = ({
  todo,
  formReset,
  hideModal,
  setEdit,
  userId,
}: IUseMutateTodo) => {
  // Initialize loading state
  const [isLoading, setIsLoading] = useState(false);

  // Get access to the query client for caching and invalidating queries
  const queryClient = useQueryClient();

  // Access the toast notification function for displaying messages
  const toast = useToast();

  // Mutation for adding a new Todo
  const addMutation = useMutation({
    mutationFn: async (data: { content: string }) => {
      try {
        // Attempt to create a new Todo item via an HTTP POST request
        await axiosInstance.post("/todo", {
          ...data,
          userId,
        });
        // Display a success message using toast
        toast.show("Todo Created Successfully", {
          type: "success",
        });
        // If both formReset and hideModal functions are provided, call them
        if (formReset) formReset();
        if (hideModal) hideModal();
      } catch (error: any) {
        toast.show(error.response.data.message, {
          type: "danger",
        });
      }
    },
    onSuccess: () => {
      // After a successful addition, invalidate the "todos" query to refresh the data
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Mutation for updating an existing Todo
  const updateMutation = useMutation({
    mutationFn: async (data: Partial<Todo>) => {
      try {
        // Set loading state to true while the update is in progress
        setIsLoading(true);

        // Attempt to update the Todo item's "checked" property via an HTTP PATCH request
        await axiosInstance.patch(`/todo/${todo?.id}`, data);
        toast.show("Todo Updated", {
          type: "success",
        });
      } catch (error: any) {
        toast.show(error.response.data.message, {
          type: "danger",
        });
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      // Set Edit state to false to close edit field
      if (setEdit) setEdit(false);
      // After a successful update, invalidate the "todos" query to refresh the data
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Mutation for deleting an existing Todo
  const deleteMutation = useMutation({
    mutationFn: async () => {
      try {
        setIsLoading(true);

        // Attempt to delete the specified Todo item via an HTTP DELETE request
        await axiosInstance.delete(`/todo/${todo?.id}`);
        toast.show("Todo Deleted", {
          type: "success",
        });
      } catch (error: any) {
        toast.show(error.response.data.message, {
          type: "danger",
        });
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  // Return the mutations, loading state, and addMutation function
  return { updateMutation, deleteMutation, isLoading, addMutation };
};
