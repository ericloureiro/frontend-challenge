"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

import { ErrorMessage, PostCard, Spinner } from "@/components";
import { loadPostById } from "@/features";
import { useAppDispatch, useAppSelector } from "@/store";

import { PostDetailsParams } from "./types";

export default function PostDetailsPage() {
  const dispatch = useAppDispatch();

  const { id } = useParams<PostDetailsParams>();

  const { postById, details } = useAppSelector((state) => state.posts);

  const post = postById[id];
  const { error, loading } = details;

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(loadPostById(id));
  }, [id, dispatch]);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (loading || !post) {
    return <Spinner />;
  }

  return <PostCard post={post} />;
}
