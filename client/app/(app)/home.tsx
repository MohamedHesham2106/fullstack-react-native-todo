import { useAuth } from "@/providers/auth-provider";

import React, { useState } from "react";
import {
  useFonts,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_400Regular_Italic,
} from "@expo-google-fonts/lato";
import { CustomHeader } from "@/components/CustomHeader";
import { FloatingAction } from "react-native-floating-action";
import {
  ArrowLeftOnRectangleIcon,
  PaperAirplaneIcon,
} from "react-native-heroicons/outline";
import { View } from "react-native";
import { CreateTodoModal } from "@/components/CreateTodoModal";
import { getTodos } from "../../utils/todo";
import { useQuery } from "@tanstack/react-query";
import { TodoList } from "@/components/Todo/TodoList";
import { ActivityIndicator, PaperProvider } from "react-native-paper";
const actions = [
  {
    text: "Sign Out",
    icon: <ArrowLeftOnRectangleIcon color="white" />,
    name: "logout",
    color: "#e11d48",
    position: 1,
  },
  {
    text: "Create Todo",
    icon: <PaperAirplaneIcon color="white" />,
    name: "Add",
    color: "#059669",
    position: 2,
  },
];
const Home = () => {
  const { userId, Logout } = useAuth();
  const [visible, setVisible] = useState(false);
  const todoQuery = useQuery({
    queryKey: ["todos"],
    queryFn: () => getTodos(userId!),
  });

  let [fontsLoaded] = useFonts({
    Lato_400Regular_Italic,
    Lato_700Bold,
    Lato_700Bold_Italic,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View className="bg-zinc-900 flex-1 relative">
      <PaperProvider>
        <CustomHeader userId={userId!} />
        <CreateTodoModal
          visible={visible}
          hideModal={() => setVisible(false)}
          userId={userId!}
        />
        {todoQuery.isLoading ? (
          <View className="flex-1 items-center justify-center h-full">
            <ActivityIndicator size="large" color="#10b981" />
          </View>
        ) : (
          <TodoList todos={todoQuery.data ?? []} />
        )}

        <FloatingAction
          color="#059669"
          overlayColor="#00000000"
          actions={actions}
          onPressItem={(name) => {
            if (name === "logout") {
              Logout();
            } else {
              setVisible(true);
            }
          }}
        />
      </PaperProvider>
    </View>
  );
};

export default Home;
