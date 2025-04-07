"use client";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "@/redux/store";
import toast from "react-hot-toast";

const TodoForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.todo.loading);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category) return;

    dispatch({
      type: "todo/addTodoAsync",
      payload: { title, description, category },
    });
    toast.success("Todo berhasil ditambahkan!");
    setTitle("");
    setDescription("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-3 py-2 border rounded"
        placeholder="Title"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-3 py-2 border rounded"
        placeholder="Description"
      />
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full px-3 py-2 border rounded"
        placeholder="Category"
      />
      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 text-white rounded ${
          loading ? "bg-gray-400" : "bg-blue-600"
        }`}
      >
        {loading ? "Adding..." : "Add Todo"}
      </button>
    </form>
  );
};

export default TodoForm;
