import { useAuth } from "@/providers/auth-provider";
import { Redirect, Stack } from "expo-router";

export default function AppLayout() {
  const { state } = useAuth();
  if (!state.authenticated) return <Redirect href="/" />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
