import React from "react";
import { render, screen } from "@testing-library/react";
import { AppProvider, useAppContext } from "./appContext";

const MockComponent = () => {
  const { theme } = useAppContext();
  return <div data-testid="theme">{theme}</div>;
};

describe("AppContext", () => {
  test("should render children and provides context values", () => {
    render(
      <AppProvider>
        <MockComponent />
      </AppProvider>
    );

    expect(screen.getByTestId("theme")).toHaveTextContent("light");
  });

  test("initial context values are correct", () => {
    const TestComponent = () => {
      const context = useAppContext();

      expect(context.isError).toBe(false);
      expect(context.isLoading).toBe(false);
      expect(context.theme).toBe("light");
      expect(context.countries).toBeNull();
      expect(context.debouncedSearch).toBe("");
      expect(context.currentPage).toBe(1);
      expect(context.pageNumbers).toHaveLength(0);
      expect(context.currentCountries).toBeNull();
      expect(context.filteredCountries).toBeNull();
      return <div />;
    };

    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
  });
});
