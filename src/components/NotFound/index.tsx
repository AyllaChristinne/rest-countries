import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { handleClickHomepage } from "../../functions/handleClickHomepage";
import { useAppContext } from "../../context/appContext";
import { NotFoundImg } from "../../assets/img/notFoundImg";

export const NotFound = () => {
  const {
    setIsError,
    setCurrentPage,
    setFilteredCountries,
    setPageNumbers,
    currentPage,
    setCurrentCountries,
    countries,
  } = useAppContext();
  return (
    <div className="notFound_container">
      <NotFoundImg classNames="notFound_image" />
      <div className="notFound_textContainer">
        <h1 className="notFound_text__big">Page not found!</h1>
        <p className="notFound_text">
          Don&apos;t worry. You can find plenty of other things on our{" "}
          <Link
            to="/"
            className="notFound_text__link"
            onClick={() =>
              handleClickHomepage(
                setIsError,
                setCurrentPage,
                setFilteredCountries,
                setPageNumbers,
                currentPage,
                setCurrentCountries,
                countries
              )
            }
          >
            homepage
          </Link>
          .
        </p>
      </div>
    </div>
  );
};
