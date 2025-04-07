/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest, takeEvery, delay } from "redux-saga/effects";
import axios from "axios";
import { setLoading, setTodosFromApi, addTodo } from "./todoSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { TodoItem } from "./types";
import toast from "react-hot-toast";

function fetchMockTodos(): Promise<TodoItem[]> {
  return axios
    .get("https://jsonplaceholder.typicode.com/todos?_limit=5")
    .then((res) =>
      res.data.map((todo: any) => ({
        id: todo.id,
        title: todo.title,
        category: "Work",
        completed: todo.completed,
      })),
    );
}

function* handleFetchTodos() {
  try {
    yield put(setLoading(true));
    const todos: TodoItem[] = yield call(fetchMockTodos);
    yield put(setTodosFromApi(todos));
    toast.success("Todos berhasil dimuat");
  } catch (error) {
    console.error("Error fetching todos:", error);
    toast.error("Gagal memuat todos");
  } finally {
    yield put(setLoading(false));
  }
}

function* handleAddTodo(
  action: PayloadAction<Omit<TodoItem, "id" | "completed">>,
) {
  try {
    yield put(setLoading(true));
    yield delay(1000);

    const newTodo: TodoItem = {
      id: Number(new Date()),
      completed: false,
      ...action.payload,
    };

    yield put(addTodo(newTodo));
  } finally {
    yield put(setLoading(false));
  }
}

export default function* todoSaga() {
  yield takeLatest("todo/fetchTodos", handleFetchTodos);
  yield takeEvery("todo/addTodoAsync", handleAddTodo);
}
