import { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useAppContext } from "../../context/appContext";
import { resetPageNumbers } from "../../functions/resetPageNumbers";
import { setCountriesByPage } from "../../functions/setCountriesByPage";
import { getCountriesByRegion } from "../../services/getCountriesByRegion";
import { handleKeyDown } from "./handleKeyDown";
import { ArrowDown } from "../icons/ArrowDown";
import { CloseIcon } from "../icons/CloseIcon";
import "./index.scss";

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
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const {
    countries,
    currentPage,
    setCurrentCountries,
    setIsLoading,
    setFilteredCountries,
    setIsError,
    setCurrentPage,
    setPageNumbers,
  } = useAppContext();

  const keyDown = useCallback(
    (event: KeyboardEvent) => {
      handleKeyDown(event, setIsOpen, menuRef);
    },
    [setIsOpen]
  );

  const toggleDropdown = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const clearRegion = () => {
    setIsLoading(true);
    setCurrentPage(1);
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
    setCurrentPage(1);

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

  useEffect(() => {
    const dropdown = buttonRef.current;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        isOpen &&
        !buttonRef.current?.contains(e.target as Node) &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      dropdown?.addEventListener("keydown", keyDown);
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      dropdown?.removeEventListener("keydown", keyDown);
    };
  }, [setIsOpen, isOpen, keyDown]);

  return (
    <div className="dropdown_container">
      <div
        className="dropdown_opener"
        tabIndex={0}
        role="button"
        ref={buttonRef}
        onClick={() => toggleDropdown()}
        onKeyDown={(e: React.KeyboardEvent | undefined) => {
          if (e?.key === "Enter") {
            setIsOpen(true);
          }
        }}
      >
        <button
          className="dropdown_openerButton"
          tabIndex={-1}
          data-testid="dropdown_openerButton"
        >
          {selectedRegion ? (
            selectedRegion
          ) : (
            <>
              Filter by region
              <ArrowDown classNames="dropdown_openerIcon" />
            </>
          )}
        </button>
        {selectedRegion && (
          <button
            onClick={clearRegion}
            className="dropdown_openerClear"
            data-testid="clear_dropdown"
          >
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
        data-testid="dropdown_menu"
        ref={menuRef}
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
                  aria-label={region}
                  data-item="dropdown-item"
                  aria-selected={selectedRegion === region}
                  className="dropdown_itemButton"
                  onClick={() => handleRegionChange(region)}
                  onKeyDown={() => handleRegionChange(region)}
                  onMouseDown={(e) => e.preventDefault()}
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
