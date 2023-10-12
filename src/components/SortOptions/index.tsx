import { useRef } from "react";
import { SearchIcon } from "../../assets/icons/SearchIcon";
import { useAppContext } from "../../context/appContext";
import { resetPageNumbers } from "../../functions/resetPageNumbers";
import { setCountriesByPage } from "../../functions/setCountriesByPage";
import { Dropdown } from "../Dropdown";
import "./index.scss";
import { getCountryByName } from "../../services/countries";

export default function SortOptions() {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const {
    countries,
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
      setFilteredCountries(response.data);
      setIsError(false);
    } else {
      setIsError(true);
      setFilteredCountries(null);
    }
  };

  const handleSearch = (search: string) => {
    timer.current && clearTimeout(timer.current);

    timer.current = setTimeout(async () => {
      setIsLoading(true);
      if (search.trim() !== "") {
        await debouncedInputSearch(search);

        if (filteredCountries && !isError) {
          resetPageNumbers(filteredCountries, setPageNumbers);
          setCountriesByPage(
            filteredCountries,
            currentPage,
            setCurrentCountries
          );
        }
      } else {
        setFilteredCountries(null);
        countries &&
          setCountriesByPage(countries, currentPage, setCurrentCountries);
        countries && resetPageNumbers(countries, setPageNumbers);
      }
      setIsLoading(false);
    }, 1000);
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

      <Dropdown />
    </div>
  );
}
