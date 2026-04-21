"use client";

import { useEffect, useRef } from "react";

import { addNewPost, removeNewPost } from "@/features";
import { useAppDispatch } from "@/store";
import { Post } from "@/types";
import { NEW_POST_FADEOUT, NEW_POST_POOL } from "./constants";

export function usePostsSubscription(posts: Post[]) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      if (posts.length === 0) {
        return;
      }

      const post = posts[Math.floor(Math.random() * posts.length)];

      const scrollY = window.scrollY;
      const isNearTop = scrollY < 200;

      const previousHeight = document.documentElement.scrollHeight;

      dispatch(addNewPost(post));

      requestAnimationFrame(() => {
        if (isNearTop) {
          // Scroll up when user is at top to follow the feed
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });

          return;
        }

        // Preserve position when user is already scrolling
        const newHeight = document.documentElement.scrollHeight;
        const diff = newHeight - previousHeight;

        window.scrollTo({
          top: scrollY + diff,
          behavior: "auto",
        });
      });

      setTimeout(() => {
        dispatch(removeNewPost(post.id));
      }, NEW_POST_FADEOUT);
    }, NEW_POST_POOL);

    return () => clearInterval(interval);
  }, [posts]);
}
