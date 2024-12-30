import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import InvoiceCard from "./Invoice.Card.tsx";

describe("InvoiceCard Component", () => {
  const mockProps = {
    id: "12345",
    paymentDue: "2024-12-31",
    status: "pending",
    clientName: "John Doe",
    total: 5000,
  };

  test("renders the invoice details correctly", () => {
    render(
      <BrowserRouter>
        <InvoiceCard {...mockProps} />
      </BrowserRouter>,
    );

    // Check if all elements render correctly
    expect(screen.getByText("#12345")).toBeInTheDocument();
    expect(screen.getByText("Due: 31 Dec 2024")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("5,000")).toBeInTheDocument();
    expect(screen.getByText(/pending/i)).toBeInTheDocument();
    expect(screen.getByAltText("arrow right")).toBeInTheDocument();
  });

  test("navigates to the correct route when clicked", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <InvoiceCard {...mockProps} />
      </BrowserRouter>,
    );

    const button = screen.getByRole("button");
    await user.click(button);

    expect(window.location.pathname).toEqual(`/${mockProps.id}`);
  });
});
