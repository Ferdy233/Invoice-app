import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Text from "./Text.tsx";

describe("test component", () => {
  test("should render test children with default size", () => {
    render(<Text>hello</Text>);

    const text = screen.getByText(/hello/i);

    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent("hello");
    expect(text).toHaveClass("text md");
  });

  test("should render test children with specified size", () => {
    render(<Text size="lg">hello</Text>);

    const text = screen.getByText(/hello/i);

    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent("hello");
    expect(text).toHaveClass("text lg");
  });
});
