import axiosInstance from "./axios";

// Define the shape of a Todo object
export interface Todo {
  id: string;
  content: string;
  checked: boolean;
}
// Function for fetching Todos associated with a user
export const getTodos = async (userId: string) => {
  // Send an HTTP GET request to fetch Todos based on the provided user ID
  const response = await axiosInstance.get("/todo", {
    params: {
      userId, // Include the user ID as a request parameter
    },
  });

  // Extract the data from the response
  const result = response.data.data;

  // Return the fetched Todos as the result
  return result;
};
