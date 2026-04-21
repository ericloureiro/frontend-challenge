import { Post } from "../../types";

export type PostsSliceState = {
  items: Post[];
  page: number;
  hasMore: boolean;
  loading: boolean;
  error: string;
};
