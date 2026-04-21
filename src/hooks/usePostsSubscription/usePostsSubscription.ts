"use client";

import { useEffect } from "react";
import { addNewPost, removeNewPost } from "@/features";
import { useAppDispatch } from "@/store";
import { generatePost } from "@/utils";

export function usePostsSubscription() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      const fakePost = generatePost();

      const scrollY = window.scrollY;

      const previousHeight = document.documentElement.scrollHeight;

      dispatch(addNewPost(fakePost));

      requestAnimationFrame(() => {
        const newHeight = document.documentElement.scrollHeight;

        const diff = newHeight - previousHeight;

        window.scrollTo({
          top: scrollY + diff,
          behavior: "auto",
        });
      });

      setTimeout(() => {
        dispatch(removeNewPost(fakePost.id));
      }, 9000);
    }, 7000);

    return () => clearInterval(interval);
  }, []);
}
