import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoItem, TodoState, TodoFilter } from "./types";

const initialState: TodoState = {
  todos: [],
  loading: false,
  categories: ["Personal", "Work", "Other"],
  filter: {
    status: "all",
    category: "all",
    keyword: "",
  },
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoItem>) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<TodoItem>) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id,
      );
      if (index !== -1) state.todos[index] = action.payload;
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    setFilter: (state, action: PayloadAction<Partial<TodoFilter>>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setTodosFromApi: (state, action: PayloadAction<TodoItem[]>) => {
      state.todos = action.payload;
    },
    fetchTodos: () => {},
  },
});

export const {
  addTodo,
  deleteTodo,
  editTodo,
  toggleTodo,
  setFilter,
  setLoading,
  setTodosFromApi,
  fetchTodos,
} = todoSlice.actions;

export default todoSlice.reducer;
