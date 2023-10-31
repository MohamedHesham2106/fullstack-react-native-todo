// Import the necessary modules
import axios, { AxiosInstance } from "axios";

// Create an Axios instance with a specific base URL
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://192.168.1.5:3000",
});

// Export the configured Axios instance for use in other parts of the application
export default axiosInstance;
