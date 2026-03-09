import "@testing-library/jest-dom/vitest";
import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

function renderApp(path = "/users") {
  const qc = new QueryClient();
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe("App integration", () => {
  it("filters users, persists filter, and navigates to detail", async () => {
    localStorage.clear();
    const user = userEvent.setup();

    renderApp("/users");

    const input = await screen.findByLabelText("filter-by-name");
    await user.type(input, "erv");

    expect(localStorage.getItem("users.filter.v1")).toBe("erv");

    await user.click(await screen.findByText("Ervin Howell"));

    expect(await screen.findByText(/Phone:/i)).toBeInTheDocument();
    expect(screen.getByText(/Company:/i)).toBeInTheDocument();
  });
});