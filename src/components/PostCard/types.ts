import { Post } from "@/types";

export type PostCardProps = {
  post: Post;
  isNew?: boolean;
  onClick?: () => void;
};
