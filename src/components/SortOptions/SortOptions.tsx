import { useEffect, useState } from "react";
import { getCountriesByRegion } from "../../services/getCountriesByRegion";
import "./SortOptions.scss";
import { SearchIcon } from "../../assets/icons/SearchIcon";
import { getCountryByName } from "../../services/getCountryByName";
import { useAppContext } from "../../context/appContext";

export default function SortOptions() {
  const [searchValue, setSearchValue] = useState<string>("");
  const { setIsLoading, setCountries, debouncedSearch, setDebouncedSearch } =
    useAppContext();

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 1000);

    return () => {
      clearTimeout(delaySearch);
    };
  }, [searchValue]);

  useEffect(() => {
    const debouncedInputSearch = async () => {
      if (debouncedSearch) {
        setIsLoading(true);
        const c = await getCountryByName(debouncedSearch);
        setCountries(c);
        setIsLoading(false);
      }
    };

    debouncedInputSearch();
  }, [debouncedSearch, setCountries, setIsLoading]);

  const handleInputChange = (search: string) => {
    setSearchValue(search);
  };

  const handleRegionChange = async (region: string) => {
    setIsLoading(true);
    const c = await getCountriesByRegion(region);
    setCountries(c);
    setIsLoading(false);
  };

  return (
    <div className="sort-options">
      <div className="search-input-div">
        <SearchIcon classNames="search-icon" />
        <input
          type="search"
          className="search-input"
          name="search"
          placeholder="Search for a country..."
          autoComplete="off"
          value={searchValue}
          onChange={(e) => {
            handleInputChange(e.target.value);
          }}
        />
      </div>

      <select
        className="region-select"
        defaultValue="default"
        onChange={(e) => {
          handleRegionChange(e.target.value);
        }}
      >
        <option value="default" disabled>
          Filter by region
        </option>
        <option value="africa">Africa</option>
        <option value="americas">America</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="oceania">Oceania</option>
      </select>
    </div>
  );
}
