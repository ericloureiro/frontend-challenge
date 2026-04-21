import { render, screen } from "@testing-library/react";
import { useParams } from "next/navigation";

import { loadPostById } from "@/features";
import { useAppSelector, useAppDispatch } from "@/store";
import { Post } from "@/types";

import PostDetailsPage from "./page";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

jest.mock("@/store", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

jest.mock("@/features", () => ({
  loadPostById: jest.fn(() => ({ type: "loadPostById" })),
}));

jest.mock("@/components", () => ({
  Spinner: () => <div>Loading...</div>,
  ErrorMessage: ({ message }: { message: string }) => <div>{message}</div>,
  PostCard: ({ post }: { post: Post }) => <div>{post.title}</div>,
}));

const mockPost: Post = {
  id: "1",
  title: "Test Title",
  body: "Test body content",
  tags: ["react", "nextjs"],
  reactions: { likes: 10, dislikes: 2 },
  views: 100,
  userId: 42,
};

describe("PostDetailsPage", () => {
  const mockedUseParams = useParams as jest.Mock;
  const mockedSelector = useAppSelector as jest.Mock;
  const mockedDispatch = useAppDispatch as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockedDispatch.mockReturnValue(jest.fn());
  });

  test("should show spinner when loading initial", () => {
    mockedUseParams.mockReturnValue({ id: "1" });

    mockedSelector.mockReturnValue({
      postById: { "1": mockPost },
      details: {
        loading: true,
        error: null,
      },
    });

    render(<PostDetailsPage />);

    expect(screen.getByText("Loading...")).toBeDefined();
  });

  test("should render post", () => {
    mockedUseParams.mockReturnValue({ id: "1" });

    mockedSelector.mockReturnValue({
      postById: {
        1: { id: 1, title: "Post title" },
      },
      details: {
        loading: false,
        error: null,
      },
    });

    render(<PostDetailsPage />);

    expect(screen.getByText("Post title")).toBeDefined();
  });

  test("should show error message", () => {
    mockedUseParams.mockReturnValue({ id: "1" });

    mockedSelector.mockReturnValue({
      postById: {},
      details: {
        loading: false,
        error: "Something went wrong",
      },
    });

    render(<PostDetailsPage />);

    expect(screen.getByText("Something went wrong")).toBeDefined();
  });

  test("should dispatch loadPostById on mount", () => {
    const dispatchMock = jest.fn();
    mockedDispatch.mockReturnValue(dispatchMock);

    mockedUseParams.mockReturnValue({ id: "1" });

    mockedSelector.mockReturnValue({
      postById: {},
      details: {
        loading: false,
        error: null,
      },
    });

    render(<PostDetailsPage />);

    expect(dispatchMock).toHaveBeenCalledWith(loadPostById("1"));
  });

  test("should not dispatch when id is missing", () => {
    const dispatchMock = jest.fn();

    mockedDispatch.mockReturnValue(dispatchMock);

    mockedUseParams.mockReturnValue({ id: undefined });

    mockedSelector.mockReturnValue({
      postById: {},
      details: {
        loading: false,
        error: null,
      },
    });

    render(<PostDetailsPage />);

    expect(dispatchMock).not.toHaveBeenCalled();
  });
});
