import { Post } from "../../types";

export type PostsSliceState = {
  newPostIds: string[];
  postById: Record<string, Post>;
  allPosts: Post[];
  feed: {
    page: number;
    hasMore: boolean;
    loading: {
      initial: boolean;
      more: boolean;
    };
    error: string | null;
    scrollPosition: number;
  };
  details: {
    loading: boolean;
    error: string | null;
  };
};
