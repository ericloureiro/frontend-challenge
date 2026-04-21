import { renderHook, act } from "@testing-library/react";

import { addNewPost, removeNewPost } from "@/features";
import { Post } from "@/types";

import { usePostsSubscription } from "./usePostsSubscription";
import { NEW_POST_FADEOUT, NEW_POST_POOL } from "./constants";

jest.mock("@/utils", () => ({
  generatePost: jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock("@/store", () => ({
  useAppDispatch: () => mockDispatch,
}));

describe("usePostsSubscription", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const mockPost: Post = {
    id: "1",
    title: "Test",
    body: "",
    reactions: { dislikes: 0, likes: 0 },
    tags: [],
    userId: "1",
    internalId: "11",
    views: 0,
  };

  test("should dispatch addNewPost on interval", () => {
    renderHook(() => usePostsSubscription([mockPost]));

    // trigger interval
    act(() => {
      jest.advanceTimersByTime(NEW_POST_POOL);
    });

    expect(mockDispatch).toHaveBeenCalledWith(addNewPost(mockPost));
  });

  test("should dispatch removeNewPost after few seconds", () => {
    renderHook(() => usePostsSubscription([mockPost]));

    // trigger interval
    act(() => {
      jest.advanceTimersByTime(NEW_POST_POOL);
    });

    // trigger inner timeout
    act(() => {
      jest.advanceTimersByTime(NEW_POST_FADEOUT);
    });

    expect(mockDispatch).toHaveBeenCalledWith(removeNewPost(mockPost.id));
  });

  test("should clear interval on unmount", () => {
    const clearSpy = jest.spyOn(global, "clearInterval");

    const { unmount } = renderHook(() => usePostsSubscription([mockPost]));

    unmount();

    expect(clearSpy).toHaveBeenCalled();
  });
});
