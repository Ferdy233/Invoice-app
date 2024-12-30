import {describe, expect, test, vi} from "vitest";
import Button from "./button.tsx";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import "@testing-library/jest-dom"

describe("button component", () => {
    test("should render button children", () => {
        render(<Button>click me</Button>);
        const button = screen.getByRole("button", {name: /click/i});
        expect(button).toBeInTheDocument();
    });

    test("should render with default variant and radius", () => {
        render(<Button>click me</Button>);
        const button = screen.getByRole("button", {name: /click/i});
        expect(button.className).toContain("button");
        expect(button.className).toContain("rounded");
        expect(button.className).toContain("default");
    });

    test("should render with specified variant and radius", () => {
        render(
            <Button variant="primary" radius={"rounded-lg"}>
                click me
            </Button>,
        );
        const button = screen.getByRole("button", {name: /click/i});
        expect(button.className).toContain("button");
        expect(button.className).toContain("rounded-lg");
        expect(button.className).toContain("primary");
    });

    test("should combine custom className with radius and variant", () => {
        render(
            <Button className="custom-class" radius="rounded-full" variant="danger">
                Click Me
            </Button>,
        );
        const button = screen.getByRole("button", {name: "Click Me"});
        expect(button.className).toContain("button");
        expect(button.className).toContain("rounded-full");
        expect(button.className).toContain("danger");
        expect(button.className).toContain("custom-class");
    });

    test("should render onClick prop when clicked", async () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>click me</Button>);

        const button = screen.getByRole("button", {name: /click/i});
        await userEvent.click(button);

        expect(handleClick).toBeCalledTimes(1);
    });

    test("should be disabled when disabled prop is passed", () => {
        render(<Button disabled={true}>click me</Button>);
        const button = screen.getByRole("button", {name: /click/i});
        expect(button).toBeDisabled();
    });
});
