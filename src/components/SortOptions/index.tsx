import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "../../assets/icons/SearchIcon";
import { useAppContext } from "../../context/appContext";
import { resetPageNumbers } from "../../functions/resetPageNumbers";
import { setCountriesByPage } from "../../functions/setCountriesByPage";
import { Dropdown } from "../Dropdown";
import "./index.scss";
import { getCountryByName } from "../../services/countries";

export default function SortOptions() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
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
      setSelectedRegion(null);
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

  useEffect(() => {
    if (selectedRegion) setSearch("");
  }, [selectedRegion]);

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
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearch(e.target.value);
          }}
        />
      </div>

      <Dropdown
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />
    </div>
  );
}
