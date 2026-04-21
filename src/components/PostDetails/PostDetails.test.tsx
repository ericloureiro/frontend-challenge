import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { Post } from "@/types";

import { PostDetails } from "./PostDetails";

jest.mock("@/utils", () => ({
  truncate: jest.fn((text: string) => `TRUNCATED:${text}`),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => <img {...props} />,
}));

jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span data-testid="icon" />,
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

describe("PostDetails", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render mandatory data", () => {
    render(<PostDetails post={mockPost} />);

    expect(screen.getByText("Test Title")).toBeDefined();
    expect(screen.getByText("User #42")).toBeDefined();
    expect(screen.getByText("#react")).toBeDefined();
    expect(screen.getByText("#nextjs")).toBeDefined();
    expect(screen.getByText("10")).toBeDefined(); // likes
    expect(screen.getByText("2")).toBeDefined(); // dislikes
    expect(screen.getByText("100")).toBeDefined(); // views
  });

  test("should use truncate when isPreview is true", () => {
    render(<PostDetails post={mockPost} isPreview />);

    expect(screen.getByText(/TRUNCATED:/)).toBeDefined();
  });

  test("should NOT call truncate when not preview", () => {
    render(<PostDetails post={mockPost} isPreview={false} />);

    expect(screen.getByText("Test body content")).toBeDefined();
  });

  test("should apply orange border when isNew is true", () => {
    const { container } = render(<PostDetails post={mockPost} isNew />);

    const card = container.firstChild as HTMLElement;

    expect(card.className).toContain("border-orange-500");
  });

  test("should render avatar with correct userId", () => {
    render(<PostDetails post={mockPost} />);

    const img = screen.getByAltText("avatar");

    expect(img).toHaveAttribute("src", expect.stringContaining("u=42"));
  });
});
