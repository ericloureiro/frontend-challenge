import { render, screen, fireEvent } from "@testing-library/react";

import { FloatingButton } from "./FloatingButton";

describe("FloatingButton", () => {
  test("should call onClick when button is clicked", () => {
    const onClick = jest.fn();

    render(<FloatingButton count={0} onClick={onClick} />);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  describe("count badge", () => {
    test("should render count badge when count > 0", () => {
      render(<FloatingButton count={5} onClick={() => {}} />);

      expect(screen.getByText("5")).toBeDefined();
    });

    test("should NOT render count badge when count is 0", () => {
      render(<FloatingButton count={0} onClick={() => {}} />);

      expect(screen.queryByText("0")).toBeNull();
    });

    test("should NOT render badge when count is negative", () => {
      render(<FloatingButton count={-1} onClick={() => {}} />);

      expect(screen.queryByText("-1")).toBeNull();
    });
  });
});
