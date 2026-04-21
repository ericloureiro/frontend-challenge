import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchPosts } from "../../services/api";
import {
  POSTS_ASYNC_THUNK_NAME,
  POSTS_SLICE_INITIA_STATE,
  POSTS_SLICE_NAME,
  REQUEST_ERROR_MESSAGE,
} from "./constants";
import { Post } from "../../types";

export const loadPosts = createAsyncThunk(
  POSTS_ASYNC_THUNK_NAME,
  async function (page: number) {
    return await fetchPosts(page);
  },
);

const postsSlice = createSlice({
  name: POSTS_SLICE_NAME,
  initialState: POSTS_SLICE_INITIA_STATE,
  reducers: {
    prependPost: function (state, action: PayloadAction<Post>) {
      state.items.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.rejected, function (state) {
        state.loading = false;
        state.error = REQUEST_ERROR_MESSAGE;
      })
      .addCase(loadPosts.pending, function (state) {
        state.loading = true;
      })
      .addCase(
        loadPosts.fulfilled,
        function (state, action: PayloadAction<Post[]>) {
          state.loading = false;
          state.error = "";
          state.items.push(...action.payload);
          state.page += 1;
        },
      );
  },
});

export const { prependPost } = postsSlice.actions;

export default postsSlice.reducer;
