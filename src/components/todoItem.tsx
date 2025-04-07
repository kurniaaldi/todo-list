"use client";

import { useDispatch } from "react-redux";
import { useState } from "react";
import { TodoItem as TodoType } from "@/features/todo/types";
import { deleteTodo, toggleTodo, editTodo } from "@/features/todo/todoSlice";
import toast from "react-hot-toast";

type Props = {
  todo: TodoType;
};

const TodoItem = ({ todo }: Props) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");
  const [category, setCategory] = useState(todo.category);
  console.log(todo);

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
    toast.success(todo.completed ? "Todo dibatalkan" : "Todo diselesaikan");
  };

  const handleDelete = () => {
    toast.success("Todo dihapus");
    dispatch(deleteTodo(todo.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(editTodo({ ...todo, title, description, category }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTitle(todo.title);
    setDescription(todo.description || "");
    setCategory(todo.category);
  };

  return (
    <div className="border rounded p-4 bg-white shadow space-y-2">
      {isEditing ? (
        <div className="space-y-3">
          <div className="grid gap-2 sm:grid-cols-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 rounded text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Title"
            />
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 rounded text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Category"
            />
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded text-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description"
            rows={2}
          />
          <div className="flex flex-wrap gap-2 justify-end">
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-start space-x-4">
          <div className="flex-1">
            <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
              {todo.category}
            </span>
            {todo.completed && (
              <span className="inline-block mt-2 text-xs bg-green-200 text-green-600 mx-2 px-2 py-1 rounded">
                Done
              </span>
            )}
            <h3
              className={`text-lg font-semibold text-gray-900 ${
                todo.completed ? "line-through" : ""
              }`}
            >
              {todo.title}
            </h3>
            <p className="text-sm text-gray-600">{todo.description}</p>
          </div>
          <div className="space-y-2 flex flex-col items-end">
            <button
              onClick={handleToggle}
              className={`text-sm px-3 py-1 rounded ${
                todo.completed ? "bg-yellow-400" : "bg-green-500"
              } text-white`}
            >
              {todo.completed ? "Undo" : "Done"}
            </button>
            <button
              onClick={handleEdit}
              className="text-sm px-3 py-1 rounded bg-indigo-500 text-white"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-sm px-3 py-1 rounded bg-red-500 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
