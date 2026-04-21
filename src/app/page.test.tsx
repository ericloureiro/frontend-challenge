import { render, screen } from "@testing-library/react";
import FeedPage from "./page";
import { useAppSelector } from "@/store";
import { Post } from "@/types";

jest.mock("@/components", () => ({
  PostCard: ({ post }: { post: Post }) => <div>{post.title}</div>,
  Spinner: () => <div>Loading...</div>,
  ErrorMessage: ({ message }: { message: string }) => <div>{message}</div>,
  FloatingButton: () => <div>Floating</div>,
}));

jest.mock("@/store", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: () => jest.fn(),
}));

jest.mock("@/hooks", () => ({
  useInfiniteScroll: jest.fn(),
  usePostsSubscription: jest.fn(),
}));

describe("FeedPage", () => {
  test("should show spinner when loading initial", () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      allPosts: [],
      newPostIds: [],
      feed: {
        loading: { initial: true, more: false },
        error: null,
        page: 1,
        hasMore: true,
        scrollPosition: 0,
      },
    });

    render(<FeedPage />);

    expect(screen.getByText("Loading...")).toBeDefined();
  });

  test("should render posts", () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      allPosts: [{ id: 1, title: "Post 1" }],
      newPostIds: [],
      feed: {
        loading: { initial: false, more: false },
        error: null,
        page: 1,
        hasMore: true,
        scrollPosition: 0,
      },
    });

    render(<FeedPage />);

    expect(screen.getByText("Post 1")).toBeDefined();
  });

  test("should show error message", () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      allPosts: [],
      newPostIds: [],
      feed: {
        loading: { initial: false, more: false },
        error: "Something went wrong",
        page: 1,
        hasMore: true,
        scrollPosition: 0,
      },
    });

    render(<FeedPage />);

    expect(screen.getByText("Something went wrong")).toBeDefined();
  });
});
