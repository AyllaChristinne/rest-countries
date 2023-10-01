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
    setCurrentPage,
    setCurrentCountries,
    setPageNumbers,
  } = useAppContext();

  const isFirstPage = currentPage === 1 ? true : false;
  const isLastPage = currentPage === pageNumbers.length + 1 ? true : false;

  const handlePageChange = () => {
    if (countries) {
      setIsFadeOut(true);
      setTimeout(() => {
        setCountriesByPage(
          "paginationBar",
          countries,
          currentPage,
          setCurrentCountries
        );
        setIsFadeOut(false);
      }, 300);
    }
  };

  useEffect(() => {
    if (!currentCountries && countries && !isError) {
      resetPageNumbers(countries, setPageNumbers);
    } else if (currentCountries && !isError) {
      resetPageNumbers(currentCountries, setPageNumbers);
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
      >
        <ArrowRightIcon classNames="pagination_buttonIcon" />
      </button>
    </div>
  );
};
