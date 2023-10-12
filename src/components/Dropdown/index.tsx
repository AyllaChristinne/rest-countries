import { useState } from "react";
import classNames from "classnames";
import { ArrowDown } from "../../assets/icons/ArrowDown";
import { CloseIcon } from "../../assets/icons/CloseIcon";
import { useAppContext } from "../../context/appContext";
import "./index.scss";
import { resetPageNumbers } from "../../functions/resetPageNumbers";
import { setCountriesByPage } from "../../functions/setCountriesByPage";
import { getCountriesByRegion } from "../../services/countries";

type DropdownPropsType = {
  selectedRegion: string | null;
  setSelectedRegion: React.Dispatch<React.SetStateAction<string | null>>;
};

export const Dropdown = ({
  selectedRegion,
  setSelectedRegion,
}: DropdownPropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  const {
    countries,
    currentPage,
    setCurrentCountries,
    setIsLoading,
    setFilteredCountries,
    setIsError,
    setPageNumbers,
  } = useAppContext();

  const toggleDropdown = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const clearRegion = () => {
    setIsLoading(true);
    setSelectedRegion(null);
    setFilteredCountries(null);
    countries && resetPageNumbers(countries, setPageNumbers);
    countries &&
      setCountriesByPage(countries, currentPage, setCurrentCountries);
    setIsLoading(false);
  };

  const handleRegionChange = async (region: string) => {
    setIsOpen(false);
    setIsLoading(true);
    setSelectedRegion(region);

    if (region) {
      const response = await getCountriesByRegion(region);

      if (response.success) {
        setFilteredCountries(response.data);
        setIsError(false);
        resetPageNumbers(response.data, setPageNumbers);
        setCountriesByPage(response.data, currentPage, setCurrentCountries);
      } else {
        setFilteredCountries(null);
        setIsError(true);
      }

      setIsLoading(false);
    }
  };

  return (
    <div className="dropdown_container">
      <div className="dropdown_opener">
        <button
          className="dropdown_openerButton"
          onClick={() => toggleDropdown()}
        >
          {selectedRegion ? (
            <span>{selectedRegion}</span>
          ) : (
            <>
              <span>Filter by region</span>
              <ArrowDown classNames="dropdown_openerIcon" />
            </>
          )}
        </button>
        {selectedRegion && (
          <button onClick={clearRegion} className="dropdown_openerClear">
            <CloseIcon classNames="dropdown_openerClearIcon" />
          </button>
        )}
      </div>
      <div
        className={classNames("dropdown_menu", {
          ["dropdown_menu__opened"]: isOpen,
          ["dropdown_menu__closed"]: !isOpen,
        })}
        aria-label="Menu dropdown para seleção de regiões"
      >
        <ul
          role="listbox"
          aria-label="Lista de regiões"
          className="dropdown_list"
        >
          {regions.map((region) => {
            return (
              <li role="none" className="dropdown_item" key={region}>
                <button
                  role="option"
                  type="button"
                  tabIndex={-1}
                  className="dropdown_itemButton"
                  onClick={() => handleRegionChange(region)}
                >
                  {region}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
