"use client";

import { useSelector } from "react-redux";
import TodoItem from "./todoItem";
import { RootState } from "@/redux/store";

const TodoList = () => {
  const todos = useSelector((state: RootState) => {
    const { todos, filter } = state.todo;

    return todos.filter((todo) => {
      const matchStatus =
        filter.status === "all" ||
        (filter.status === "done" && todo.completed) ||
        (filter.status === "pending" && !todo.completed);

      const matchCategory =
        filter.category === "all" || todo.category === filter.category;

      const matchKeyword =
        todo.title.toLowerCase().includes(filter.keyword.toLowerCase()) ||
        todo.description?.toLowerCase().includes(filter.keyword.toLowerCase());

      return matchStatus && matchCategory && matchKeyword;
    });
  });

  if (todos.length === 0) {
    return <p className="text-center text-gray-500">No todos yet.</p>;
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
