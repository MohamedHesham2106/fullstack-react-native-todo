import { useQuery } from "@tanstack/react-query";
import React from "react";
import { StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUser } from "../../utils/user";
interface ICustomHeaderProps {
  userId: string;
}
export const CustomHeader = ({ userId }: ICustomHeaderProps) => {
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(userId!),
  });

  return (
    <SafeAreaView className="flex">
      <StatusBar backgroundColor="#059669" />
      <View className="space-y-6 bg-emerald-600 px-3 py-8  rounded-b-2xl shadow-lg shadow-zinc-800">
        <View className="space-y-2">
          <Text
            className="text-4xl text-white tracking-wider"
            style={{ fontFamily: "Lato_700Bold" }}
          >
            To-Do Time 🚀
          </Text>
          <Text
            className="text-sm tracking-widest text-white"
            style={{ fontFamily: "Lato_400Regular_Italic" }}
          >
            A simple Todo List
          </Text>
        </View>

        {!userQuery.isLoading && (
          <Text
            className=" text-white text-lg tracking-widest"
            style={{ fontFamily: "Lato_700Bold_Italic" }}
          >
            Welcome {userQuery.data?.name}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};
