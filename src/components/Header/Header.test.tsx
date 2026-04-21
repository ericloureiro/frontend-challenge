import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { Header } from "./Header";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => <img {...props} />,
}));

describe("Header", () => {
  test("should render header", () => {
    render(<Header />);

    const header = screen.getByRole("banner");

    expect(header).toBeDefined();
  });

  test("should render link to home", () => {
    render(<Header />);

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", "/");
  });

  test("should render logo image with correct alt", () => {
    render(<Header />);

    const image = screen.getByAltText("Go Home");

    expect(image).toBeDefined();
  });
});
