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

      dispatch(addNewPost(fakePost));

      setTimeout(() => {
        dispatch(removeNewPost(fakePost.id));
      }, 9000);
    }, 7000);

    return () => clearInterval(interval);
  }, []);
}
