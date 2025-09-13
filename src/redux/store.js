import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";
import { commentsReducer } from "./commentsSlice";
import { usersReducer } from "./usersSlice";
import { todosReducer } from "./todosSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    users: usersReducer,
    todos: todosReducer,
  },
});
