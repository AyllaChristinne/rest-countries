import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { AppProvider } from "../../context/appContext";
import Navbar from ".";
import { contextValues } from "../../mocks/context";
import { handleClickHomepage } from "../../functions/handleClickHomepage";

jest.mock("../../functions/handleClickHomepage", () => ({
  handleClickHomepage: jest.fn(),
}));

describe("Header Component", () => {
  it("should render correctly", () => {
    const { getByText, getByLabelText } = render(
      <AppProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AppProvider>
    );

    expect(getByText("Where in the world?")).toBeInTheDocument();
    expect(getByLabelText("Switch color theme")).toBeInTheDocument();
  });

  it("should switch theme on button click", () => {
    const { getByLabelText } = render(
      <AppProvider initialValue={contextValues}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AppProvider>
    );

    const themeButton = getByLabelText("Switch color theme");
    userEvent.click(themeButton);
    expect(contextValues.setTheme).toHaveBeenCalledWith("dark");
  });

  it("should handle click event for 'Where in the World?' link", () => {
    const { getByText } = render(
      <AppProvider initialValue={contextValues}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AppProvider>
    );

    const whereInTheWorldLink = getByText("Where in the world?");

    userEvent.click(whereInTheWorldLink);

    expect(handleClickHomepage).toHaveBeenCalledTimes(1);
  });
});
