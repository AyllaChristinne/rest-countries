import moonIcon from '../../assets/icons/moon.png';
import moonFullIcon from '../../assets/icons/moon-full.png';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-text">Where in the world?</span>
      <div className="darkMode-div" role="presentation">
        <img className="darkMode-icon" src={moonIcon} alt="Moon pictogram"></img>
        <span className="darkMode-text">Dark Mode</span>
      </div>
    </nav>
  );
}

