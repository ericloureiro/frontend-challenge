"use client";

import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { loadPosts } from "../features";

export default function Feed() {
  const dispatch = useAppDispatch();
  const { items, page, loading, error } = useAppSelector(
    (state) => state.posts,
  );

  useEffect(() => {
    dispatch(loadPosts(1));
  }, []);

  // TODO: better UI handling
  if (error) {
    return <p>{error}</p>;
  }

  if (loading) {
    return <p>loading</p>;
  }

  return (
    <div>
      {items.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <h2>{post.body}</h2>
        </div>
      ))}
    </div>
  );
}
