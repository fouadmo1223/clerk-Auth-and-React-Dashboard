import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch todos
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { getState, rejectWithValue }) => {
    const { todos } = getState();
    if (todos.items.length > 0) return rejectWithValue("Todos already loaded");
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    return response.data;
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: { items: [], loading: false, error: null },
  reducers: {
    addTodo: (state, action) => {
      state.items.unshift({
        id: Date.now(),
        completed: false,
        ...action.payload,
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        if (action.payload !== "Todos already loaded") {
          state.error = action.error.message;
        }
      });
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
