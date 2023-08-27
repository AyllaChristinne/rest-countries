import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../themeProvider/";
import "./Navbar.scss";
import { MoonIcon } from "../../assets/icons/MoonIcon";
import { MoonIconFilled } from "../../assets/icons/MoonIconFilled";

export default function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-text">
          Where in the world?
        </Link>
        <button
          type="button"
          value={theme}
          className="darkMode-btn"
          onClick={() =>
            theme === "light" ? setTheme("dark") : setTheme("light")
          }
        >
          {theme === "light" ? (
            <MoonIcon classNames="darkMode-icon" />
          ) : (
            <MoonIconFilled classNames="darkMode-icon" />
          )}
          <span className="darkMode-text">Dark Mode</span>
        </button>
      </div>
    </nav>
  );
}
