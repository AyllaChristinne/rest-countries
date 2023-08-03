import { Fragment, useCallback, useEffect, useState } from 'react';
import Loading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import BorderButton from '../../components/BorderButton/BorderButton';
import Navbar from '../../components/Navbar/Navbar';
import { getCountryByName } from '../../services';
import { CountryType } from '../../types';
import { formatPop } from '../../utils/formatPop';
import { getCurrencies } from '../../utils/getCurrencies';
import { getLanguages } from '../../utils/getLanguages';
import './Details.css';
import { LoadingOverlay } from '../../components/LoadingOverlay/LoadingOverlay';

export default function Details() {
  const [country, setCountry] = useState<CountryType>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  
  const getCountryInfo = useCallback(async () => {
    let c = await getCountryByName(window.location.pathname.replace("/", ""));
    setCountry(c);
    setLoading(false);
  }, []);

  useEffect(() => {
    getCountryInfo();
  }, [getCountryByName]);

  return ( 
    <Fragment>
      <Navbar />
      <div className={`details-container ${localStorage.getItem("theme")}`}>
        <button onClick={() => navigate(-1)} className="details-country-back">Back</button>
        {loading ? (
          <Fragment>
            <LoadingOverlay />
          </Fragment>
        ) : country && (
          <div className="details-country">
              <img src={country?.flag} alt={`Bandeira de ${country.name}`} className="details-country-img"/>
              <div className="details-country-infos">
                <h1 className="country-name">{country.name}</h1>
                <div className="details-country-info">
                  <div className="details-country-info-1">
                    <p className="details-country-text">Native Name: <span>{country.nativeName}</span></p>
                    <p className="details-country-text">Population: <span>{formatPop(country.population)}</span></p>
                    <p className="details-country-text">Region: <span>{country.region}</span></p>
                    <p className="details-country-text">Sub Region: <span>{country.subregion}</span></p>
                    <p className="details-country-text">Capital: <span>{country.capital}</span></p>
                  </div>
                  <div className="details-country-info-2">
                    <p className="details-country-text">Top Level Domain: <span>{country.topLevelDomain}</span></p>
                    <p className="details-country-text">Currencies: <span>{getCurrencies(country?.currencies)}</span></p>
                    <p className="details-country-text">Languages: <span>{getLanguages(country?.languages)}</span></p>
                  </div>
                </div>
                <BorderButton borderCodes={country.borders}/>
              </div>
          </div>
        )}
      </div> 
    </Fragment>
  );
};