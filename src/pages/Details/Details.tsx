import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BorderButton from "../../components/BorderButton/BorderButton";
import { CountryType } from "../../types";
import { formatPopulation } from "../../functions/formatPopulation";
import { getCurrencies } from "../../functions/getCurrencies";
import { getLanguages } from "../../functions/getLanguages";
import { LoadingOverlay } from "../../components/LoadingOverlay/LoadingOverlay";
import { BackIcon } from "../../assets/icons/BackIcon";
import Container from "../../components/Container/Container";
import { useAppContext } from "../../context/appContext";
import { NotFound } from "../../components/NotFound/NotFound";
import { getCountryByFullName } from "../../services/getCountryByFullName";
import "./Details.scss";

export default function Details() {
  const [country, setCountry] = useState<Array<CountryType>>();
  const navigate = useNavigate();
  const { isError, setIsError, isLoading, setIsLoading } = useAppContext();

  const getCountryInfo = useCallback(async () => {
    const response = await getCountryByFullName(
      window.location.pathname.replace("/", "")
    );

    if (response.success) {
      setCountry(response.data);
      setIsError(false);
    } else {
      setIsError(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    getCountryInfo();
  }, [getCountryByFullName]);

  useEffect(() => {
    if (country !== undefined) {
      setIsLoading(false);
    }
  }, [country]);

  return (
    <Container>
      <div className="details-content">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="details-country-back"
        >
          <BackIcon classNames="details-country-back-icon" />
          Back
        </button>

        {isLoading ? (
          <LoadingOverlay />
        ) : isError ? (
          <NotFound />
        ) : (
          country && (
            <div className="details-country">
              <img
                src={country[0].flag}
                alt={`Bandeira de ${country[0].name}`}
                aria-label={`Bandeira de ${country[0].name}`}
                className="details-country-img"
              />
              <div className="details-country-infos">
                <h1 className="country-name">{country[0].name}</h1>
                <div className="details-country-info">
                  <div className="details-country-info-1">
                    <p className="details-country-text">
                      Native Name: <span>{country[0].nativeName}</span>
                    </p>
                    <p className="details-country-text">
                      Population:{" "}
                      <span>{formatPopulation(country[0].population)}</span>
                    </p>
                    <p className="details-country-text">
                      Region: <span>{country[0].region}</span>
                    </p>
                    <p className="details-country-text">
                      Sub Region: <span>{country[0].subregion}</span>
                    </p>
                    <p className="details-country-text">
                      Capital: <span>{country[0].capital}</span>
                    </p>
                  </div>
                  <div className="details-country-info-2">
                    <p className="details-country-text">
                      Top Level Domain: <span>{country[0].topLevelDomain}</span>
                    </p>
                    <p className="details-country-text">
                      Currencies:{" "}
                      <span>{getCurrencies(country[0].currencies)}</span>
                    </p>
                    <p className="details-country-text">
                      Languages:{" "}
                      <span>{getLanguages(country[0].languages)}</span>
                    </p>
                  </div>
                </div>
                <BorderButton borderCodes={country[0].borders} />
              </div>
            </div>
          )
        )}
      </div>
    </Container>
  );
}
