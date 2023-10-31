import axiosInstance from "./axios";

export interface User {
  id: string;
  name: string;
}
// Function for fetching a user's information by their ID
export const getUser = async (userId: string) => {
  // Send an HTTP GET request to retrieve user information based on the provided user ID
  const response = await axiosInstance.get(`/user/${userId}`);

  // Extract the user data from the response
  const result = response.data.data;

  // Return the fetched user's information as the result
  return result;
};
