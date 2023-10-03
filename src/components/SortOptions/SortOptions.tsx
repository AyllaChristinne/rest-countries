import { useRef, useState } from "react";
import { getCountriesByRegion } from "../../services/getCountriesByRegion";
import "./SortOptions.scss";
import { SearchIcon } from "../../assets/icons/SearchIcon";
import { getCountryByName } from "../../services/getCountryByName";
import { useAppContext } from "../../context/appContext";
import { resetPageNumbers } from "../../functions/resetPageNumbers";
import { setCountriesByPage } from "../../functions/setCountriesByPage";

export default function SortOptions() {
  const [searchValue, setSearchValue] = useState<string>("");
  const timer = useRef<NodeJS.Timeout | null>(null);
  const {
    isLoading,
    countries,
    currentCountries,
    currentPage,
    isError,
    filteredCountries,
    setIsError,
    setIsLoading,
    setCurrentCountries,
    setPageNumbers,
    setFilteredCountries,
  } = useAppContext();

  const debouncedInputSearch = async (search: string) => {
    const response = await getCountryByName(search);
    if (response.success) {
      console.log(
        "filteredCountries no debouncedSearch ANTES",
        filteredCountries
      );
      console.log("response.data", response.data);
      setFilteredCountries(response.data);
      setIsError(false);
      console.log("filteredCountries no debouncedSearch", filteredCountries);
    } else {
      setIsError(true);
      setFilteredCountries(null);
    }
  };

  const handleSearch = (search: string) => {
    timer.current && clearTimeout(timer.current);

    timer.current = setTimeout(async () => {
      setIsLoading(true);
      if (search === "" && countries) {
        setFilteredCountries(null);
        setCountriesByPage(
          "paginationBar",
          countries,
          currentPage,
          setCurrentCountries
        );
        resetPageNumbers(countries, setPageNumbers);
      } else {
        await debouncedInputSearch(search);

        if (filteredCountries && !isError) {
          resetPageNumbers(filteredCountries, setPageNumbers);
          setCountriesByPage(
            "paginationBar",
            filteredCountries,
            currentPage,
            setCurrentCountries
          );
        }
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleRegionChange = async (region: string) => {
    setIsLoading(true);

    const response = await getCountriesByRegion(region);
    if (response.success) {
      setCurrentCountries(response.data);
      setIsError(false);
    } else {
      setIsError(true);
      setPageNumbers([]);
      setCurrentCountries(null);
    }
    setIsLoading(false);
  };

  return (
    <div className="sortOptions_container">
      <div className="search_container">
        <SearchIcon classNames="search_icon" />
        <input
          type="search"
          className="search_input"
          name="search"
          placeholder="Search for a country..."
          autoComplete="off"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </div>

      <select
        className="region_dropdown"
        defaultValue="default"
        onChange={(e) => {
          setSearchValue(e.target.value);
          handleRegionChange(e.target.value);
        }}
      >
        <option value="default" disabled>
          Filter by region
        </option>
        <option value="africa" className="region_dropdownOption">
          Africa
        </option>
        <option value="americas" className="region_dropdownOption">
          America
        </option>
        <option value="asia" className="region_dropdownOption">
          Asia
        </option>
        <option value="europe" className="region_dropdownOption">
          Europe
        </option>
        <option value="oceania" className="region_dropdownOption">
          Oceania
        </option>
      </select>
    </div>
  );
}
