import { renderHook, act } from "@testing-library/react";

import { useInfiniteScroll } from "@/hooks";

import { SCROLL_PERCENT } from "./constants";

function setMockScrollEnvironment({
  innerHeight,
  scrollY,
  scrollHeight,
}: {
  innerHeight: number;
  scrollY: number;
  scrollHeight: number;
}) {
  Object.defineProperty(window, "innerHeight", {
    value: innerHeight,
    writable: true,
  });

  Object.defineProperty(window, "scrollY", {
    value: scrollY,
    writable: true,
  });

  Object.defineProperty(document.documentElement, "scrollHeight", {
    value: scrollHeight,
    writable: true,
  });
}

describe("useInfiniteScroll", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("lifecycles", () => {
    test("should attach scroll listener on mount", () => {
      const addSpy = jest.spyOn(window, "addEventListener");

      renderHook(() => useInfiniteScroll(jest.fn(), false));

      expect(addSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
    });

    test("should remove scroll listener on unmount", () => {
      const removeSpy = jest.spyOn(window, "removeEventListener");

      const { unmount } = renderHook(() => useInfiniteScroll(jest.fn(), false));

      unmount();

      expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
    });
  });

  describe("should skip callback when", () => {
    test("skip is true", () => {
      const callback = jest.fn();

      setMockScrollEnvironment({
        innerHeight: 1000,
        scrollY: 1000,
        scrollHeight: 2000,
      });

      renderHook(() => useInfiniteScroll(callback, true));

      act(() => {
        window.dispatchEvent(new Event("scroll"));
      });

      expect(callback).not.toHaveBeenCalled();
    });

    test("below threshold", () => {
      const callback = jest.fn();

      setMockScrollEnvironment({
        innerHeight: 500,
        scrollY: 100,
        scrollHeight: 2000,
      });

      renderHook(() => useInfiniteScroll(callback, false));

      act(() => {
        window.dispatchEvent(new Event("scroll"));
      });

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe("should execute callback when", () => {
    test("rapid scroll only once", () => {
      const callback = jest.fn();

      setMockScrollEnvironment({
        innerHeight: 1000,
        scrollY: 1000,
        scrollHeight: 2000,
      });

      renderHook(() => useInfiniteScroll(callback, false));

      act(() => {
        window.dispatchEvent(new Event("scroll"));
        window.dispatchEvent(new Event("scroll"));
        window.dispatchEvent(new Event("scroll"));
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });

    test("reaching threshold", () => {
      const callback = jest.fn();

      setMockScrollEnvironment({
        innerHeight: 1000,
        scrollY: 900,
        scrollHeight: 2000,
      });

      renderHook(() => useInfiniteScroll(callback, false));

      act(() => {
        window.dispatchEvent(new Event("scroll"));
      });

      expect(callback).toHaveBeenCalled();
    });

    test("at exact threshold boundary", () => {
      const callback = jest.fn();

      const scrollHeight = 2000;
      const innerHeight = 1000;
      const scrollY = SCROLL_PERCENT * scrollHeight - innerHeight;

      setMockScrollEnvironment({
        innerHeight,
        scrollY,
        scrollHeight,
      });

      renderHook(() => useInfiniteScroll(callback, false));

      act(() => {
        window.dispatchEvent(new Event("scroll"));
      });

      expect(callback).toHaveBeenCalled();
    });
  });

  test("should use latest callback reference", () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    setMockScrollEnvironment({
      innerHeight: 1000,
      scrollY: 1000,
      scrollHeight: 2000,
    });

    const { rerender } = renderHook(({ cb }) => useInfiniteScroll(cb, false), {
      initialProps: { cb: callback1 },
    });

    rerender({ cb: callback2 });

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(callback2).toHaveBeenCalled();
  });
});
