import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  },
  {
    condition: (_, { getState }) => {
      const { users } = getState();
      return users.items.length === 0; // Only fetch if items are empty
    },
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: { items: [], loading: false, error: null },
  reducers: {
    addUser: (state, action) => {
      state.items.unshift({ id: Date.now(), ...action.payload });
    },
    deleteUser: (state, action) => {
      state.items = state.items.filter((u) => u.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        if (!action.meta.aborted) {
          state.error = action.error.message;
        }
      });
  },
});

export const { addUser, deleteUser } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
