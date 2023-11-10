import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BorderButton from "./index";
import React from "react";

const mockBorders = ["GIN", "LBR"];

describe("BorderButton Component", () => {
  it("should render correctly when country has borders", async () => {
    const { findByText } = render(
      <MemoryRouter>
        <BorderButton borderCodes={mockBorders} />
      </MemoryRouter>
    );

    expect(await findByText("Guinea")).toBeInTheDocument();
    expect(await findByText("Liberia")).toBeInTheDocument();
  });

  it("should render correctly when country has no border", async () => {
    render(
      <MemoryRouter>
        <BorderButton borderCodes={undefined} />
      </MemoryRouter>
    );

    expect(await screen.getByTestId("no-borders-message")).toBeInTheDocument();
  });
});
