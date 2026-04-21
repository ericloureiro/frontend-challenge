import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import { Post } from "@/types";

import { PostCard } from "./PostCard";
import { PropsWithChildren } from "react";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    onClick,
  }: PropsWithChildren<{ href: string; onClick: () => void }>) => (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  ),
}));

jest.mock("@/components/PostDetails", () => ({
  PostDetails: ({
    post,
    isNew,
    isPreview,
  }: {
    post: Post;
    isNew: boolean;
    isPreview: boolean;
  }) => (
    <div
      data-testid="post-details"
      data-post-id={post.id}
      data-is-new={isNew}
      data-is-preview={isPreview}
    />
  ),
}));

const mockPost: Post = {
  id: "1",
  title: "Test",
  body: "Body",
  tags: [],
  reactions: { likes: 0, dislikes: 0 },
  views: 0,
  userId: 1,
};

describe("PostCard", () => {
  describe("when it is not clickable", () => {
    test("should render PostDetails without link", () => {
      render(<PostCard post={mockPost} isNew={false} />);

      const details = screen.getByTestId("post-details");

      expect(details).toBeInTheDocument();
      expect(details).toHaveAttribute("data-post-id", "1");
    });
  });

  describe("when it is clickable", () => {
    test("should wrap PostDetails in a link", () => {
      const onClick = jest.fn();

      render(<PostCard post={mockPost} isNew={true} onClick={onClick} />);

      const link = screen.getByRole("link");

      expect(link).toHaveAttribute("href", "/post/1");
    });

    test("should pass isPreview=true", () => {
      const onClick = jest.fn();

      render(<PostCard post={mockPost} isNew={true} onClick={onClick} />);

      const details = screen.getByTestId("post-details");

      expect(details).toHaveAttribute("data-is-preview", "true");
    });

    test("should call onClick when link is clicked", () => {
      const onClick = jest.fn();

      render(<PostCard post={mockPost} isNew={false} onClick={onClick} />);

      const link = screen.getByRole("link");

      fireEvent.click(link);

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  test("should pass isNew prop correctly", () => {
    const onClick = jest.fn();

    render(<PostCard post={mockPost} isNew={true} onClick={onClick} />);

    const details = screen.getByTestId("post-details");

    expect(details).toHaveAttribute("data-is-new", "true");
  });
});
