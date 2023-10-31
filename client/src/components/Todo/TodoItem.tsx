import React, { useState } from "react";
import { Text, View } from "react-native";
import { Todo } from "utils/todo";
import { cn } from "../../../utils/utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import { XMarkIcon, CheckIcon, PencilIcon } from "react-native-heroicons/solid";
import { EditTodoItem } from "./EditTodoItem";
import { useMutateTodo } from "../../hooks/useMutateTodo";

interface ITodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: ITodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const { updateMutation, deleteMutation, isLoading } = useMutateTodo({ todo });
  const deleteHandler = async () => {
    deleteMutation.mutate();
  };
  const markAsDoneHandler = async () => {
    updateMutation.mutate({ checked: true });
  };
  return (
    <View className="flex-row px-6 py-3 rounded-md bg-zinc-100 my-2 justify-between items-center">
      {isEditing && <EditTodoItem todo={todo} setEdit={setIsEditing} />}

      {!isEditing && (
        <>
          <Text
            className={cn(
              todo.checked && "line-through text-emerald-700 opacity-75 italic",
              "text-sm font-bold"
            )}
          >
            {todo.content}
          </Text>
          <View className="flex-row gap-x-2 items-center">
            <TouchableOpacity
              onPress={deleteHandler}
              disabled={isLoading}
              className="p-2 rounded-md bg-zinc-900 shadow-xl"
            >
              <XMarkIcon color="white" size={18} />
            </TouchableOpacity>
            {!todo.checked && (
              <TouchableOpacity
                disabled={isLoading}
                onPress={markAsDoneHandler}
                className="p-2 rounded-md bg-zinc-900"
              >
                <CheckIcon color="white" size={18} />
              </TouchableOpacity>
            )}

            {!todo.checked && (
              <TouchableOpacity
                disabled={isLoading}
                onPress={() => setIsEditing(true)}
                className="p-2 rounded-md bg-zinc-900"
              >
                <PencilIcon color="white" size={18} />
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
};
