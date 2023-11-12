import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NotFound } from ".";
import { handleClickHomepage } from "../../functions/handleClickHomepage";
import userEvent from "@testing-library/user-event";

jest.mock("../../functions/handleClickHomepage", () => ({
  handleClickHomepage: jest.fn(),
}));

describe("NotFound component", () => {
  it("should render correctly", () => {
    const { getByText, getByTestId, getByRole } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(getByTestId("notFound_container")).toBeInTheDocument();
    expect(getByText("Page not found!")).toBeInTheDocument();
    expect(getByRole("link", { name: "homepage" })).toBeInTheDocument();
  });

  it("should handle click on homepage link correctly", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const homepageLink = getByRole("link", { name: "homepage" });
    userEvent.click(homepageLink);
    expect(handleClickHomepage).toHaveBeenCalled();
  });
});
