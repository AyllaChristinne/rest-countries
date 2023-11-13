import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dropdown } from ".";

describe("handleKeyDown Function", () => {
  it("should select the next item when Down/ArrowDown key is pressed", () => {
    render(<Dropdown selectedRegion={null} setSelectedRegion={jest.fn()} />);

    const opener = screen.getByTestId("dropdown_openerButton");
    const items = screen.getAllByRole("option");

    userEvent.click(opener);
    userEvent.keyboard("{arrowdown}");

    expect(items[0]).toHaveAttribute("aria-selected", "true");
  });

  it("should select the previous item when Up/ArrowUp key is pressed", () => {
    render(<Dropdown selectedRegion={null} setSelectedRegion={jest.fn()} />);

    const opener = screen.getByTestId("dropdown_openerButton");
    const items = screen.getAllByRole("option");

    userEvent.click(opener);
    userEvent.keyboard("{arrowdown}");
    userEvent.keyboard("{arrowdown}");
    userEvent.keyboard("{arrowup}");

    expect(items[0]).toHaveAttribute("aria-selected", "true");
  });

  it("should select the first item when Home/PageUp key is pressed", () => {
    render(<Dropdown selectedRegion={null} setSelectedRegion={jest.fn()} />);

    const opener = screen.getByTestId("dropdown_openerButton");
    const items = screen.getAllByRole("option");

    userEvent.click(opener);
    userEvent.keyboard("{home}");

    expect(items[0]).toHaveAttribute("aria-selected", "true");
  });

  it("should select the last item when End/PageDown key is pressed", () => {
    render(<Dropdown selectedRegion={null} setSelectedRegion={jest.fn()} />);

    const opener = screen.getByTestId("dropdown_openerButton");
    const items = screen.getAllByRole("option");

    userEvent.click(opener);
    userEvent.keyboard("{end}");

    expect(items[items.length - 1]).toHaveAttribute("aria-selected", "true");
  });

  it("should close Dropdown when Tab is pressed", () => {
    render(<Dropdown selectedRegion={null} setSelectedRegion={jest.fn()} />);

    const opener = screen.getByTestId("dropdown_openerButton");
    const menu = screen.getByTestId("dropdown_menu");

    userEvent.click(opener);
    userEvent.tab();

    expect(menu).toHaveClass("dropdown_menu  dropdown_menu__closed");
  });
});
