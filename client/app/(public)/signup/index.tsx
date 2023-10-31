import { useAuth } from "@/providers/auth-provider";

import {
  ActivityIndicator,
  Image,
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
import { ScrollView } from "react-native-gesture-handler";
import { Link, useRouter } from "expo-router";

// Define a complex validation schema for user registration
const schema = z
  .object({
    name: z.string().min(2, {
      message: "Name is Required.",
    }),
    email: z.string().email({
      message: "Please enter a valid email.",
    }),
    password: z
      .string()
      .min(7, {
        message: "Password must be at least 7 characters long.",
      })
      .max(100, {
        message: "Password must be less than 100 characters long.",
      }),
    confirmPassword: z
      .string()
      .min(7, {
        message: "Password must be at least 7 characters long.",
      })
      .max(100, {
        message: "Password must be less than 100 characters long.",
      }),
  })
  // Add a refinement to ensure password and confirmPassword match
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
// Define the type for the inferred data from the validation schema
type UserData = z.infer<typeof schema>;

const Register = () => {
  const router = useRouter();

  // Get the Register function and loading status from useAuth hook
  const { Register, isLoading } = useAuth();

  // Create a form instance with validation and default values
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  // Check if the form is currently submitting
  const formSubmitting = form.formState.isSubmitting;

  // Handler for submitting user registration data
  const onSubmit = async (data: UserData) => {
    await Register(data);
  };
  return (
    <View className="flex-1 bg-zinc-900 flex gap-3">
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
            source={require("../../../assets/images/sapiens.png")}
            style={{ width: 100, height: 100 }}
          />
        </View>
      </SafeAreaView>
      <View className="flex-1 bg-white rounded-t-[50px] px-8 pt-8 border-2 border-emerald-500 border-b-0">
        <View className="space-y-1 mb-6">
          <Text className="text-zinc-700 font-bold text-xl">
            Join To-Do Time Now!
          </Text>
          <Text className="text-zinc-500 font-semibold text-sm">
            Create an account to continue
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="space-y-6">
            <View className="flex flex-col">
              <Controller
                control={form.control}
                rules={{
                  required: true,
                }}
                name="name"
                render={({ field }) => (
                  <View className="space-y-2 my-2">
                    <TextInput
                      placeholder="Enter Your Name"
                      value={field.value}
                      className="p-5 bg-zinc-200 text-zinc-800 rounded-md focus:border focus:border-emerald-500"
                      onChangeText={field.onChange}
                      onBlur={field.onBlur}
                    />
                    {form.formState.errors.name && (
                      <Text className="text-red-500 text-xs italic">
                        {form.formState.errors.name?.message}
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
                name="email"
                render={({ field }) => (
                  <View className="space-y-2 my-2">
                    <TextInput
                      placeholder="Enter Your Email"
                      className="p-5 bg-zinc-200 text-zinc-800 rounded-md focus:border focus:border-emerald-500"
                      onChangeText={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
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
                      secureTextEntry
                      placeholder="Enter Your Password"
                      className="p-5 bg-zinc-200 text-zinc-800 rounded-md focus:border focus:border-emerald-500"
                      onChangeText={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                    />
                    {form.formState.errors.password && (
                      <Text className="text-red-500 text-xs italic">
                        {form.formState.errors.password?.message}
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
                name="confirmPassword"
                render={({ field }) => (
                  <View className="space-y-2 my-2">
                    <TextInput
                      secureTextEntry
                      placeholder="Repeat Password"
                      className="p-5 bg-zinc-200 text-zinc-800 rounded-md focus:border focus:border-emerald-500"
                      onChangeText={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                    />
                    {form.formState.errors.confirmPassword && (
                      <Text className="text-red-500 text-xs italic">
                        {form.formState.errors.confirmPassword?.message}
                      </Text>
                    )}
                  </View>
                )}
              />
            </View>
            <TouchableOpacity
              disabled={formSubmitting || isLoading}
              onPress={form.handleSubmit(onSubmit)}
              className="py-3 bg-emerald-400 rounded-md flex items-center justify-center"
            >
              <Text className="text-xl font-bold text-center text-gray-50 ">
                {isLoading ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  "Join To-Do Time"
                )}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center my-7">
            <Text className="text-gray-500 font-semibold">
              already have an account?
            </Text>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text className="font-semibold text-emerald-500"> Log In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export default Register;
