import { useState } from 'react';
import moonIcon from '../../assets/icons/moon.png';
import moonFullIcon from '../../assets/icons/moon-full.png';
import './Navbar.css';

export default function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem('theme'));

  const switchTheme = (themeName: string) => {
    setTheme(themeName);
    localStorage.setItem('theme', themeName);
  }

  const toggleTheme = () => {
    if (localStorage.getItem('theme') === 'theme-dark'){
      switchTheme('theme-light');
    } else {
      switchTheme('theme-dark');
    }
  }

  return (
    <nav className={`navbar ${localStorage.getItem('theme')}`}>
      <span className="navbar-text">Where in the world?</span>
      <button className="darkMode-btn" onClick={toggleTheme}>
        <img className="darkMode-icon" src={moonIcon} alt="Moon pictogram"></img>
        <span className="darkMode-text">Dark Mode</span>
      </button>
    </nav>
  );
}

