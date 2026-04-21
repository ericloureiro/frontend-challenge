import Link from "next/link";
import { PostCardProps } from "./types";
import { PostDetails } from "../PostDetails";

export function PostCard({ post, isNew, onClick }: PostCardProps) {
  const { id } = post;

  if (onClick) {
    return (
      <Link className="w-full" href={`/post/${id}`} onClick={onClick}>
        <PostDetails post={post} isNew={isNew} isPreview />
      </Link>
    );
  }

  return <PostDetails post={post} />;
}
