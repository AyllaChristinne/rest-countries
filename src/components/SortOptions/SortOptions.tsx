import { Dispatch, useEffect, useState } from "react";
import { CountryType } from "../../types";
import { getCountriesByRegion, getCountryByName } from "../../services";
import "./SortOptions.scss";
import { SearchIcon } from "../../assets/icons/SearchIcon";

type SortOptionsProps = {
  setCountries: Dispatch<React.SetStateAction<CountryType[]>>;
  setLoading: Dispatch<React.SetStateAction<boolean>>;
};

export default function SortOptions({
  setCountries,
  setLoading,
}: SortOptionsProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

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
        setLoading(true);
        const c = await getCountryByName(debouncedSearch);
        setCountries(c);
        setLoading(false);
      }
    };

    debouncedInputSearch();
  }, [debouncedSearch, setCountries, setLoading]);

  const handleInputChange = (search: string) => {
    setSearchValue(search);
  };

  const handleRegionChange = async (region: string) => {
    setLoading(true);
    const c = await getCountriesByRegion(region);
    setCountries(c);
    setLoading(false);
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
