import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Toast } from "react-native-toast-notifications";
import { router } from "expo-router";

import axiosInstance from "../../utils/axios";

// Define the shape of the AuthContextProps
interface AuthContextProps {
  state: { token: string | null; authenticated: boolean };
  userId: string | null;
  isLoading: boolean;
  Login: (data: ILogin) => Promise<void>;
  Register: (data: IRegister) => Promise<void>;
  Logout: () => Promise<void>;
}

// Define the shape of AuthProviderProps
interface AuthProviderProps {
  children: React.ReactNode;
}

interface IRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface ILogin {
  email: string;
  password: string;
}
// Create an AuthContext with initial values
const AuthContext = createContext<AuthContextProps>({
  Login: async () => {},
  Register: async () => {},
  Logout: async () => {},
  userId: null,
  state: {
    token: null,
    authenticated: false,
  },
  isLoading: false,
});
// Custom hook to access the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // State to manage user authentication and loading status
  const [state, setState] = useState<{
    token: string | null;
    authenticated: boolean;
  }>({
    token: null,
    authenticated: false,
  });
  // State to store the user's ID
  const [userId, setUserId] = useState<string | null>(null);
  // State to manage loading status
  const [isLoading, setIsLoading] = useState(false);

  // Effect to check if a user ID exists in SecureStore
  useEffect(() => {
    const userIdExist = async () => {
      const userId = await SecureStore.getItemAsync("userId");

      if (userId) {
        setUserId(userId);
      }
    };
    userIdExist();
  }, []);

  // Effect to check if a user token exists in SecureStore
  useEffect(() => {
    const tokenExist = async () => {
      const token = await SecureStore.getItemAsync("token");

      if (token) {
        setState({
          token,
          authenticated: true,
        });
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
      }
    };
    tokenExist();
  }, []);
  // Function to register a new user
  const register = async (data: IRegister): Promise<void> => {
    try {
      setIsLoading(true);
      // Check if the passwords match
      const { password, confirmPassword, name, email } = data;
      if (password !== confirmPassword) {
        Toast.show("Passwords do not match", {
          type: "danger",
        });
        return;
      }
      // Send a registration request to the server
      const response = await axiosInstance.post("/signup", {
        name,
        email,
        password,
      });
      if (response.data) {
        Toast.show("Account created successfully", {
          type: "success",
        });
        // Navigate to the login page
        router.push("/login");
      }
    } catch (error: any) {
      console.log(error);
      Toast.show(error.response.data.message, {
        type: "danger",
        textStyle: {
          textAlign: "center",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to log in a user
  const login = async (data: ILogin): Promise<void> => {
    try {
      setIsLoading(true);
      const { email, password } = data;
      // Send a login request to the server
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });
      if (response.data) {
        setState({
          token: response.data.data.token,
          authenticated: true,
        });
        setUserId(response.data.data.user.id);
        // Store the user's ID and token in SecureStore
        await SecureStore.setItemAsync("userId", response.data.data.user.id);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.data.token}`;
        await SecureStore.setItemAsync("token", response.data.data.token);
        Toast.show("Login Successful, Welcome", {
          type: "success",
        });
        router.replace("/home");
      }
    } catch (error: any) {
      Toast.show(error.response.data.message, {
        type: "danger",
        textStyle: {
          textAlign: "center",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };
  // Function to log out a user
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);

      // Send a logout request to the server
      await axiosInstance.post("/logout");
      // Clear the user's token and authentication status
      await SecureStore.deleteItemAsync("token");
      setState({
        token: null,
        authenticated: false,
      });
      Toast.show("Logout Successful, Bye bye!", {
        type: "success",
      });
      router.replace("/");
    } catch (error: any) {
      Toast.show(error.response.data.message, {
        type: "danger",
        textStyle: {
          textAlign: "center",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };
  // Value object containing functions and state to be provided to the context
  const value = {
    Register: register,
    Login: login,
    Logout: logout,
    state,
    isLoading,
    userId,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
