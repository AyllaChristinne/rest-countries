import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dropdown } from ".";
import Container from "../container";

describe("Dropdown Component", () => {
  const setSelectedRegion = jest.fn();

  it("should render correctly", () => {
    const selectedRegion = null;
    const { getByText, getAllByRole } = render(
      <Dropdown
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />
    );
    const dropdownOpener = getByText("Filter by region");
    userEvent.click(dropdownOpener);
    expect(getAllByRole("option")).toHaveLength(5);
  });

  it("should render correct label when no region is selected", () => {
    const selectedRegion = null;
    const { getByText } = render(
      <Dropdown
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />
    );

    expect(getByText("Filter by region")).toBeInTheDocument();
  });

  it("should render correct label when region is selected", () => {
    const selectedRegion = "Americas";
    const { getByTestId } = render(
      <Dropdown
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />
    );
    const openerButton = getByTestId("dropdown_openerButton");
    expect(openerButton).toHaveTextContent("Americas");
  });

  it("should close on click out", () => {
    const selectedRegion = null;
    const { getByTestId } = render(
      <Container>
        <Dropdown
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
        />
      </Container>
    );

    const dropdownOpener = getByTestId("dropdown_openerButton");

    userEvent.click(dropdownOpener);
    userEvent.click(document.body);
    expect(getByTestId("dropdown_menu")).toHaveClass(
      "dropdown_menu  dropdown_menu__closed"
    );
  });

  it("should select region correctly", () => {
    const selectedRegion = null;
    const { getByText, getByTestId } = render(
      <Dropdown
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />
    );

    const dropdownOpener = getByText("Filter by region");
    userEvent.click(dropdownOpener);

    const dropdownItem = getByText("Oceania");
    userEvent.click(dropdownItem);

    expect(setSelectedRegion).toHaveBeenCalledTimes(1);
    expect(getByTestId("dropdown_menu")).toHaveClass(
      "dropdown_menu  dropdown_menu__closed"
    );
  });

  it("should clear region correctly", () => {
    const selectedRegion = "Asia";
    const { getByTestId, rerender } = render(
      <Dropdown
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />
    );

    const btnClearDropdown = getByTestId("clear_dropdown");

    userEvent.click(btnClearDropdown);

    expect(setSelectedRegion).toHaveBeenCalledTimes(1);

    rerender(
      <Dropdown selectedRegion={null} setSelectedRegion={setSelectedRegion} />
    );
    expect(getByTestId("dropdown_openerButton").textContent).toEqual(
      "Filter by region"
    );
  });
});
