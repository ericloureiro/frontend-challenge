import { INITIAL_PAGE } from "@/app/constants";
import { PostsSliceState } from "./types";

export const REQUEST_ERROR_MESSAGE = "Something went wrong";

export const POST_DETAILS_ASYNC_THUNK_NAME = "posts/loadPost";

export const POST_LIST_ASYNC_THUNK_NAME = "posts/loadPosts";

export const POSTS_SLICE_NAME = "posts";

export const POSTS_SLICE_INITIAL_STATE: PostsSliceState = {
  newPostIds: [],
  postById: {},
  allPosts: [],
  details: {
    error: null,
    loading: false,
  },
  feed: {
    error: null,
    hasMore: true,
    loading: {
      initial: false,
      more: false,
    },
    scrollPosition: 0,
    page: INITIAL_PAGE,
  },
};
