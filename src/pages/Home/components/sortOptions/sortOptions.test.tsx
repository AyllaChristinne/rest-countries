import React from "react";
import { render } from "@testing-library/react";
import SortOptions from "./index";

jest.mock("../../../../functions/resetPageNumbers");
jest.mock("../../../../functions/setCountriesByPage");
jest.mock("../../../../services/getCountryByName");

describe("SortOptions", () => {
  it("should render correctly", () => {
    const { getByText, getByPlaceholderText } = render(<SortOptions />);
    expect(getByPlaceholderText("Search for a country...")).toBeInTheDocument();
    expect(getByText("Filter by region")).toBeInTheDocument();
  });
});
