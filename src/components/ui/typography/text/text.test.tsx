import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Text from "./Text.tsx";

describe("test component", () => {
  test("should render test children with default size", () => {
    render(<Text>hello</Text>);

    const text = screen.getByText(/hello/i);

    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent("hello");
    expect(text.className).toContain("md");
  });

  test("should render test children with specified size", () => {
    render(<Text size="sm">hello</Text>);

    const text = screen.getByText(/hello/i);

    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent("hello");
    expect(text.className).toContain("sm");
  });
});
