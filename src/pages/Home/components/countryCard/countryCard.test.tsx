import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import CountryCard from ".";
import { mockCountry } from "../../../../mocks/countries";

test("CountryCard Component should render correctly", () => {
  const { getByText, getByRole } = render(
    <MemoryRouter>
      <CountryCard
        name={mockCountry.name.common}
        capital={mockCountry.capital}
        flag={mockCountry.flags.svg}
        pop={mockCountry.population}
        region={mockCountry.region}
        altFlag={mockCountry.flags.alt}
      />
    </MemoryRouter>
  );
  const flag = getByRole("img");
  expect(flag).toHaveAttribute("alt", "Flag of Brasil");
  expect(flag).toHaveAttribute("src", "https://flagcdn.com/uz.svg");
  expect(getByText("Brasil")).toBeInTheDocument();
  expect(getByText("Brasília")).toBeInTheDocument();
  expect(getByText("123.456.789")).toBeInTheDocument();
  expect(getByText("Americas")).toBeInTheDocument();
});
