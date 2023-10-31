import { Text, TextInput, View } from "react-native";
import { Todo as TodoType } from "utils/todo";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TouchableOpacity } from "react-native";
import { CheckCircleIcon, XCircleIcon } from "react-native-heroicons/solid";

import { useMutateTodo } from "@/hooks/useMutateTodo";

// Define the shape of props expected by the EditTodoItem component
interface IEditTodoItemProps {
  todo: TodoType;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}
// Define a validation schema for the Todo data
const schema = z.object({
  content: z.string().min(1, {
    message: "Field is Required.",
  }),
});
// Define the type for the inferred data from the validation schema
type TodoData = z.infer<typeof schema>;

export const EditTodoItem = ({ todo, setEdit }: IEditTodoItemProps) => {
  // Create a form instance with validation and default values
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: todo,
  });
  // Get updateMutation and isLoading status from useMutateTodo hook
  const { updateMutation, isLoading } = useMutateTodo({
    todo,
    setEdit,
  });
  // Handler for updating the Todo data
  const updateHandler = async (data: TodoData) => {
    updateMutation.mutate(data);
  };
  return (
    <View className="flex-row items-center gap-x-2">
      <Controller
        control={form.control}
        rules={{
          required: true,
        }}
        name="content"
        render={({ field }) => (
          <View className="space-y-2">
            <TextInput
              placeholder="🎉 What's on your mind today?"
              value={field.value}
              className="py-2 px-4 bg-zinc-200 text-zinc-800 rounded-md focus:bg-zinc-300 focus:border focus:border-emerald-400"
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
        disabled={isLoading}
        onPress={form.handleSubmit(updateHandler)}
        className="bg-emerald-500 p-2 rounded-lg"
      >
        <CheckCircleIcon size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        disabled={isLoading}
        onPress={() => setEdit(false)}
        className="bg-rose-500  p-2 rounded-lg"
      >
        <XCircleIcon size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};
