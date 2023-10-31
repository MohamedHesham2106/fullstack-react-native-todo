import React from "react";
import { Modal, Portal, Text } from "react-native-paper";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useMutateTodo } from "../hooks/useMutateTodo";

// Define a validation schema for creating a new Todo
const schema = z.object({
  content: z.string().min(1, {
    message: "Field is Required.",
  }),
});

// Define the type for the inferred data from the validation schema
type TodoData = z.infer<typeof schema>;

// Define the shape of props expected by the CreateTodoModal component
interface ICreateTodoModalProps {
  visible: boolean;
  userId: string;
  hideModal: () => void;
}

export const CreateTodoModal = ({
  visible,
  hideModal,
  userId,
}: ICreateTodoModalProps) => {
  // Create a form instance with validation and default values
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      content: "",
    },
  });

  // Get addMutation from useMutateTodo hook with provided parameters
  const { addMutation } = useMutateTodo({
    userId,
    hideModal,
    formReset: form.reset,
  });

  // Handler for submitting a new Todo
  const onSubmit = async (data: TodoData) => {
    addMutation.mutate(data);
  };
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{
          backgroundColor: "white",
          padding: 20,
          width: "90%",
          borderRadius: 10,

          zIndex: 1000,
          alignSelf: "center",
        }}
      >
        <View className="py-2 space-y-4">
          <Text className="text-center my-2 text-lg font-bold">Add a Todo</Text>
          <Controller
            control={form.control}
            rules={{
              required: true,
            }}
            name="content"
            render={({ field }) => (
              <View className="space-y-2 w-full">
                <TextInput
                  placeholder="🎉 What's on your mind today?"
                  value={field.value}
                  className="p-5 bg-zinc-200 text-zinc-800 rounded-md focus:bg-zinc-300 focus:border focus:border-emerald-400"
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                />
                {form.formState.errors.content && (
                  <Text className="text-red-500 text-xs italic">
                    {form.formState.errors.content?.message}
                  </Text>
                )}
              </View>
            )}
          />
          <TouchableOpacity
            onPress={form.handleSubmit(onSubmit)}
            className="bg-emerald-500  w-full px-5 py-2 rounded-lg"
          >
            <Text className="text-center  text-lg text-white">Add</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
  );
};
