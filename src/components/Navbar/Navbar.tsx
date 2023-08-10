import { useState } from "react";
import moonIcon from "../../assets/icons/moon.png";
import "./Navbar.scss";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  const switchTheme = (themeName: string) => {
    setTheme(themeName);
    localStorage.setItem("data-theme", themeName);
  };

  const toggleTheme = () => {
    if (localStorage.getItem("data-theme") === "theme-dark") {
      switchTheme("theme-light");
    } else {
      switchTheme("theme-dark");
    }
  };

  return (
    <nav className={`navbar ${theme}}`}>
      <Link to="/" className="navbar-text">
        Where in the world?
      </Link>
      <button className="darkMode-btn" onClick={toggleTheme}>
        <img
          className="darkMode-icon"
          src={moonIcon}
          alt="Moon pictogram"
        ></img>
        <span className="darkMode-text">Dark Mode</span>
      </button>
    </nav>
  );
}
