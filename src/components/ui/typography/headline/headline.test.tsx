import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Headline from "./Headline.tsx";

describe("headline component", () => {
  test("should render children and specified variant", () => {
    render(<Headline variant={"h1"}>hello there</Headline>);

    const headline = screen.getByRole("heading", { name: /hello/i });

    expect(headline).toBeInTheDocument();
    expect(headline).toHaveTextContent("hello there");
  });

  test("should apply custom class names", () => {
    render(
      <Headline variant={"h1"} className={"custom-class"}>
        hello there
      </Headline>,
    );

    const headline = screen.getByRole("heading", { name: /hello/i });

    expect(headline).toHaveClass("custom-class headline");
  });
});
