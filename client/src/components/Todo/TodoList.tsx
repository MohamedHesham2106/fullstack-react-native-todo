import React from "react";
import { ScrollView } from "react-native";
import { Todo } from "utils/todo";
import { TodoItem } from "./TodoItem";
interface ITodoListProps {
  todos: Todo[];
}
export const TodoList = ({ todos }: ITodoListProps) => {
  return (
    <ScrollView className="px-5 pt-2 mb-2">
      {todos?.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
    </ScrollView>
  );
};
