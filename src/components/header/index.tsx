import { Link } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { handleClickHomepage } from "../../functions/handleClickHomepage";
import { MoonIcon } from "../../assets/icons/MoonIcon";
import { MoonIconFilled } from "../../assets/icons/MoonIconFilled";
import "./index.scss";

export default function Header() {
  const {
    theme,
    setTheme,
    setIsError,
    setCurrentPage,
    setFilteredCountries,
    setPageNumbers,
    currentPage,
    setCurrentCountries,
    countries,
  } = useAppContext();

  return (
    <header className="header_container">
      <div className="header_content">
        <Link
          to="/rest-countries"
          className="header_text"
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
          Where in the world?
        </Link>
        <button
          type="button"
          aria-label="Switch color theme"
          value={theme}
          className="header_themeBtn"
          onClick={() => {
            if (theme === "light") {
              setTheme("dark");
              localStorage.setItem("rest-countries/theme", "dark");
            } else {
              setTheme("light");
              localStorage.setItem("rest-countries/theme", "light");
            }
          }}
        >
          {theme === "light" ? (
            <>
              <MoonIcon classNames="header_themeIcon" />
              <span className="header_themeText">Dark Mode</span>
            </>
          ) : (
            <>
              <MoonIconFilled classNames="header_themeIcon" />
              <span className="header_themeText">Light Mode</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
