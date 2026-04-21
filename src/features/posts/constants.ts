import { PostsSliceState } from "./types";

export const REQUEST_ERROR_MESSAGE = "Something went wrong";

export const POSTS_ASYNC_THUNK_NAME = "posts/loadPosts";

export const POSTS_SLICE_NAME = "posts";

export const POSTS_SLICE_INITIA_STATE: PostsSliceState = {
  items: [],
  page: 1,
  hasMore: true,
  loading: false,
  error: "",
};
