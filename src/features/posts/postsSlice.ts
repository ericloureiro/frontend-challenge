import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchPostDetails, fetchPostList } from "@/services/api";
import { Post } from "@/types";
import {
  POST_DETAILS_ASYNC_THUNK_NAME,
  POST_LIST_ASYNC_THUNK_NAME,
  POSTS_SLICE_INITIAL_STATE,
  POSTS_SLICE_NAME,
  REQUEST_ERROR_MESSAGE,
} from "./constants";

export const loadPostById = createAsyncThunk(
  POST_DETAILS_ASYNC_THUNK_NAME,
  async (id: string) => {
    return await fetchPostDetails(id);
  },
);

export const loadPostsByPage = createAsyncThunk(
  POST_LIST_ASYNC_THUNK_NAME,
  async (page: number) => {
    return await fetchPostList(page);
  },
);

const postsSlice = createSlice({
  name: POSTS_SLICE_NAME,
  initialState: POSTS_SLICE_INITIAL_STATE,
  reducers: {
    setScrollPosition: (state, action: PayloadAction<number>) => {
      state.feed.scrollPosition = action.payload;
    },
    clearScrollPosition: (state) => {
      state.feed.scrollPosition = 0;
    },
    addNewPost: (state, action: PayloadAction<Post>) => {
      const post = action.payload;

      state.allPosts.unshift(post);

      state.newPostIds.push(post.id);
    },
    removeNewPost: (state, action: PayloadAction<string>) => {
      state.newPostIds = state.newPostIds.filter((id) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPostById.rejected, (state) => {
        state.details.error = REQUEST_ERROR_MESSAGE;
        state.details.loading = false;
      })
      .addCase(loadPostById.pending, (state) => {
        state.details.loading = true;
      })
      .addCase(loadPostById.fulfilled, (state, action: PayloadAction<Post>) => {
        const post = action.payload;

        state.postById[post.id] = post;

        state.details.loading = false;
        state.details.error = null;
      })
      .addCase(loadPostsByPage.rejected, (state) => {
        state.feed.error = REQUEST_ERROR_MESSAGE;
        state.feed.loading.initial = false;
        state.feed.loading.more = false;
      })
      .addCase(loadPostsByPage.pending, (state) => {
        if (state.allPosts.length === 0) {
          state.feed.loading.initial = true;

          return;
        }

        state.feed.loading.more = true;
      })
      .addCase(
        loadPostsByPage.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          const existingIds = new Set(state.allPosts.map((p) => p.id));

          const newPosts = action.payload.filter(
            (post) => !existingIds.has(post.id),
          );

          state.allPosts.push(...newPosts);

          state.feed.loading.initial = false;
          state.feed.loading.more = false;
          state.feed.error = null;
          state.feed.page += 1;
        },
      );
  },
});

export const {
  addNewPost,
  clearScrollPosition,
  removeNewPost,
  setScrollPosition,
} = postsSlice.actions;

export default postsSlice.reducer;
