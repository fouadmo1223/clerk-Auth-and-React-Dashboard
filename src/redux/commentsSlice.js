import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (_, { getState, rejectWithValue }) => {
    const { comments } = getState();
    if (comments.items.length > 0)
      return rejectWithValue("Comments already loaded");
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    return response.data;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: { items: [], loading: false, error: null },
  reducers: {
    addComment: (state, action) => {
      state.items.unshift({ id: Date.now(), ...action.payload });
    },
    deleteComment: (state, action) => {
      state.items = state.items.filter((c) => c.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        if (action.payload !== "Comments already loaded") {
          state.error = action.error.message;
        }
      });
  },
});

export const { addComment, deleteComment } = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
