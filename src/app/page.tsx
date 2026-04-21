"use client";

import { useEffect } from "react";

import { ErrorMessage, FloatingButton, PostCard, Spinner } from "@/components";
import { loadPostsByPage, setScrollPosition } from "@/features";
import { useInfiniteScroll, usePostsSubscription } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/store";

import { INITIAL_PAGE } from "./constants";

export default function FeedPage() {
  const dispatch = useAppDispatch();

  const { allPosts, newPostIds, feed } = useAppSelector((state) => state.posts);

  const { page, hasMore, loading, error, scrollPosition } = feed;

  usePostsSubscription(allPosts);

  function handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Save scroll position before redirecting the user
  function handleCardClick() {
    dispatch(setScrollPosition(window.scrollY));
  }

  // Restore scroll position
  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPosition);
    });
  }, [scrollPosition]);

  // Initial fetch
  useEffect(() => {
    if (allPosts.length !== 0) {
      return;
    }

    dispatch(loadPostsByPage(INITIAL_PAGE));
  }, [allPosts, dispatch]);

  // Load more fetch
  useInfiniteScroll(
    () => {
      dispatch(loadPostsByPage(page));
    },
    loading.initial || loading.more || !hasMore,
  );

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (loading.initial || allPosts.length === 0) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-4 items-center gap-4">
      {allPosts.map((post, index) => (
        <PostCard
          key={post.internalId}
          post={post}
          isNew={
            newPostIds.some((id) => id === post.internalId) &&
            newPostIds.length > index
          }
          onClick={handleCardClick}
        />
      ))}
      <FloatingButton onClick={handleScrollToTop} />
      {loading.more && <Spinner />}
    </div>
  );
}
