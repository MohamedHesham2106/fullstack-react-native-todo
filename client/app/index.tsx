import { useAuth } from "@/providers/auth-provider";
import { Link, useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
const Index = () => {
  const { state } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (state.authenticated === true) {
      router.replace("/home");
    }
  }, [state.authenticated]);
  return (
    <SafeAreaView className="flex-1 bg-zinc-900">
      <View className="flex-1 flex justify-around my-4">
        <Text className="text-white font-bold text-4xl text-center">
          To-Do Time
        </Text>
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/sapiens.png")}
            style={{
              width: 350,
              height: 350,
            }}
          />
        </View>
        <View className="space-y-4">
          <Link href="/signup" asChild>
            <TouchableOpacity className="py-4 bg-emerald-500 mx-7 rounded-xl">
              <Text className="text-xl font-bold text-center text-gray-50">
                Sign Up
              </Text>
            </TouchableOpacity>
          </Link>
          <View className="flex-row justify-center gap-x-1">
            <Text className="text-white font-semibold">
              Already have an account?
            </Text>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text className="font-semibold text-emerald-400">Log In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
