"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchTodos, setFilter } from "@/features/todo/todoSlice";

const TodoFilter = () => {
  const dispatch = useDispatch();
  const { filter, categories } = useSelector((state: RootState) => state.todo);
  const loading = useSelector((state: RootState) => state.todo.loading);
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    dispatch(setFilter({ [e.target.name]: e.target.value }));
  };

  return (
    <div className="grid sm:grid-cols-3 gap-4 mb-6">
      <select
        name="status"
        value={filter.status}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      >
        <option value="all">All Status</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>

      <select
        name="category"
        value={filter.category}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="keyword"
        value={filter.keyword}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
        placeholder="Search todo..."
      />
      <button
        onClick={() => dispatch(fetchTodos())}
        disabled={loading}
        className="col-span-3 px-4 py-2 text-white rounded bg-indigo-600 hover:bg-indigo-700"
      >
        {loading ? "Loading..." : "Load Sample Todos"}
      </button>
    </div>
  );
};

export default TodoFilter;
