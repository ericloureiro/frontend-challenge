import { renderHook, act } from "@testing-library/react";

import { addNewPost, removeNewPost } from "@/features";
import { generatePost } from "@/utils";
import { Post } from "@/types";

import { usePostsSubscription } from "./usePostsSubscription";

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
    userId: 1,
    views: 0,
  };

  test("should dispatch addNewPost on interval", () => {
    (generatePost as jest.Mock).mockReturnValue(mockPost);

    renderHook(() => usePostsSubscription());

    // trigger interval (7s)
    act(() => {
      jest.advanceTimersByTime(7000);
    });

    expect(mockDispatch).toHaveBeenCalledWith(addNewPost(mockPost));
  });

  test("should dispatch removeNewPost after 9 seconds", () => {
    (generatePost as jest.Mock).mockReturnValue(mockPost);

    renderHook(() => usePostsSubscription());

    // trigger interval
    act(() => {
      jest.advanceTimersByTime(7000);
    });

    // trigger inner timeout
    act(() => {
      jest.advanceTimersByTime(9000);
    });

    expect(mockDispatch).toHaveBeenCalledWith(removeNewPost(mockPost.id));
  });

  test("should clear interval on unmount", () => {
    const clearSpy = jest.spyOn(global, "clearInterval");

    const { unmount } = renderHook(() => usePostsSubscription());

    unmount();

    expect(clearSpy).toHaveBeenCalled();
  });

  test("should not leak multiple intervals", () => {
    renderHook(() => usePostsSubscription());
    renderHook(() => usePostsSubscription());

    act(() => {
      jest.advanceTimersByTime(7000);
    });

    expect(mockDispatch).toHaveBeenCalled();
  });
});
