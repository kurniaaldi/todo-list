"use client";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "@/redux/store";
import toast from "react-hot-toast";

const TodoForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.todo.loading);
  const categories = useSelector((state: RootState) => state.todo.categories);

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
        className="w-full px-3 py-2 border border-gray-600 rounded text-gray-600"
        placeholder="Title"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-3 py-2 border border-gray-600 rounded text-gray-600"
        placeholder="Description"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full px-3 py-2 border border-gray-600 rounded text-gray-600"
      >
        <option value="">-- Select Category --</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 text-white rounded cursor-pointer w-full ${
          loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading ? "Adding..." : "Add Todo"}
      </button>
    </form>
  );
};

export default TodoForm;
