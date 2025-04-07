import todoSaga from "@/features/todo/todoSaga";
import { all } from "redux-saga/effects";

export default function* rootSaga(): Generator {
  yield all([todoSaga()]);
}
