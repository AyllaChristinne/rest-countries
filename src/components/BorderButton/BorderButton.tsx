import { useEffect, useState } from 'react';
import Loading from 'react-loading';
import { Link } from 'react-router-dom';
import { getBordersInfo } from '../../services';
import './BorderButton.css';

export type BorderType = {
  borderCodes: string[]
};

export default function BorderButton({ borderCodes }: BorderType) {
  const [borderCountries, setBorderCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

 async function fetchBorderCountries() {
    const countries = await getBordersInfo(borderCodes);
    setBorderCountries(countries);
    setLoading(false);
  }

  useEffect(() => {
    fetchBorderCountries();
  }, []);
  
  return (
    <div className="country-borders">
      <p className="country-borders-title">Border Countries:</p>
      {loading ? (
        <Loading type="spin" color="" className="loading-spinner-small" /> 
      ) : (
        <div  className="country-borders-buttons">
          {borderCountries.map((country) => (
            <Link 
              to={`${country.name}`} 
              key={country.alpha3Code}
              className="country-borders-button"
            >
              {country.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}