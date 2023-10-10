import { Link } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { MoonIcon } from "../../assets/icons/MoonIcon";
import { MoonIconFilled } from "../../assets/icons/MoonIconFilled";
import "./index.scss";
import { handleClickHomepage } from "../../functions/handleClickHomepage";

export default function Navbar() {
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
    <nav className="navbar_container">
      <div className="navbar_content">
        <Link
          to="/"
          className="navbar_text"
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
          value={theme}
          className="navbar_themeBtn"
          onClick={() =>
            theme === "light" ? setTheme("dark") : setTheme("light")
          }
        >
          {theme === "light" ? (
            <MoonIcon classNames="navbar_themeIcon" />
          ) : (
            <MoonIconFilled classNames="navbar_themeIcon" />
          )}
          <span className="navbar_themeText">Dark Mode</span>
        </button>
      </div>
    </nav>
  );
}
