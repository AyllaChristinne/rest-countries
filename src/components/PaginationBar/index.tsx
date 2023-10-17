import cn from "classnames";
import { ArrowLeftIcon } from "../../assets/icons/ArrowLeft";
import { ArrowRightIcon } from "../../assets/icons/ArrowRight";
import { useAppContext } from "../../context/appContext";
import "./index.scss";
import { setCountriesByPage } from "../../functions/setCountriesByPage";
import { useEffect } from "react";
import { resetPageNumbers } from "../../functions/resetPageNumbers";

type PaginationBarProps = {
  setIsFadeOut: React.Dispatch<React.SetStateAction<boolean>>;
  scrollToTop?: boolean;
};

export const PaginationBar = ({
  setIsFadeOut,
  scrollToTop,
}: PaginationBarProps) => {
  const {
    isError,
    currentCountries,
    countries,
    pageNumbers,
    currentPage,
    filteredCountries,
    setCurrentPage,
    setCurrentCountries,
    setPageNumbers,
  } = useAppContext();

  const isFirstPage = currentPage === 1 ? true : false;
  const isLastPage = currentPage === pageNumbers.length ? true : false;

  const handlePageChange = () => {
    setIsFadeOut(true);
    if (filteredCountries) {
      setTimeout(() => {
        setCountriesByPage(filteredCountries, currentPage, setCurrentCountries);
        setIsFadeOut(false);
      }, 300);
    } else if (countries) {
      setTimeout(() => {
        setCountriesByPage(countries, currentPage, setCurrentCountries);
        setIsFadeOut(false);
      }, 300);
    }
  };

  useEffect(() => {
    if (!filteredCountries && !currentCountries && countries && !isError) {
      resetPageNumbers(countries, setPageNumbers);
    } else if (filteredCountries && !isError) {
      resetPageNumbers(filteredCountries, setPageNumbers);
    }
  }, []);

  useEffect(() => {
    handlePageChange();
  }, [currentPage]);

  const handleClickNumber = (number: number) => {
    setCurrentPage(number);
    scrollToTop && window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleClickArrow = (direction: "left" | "right") => {
    direction === "left"
      ? setCurrentPage(currentPage - 1)
      : direction === "right" && setCurrentPage(currentPage + 1);
    scrollToTop && window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className="pagination_container">
      <button
        className="pagination_button pagination_button__arrow"
        onClick={() => {
          handleClickArrow("left");
        }}
        disabled={isFirstPage}
        tabIndex={isFirstPage ? -1 : 0}
      >
        <ArrowLeftIcon classNames="pagination_buttonIcon" />
      </button>
      {pageNumbers.map((number) => {
        return (
          <button
            key={number}
            className={cn("pagination_button pagination_button__number", {
              ["active"]: number === currentPage,
            })}
            onClick={() => {
              handleClickNumber(number);
            }}
          >
            {number}
          </button>
        );
      })}
      <button
        className="pagination_button pagination_button__arrow"
        onClick={() => {
          handleClickArrow("right");
        }}
        disabled={isLastPage}
        tabIndex={isLastPage ? -1 : 0}
      >
        <ArrowRightIcon classNames="pagination_buttonIcon" />
      </button>
    </div>
  );
};
