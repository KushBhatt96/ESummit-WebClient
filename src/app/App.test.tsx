import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { App, WrappedApp } from "./App";

describe("App", () => {
  it("Renders Hello World", () => {
    // Arrange
    render(<WrappedApp />);

    // Act

    // Expect
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Hello World"
    );
  });

  it("Renders Not Found if invalid path", () => {
    // Arrange
    render(
      <MemoryRouter initialEntries={["/coolpath"]}>
        <App />
      </MemoryRouter>
    );
    // Act
    // Expect
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Not Found"
    );
  });
});
