import { useAuth } from "@/providers/auth-provider";

import { Link, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define a validation schema for user login
const schema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(7, {
    message: "Please enter a valid password.",
  }),
});
// Define the type for the inferred data from the validation schema
type UserData = z.infer<typeof schema>;

const Login = () => {
  // Get the Login function, authentication state, and loading status from useAuth hook
  const { Login, state, isLoading } = useAuth();
  // Get the router instance for navigation
  const router = useRouter();
  // Create a form instance with validation and default values
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Use an effect to reset the form if the user is already authenticated
  useEffect(() => {
    if (state && state.authenticated) {
      form.reset();
    }
  }, [state]);

  // Handler for submitting user login data
  const onSubmit = async (data: UserData) => {
    // Call the Login function to attempt user login
    await Login(data);
  };
  return (
    <View className="flex-1 bg-zinc-900 flex gap-4">
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => router.replace("/")}
            className="bg-emerald-400 p-2 rounded-full ml-4 mt-6"
          >
            <ArrowLeftIcon size="20" color="white" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require("../../../assets/images/login.png")}
            style={{ width: 250, height: 250 }}
          />
        </View>
      </SafeAreaView>
      <View className="flex-1 bg-white rounded-t-[50px] px-8 pt-8 border-2 border-emerald-500 border-b-0">
        <View>
          <View className="space-y-1 mb-6">
            <Text className="text-zinc-700 font-bold text-xl">Log In</Text>
            <Text className="text-zinc-500 font-semibold text-sm">
              Log in to your account to continue
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="space-y-6"
          >
            <View className="flex flex-col space-y-3">
              <Controller
                control={form.control}
                rules={{
                  required: true,
                }}
                name="email"
                render={({ field }) => (
                  <View className="space-y-2 my-2">
                    <TextInput
                      placeholder="Enter Your Email Address"
                      value={field.value}
                      className="p-5 bg-zinc-200 text-zinc-800 rounded-md focus:border focus:border-emerald-500"
                      onChangeText={field.onChange}
                      onBlur={field.onBlur}
                    />
                    {form.formState.errors.email && (
                      <Text className="text-red-500 text-xs italic">
                        {form.formState.errors.email?.message}
                      </Text>
                    )}
                  </View>
                )}
              />
              <Controller
                control={form.control}
                rules={{
                  required: true,
                }}
                name="password"
                render={({ field }) => (
                  <View className="space-y-2 my-2">
                    <TextInput
                      placeholder="Enter Your Password"
                      secureTextEntry
                      value={field.value}
                      className="p-5 bg-zinc-200 text-zinc-800 rounded-md focus:border focus:border-emerald-500"
                      onChangeText={field.onChange}
                      onBlur={field.onBlur}
                    />
                    {form.formState.errors.password && (
                      <Text className="text-red-500 text-xs italic">
                        {form.formState.errors.password?.message}
                      </Text>
                    )}
                  </View>
                )}
              />
            </View>

            <TouchableOpacity
              onPress={form.handleSubmit(onSubmit)}
              className="py-3 bg-emerald-400 rounded-xl"
            >
              <Text className="text-xl font-bold text-center text-gray-50">
                {isLoading ? (
                  <View className="flex items-center justify-center">
                    <ActivityIndicator color="white" size="small" />
                  </View>
                ) : (
                  "Login"
                )}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">
            Don't have an account?
          </Text>
          <Link href="/signup" asChild>
            <TouchableOpacity>
              <Text className="font-semibold text-emerald-500"> Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
};
export default Login;
