import searchIcon from '../../assets/icons/search.png';
import './SortOptions.css';

export default function SortOptions() {
  return(
    <div className="sort-options">
      <div className="search-input-div">
        <img className="search-icon" src={searchIcon} alt="Search pictogram"></img>
        <input 
          type="search" 
          className="search-input" 
          name="search" 
          placeholder="Search for a country..."
          
        />
      </div>
      <select className="region-select">
        <option disabled selected>Filter by region</option>
        <option>Africa</option>
        <option>America</option>
        <option>Asia</option>
        <option>Europe</option>
        <option>Oceania</option>
      </select>
    </div>
  );
}