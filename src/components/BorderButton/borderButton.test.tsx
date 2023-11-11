import { render } from "@testing-library/react";
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

    await expect(await findByText("Guinea")).toBeInTheDocument();
    await expect(await findByText("Liberia")).toBeInTheDocument();
  });

  it("should render correctly when country has no border", async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <BorderButton borderCodes={undefined} />
      </MemoryRouter>
    );
    await expect(await getByTestId("no-borders-message")).toBeInTheDocument();
  });
});
