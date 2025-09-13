import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk with caching (condition prevents refetch)
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return response.data;
  },
  {
    condition: (_, { getState }) => {
      const { posts } = getState();
      if (posts.items.length > 0) {
        return false; // cancel silently
      }
    },
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addPost: (state, action) => {
      const newPost = { id: Date.now(), ...action.payload };
      state.items.unshift(newPost);
    },
    deletePost: (state, action) => {
      state.items = state.items.filter((post) => post.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        if (!action.meta.aborted) {
          state.error = action.error.message;
        }
      });
  },
});

export const { addPost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
