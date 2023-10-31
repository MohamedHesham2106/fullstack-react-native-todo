import { AuthProvider } from "@/providers/auth-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";

export default function RootLayout() {
  const queryClient = new QueryClient();
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider
          placement="top"
          duration={5000}
          animationType="zoom-in"
          animationDuration={250}
          successColor="#047857"
          dangerColor="red"
          warningColor="orange"
          offset={50}
          swipeEnabled={true}
        >
          <Slot />
        </ToastProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
