import { configureStore } from "@reduxjs/toolkit";
import myTodo from "./todoSlice";

const store = configureStore({
  reducer: {
    todos: myTodo,
  },
});

export default store;
