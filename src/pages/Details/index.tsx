import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCountryByFullName } from "../../services/countries";
import BorderButton from "../../components/BorderButton";
import { CountryType } from "../../types";
import { formatPopulation } from "../../functions/formatPopulation";
import { formatCurrencies } from "../../functions/formatCurrencies";
import { formatLanguages } from "../../functions/formatLanguages";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { BackIcon } from "../../assets/icons/BackIcon";
import Container from "../../components/Container";
import { useAppContext } from "../../context/appContext";
import { NotFound } from "../../components/NotFound";
import "./index.scss";

export default function Details() {
  const [country, setCountry] = useState<CountryType>();
  const { isError, setIsError, isLoading, setIsLoading } = useAppContext();
  const navigate = useNavigate();

  const getCountryInfo = useCallback(async () => {
    const response = await getCountryByFullName(
      window.location.pathname.replace("/", "")
    );

    if (response.success) {
      setCountry(response.data[0]);
      setIsError(false);
    } else {
      setIsError(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getCountryInfo();
  }, []);

  useEffect(() => {
    if (country !== undefined) {
      setIsLoading(false);
    }
  }, [country]);

  return (
    <Container>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="details_backButton"
        aria-label="Go back"
      >
        <BackIcon classNames="details_backIcon" />
        Back
      </button>

      {isLoading ? (
        <LoadingOverlay />
      ) : isError ? (
        <NotFound />
      ) : (
        country && (
          <div className="details_country">
            <img
              src={country.flag}
              alt={`Bandeira de ${country.name}`}
              aria-label={`Bandeira de ${country.name}`}
              className="details_countryImg"
            />
            <div className="details_countryInfos">
              <h1 className="details_countryName">{country.name}</h1>

              <div className="details_countryInfo1">
                <p className="details_countryText__bold">
                  Native Name:{" "}
                  <span className="details_countryText">
                    {country.nativeName}
                  </span>
                </p>
                <p className="details_countryText__bold">
                  Population:{" "}
                  <span className="details_countryText">
                    {formatPopulation(country.population)}
                  </span>
                </p>
                <p className="details_countryText__bold">
                  Region:{" "}
                  <span className="details_countryText">{country.region}</span>
                </p>
                <p className="details_countryText__bold">
                  Sub Region:{" "}
                  <span className="details_countryText">
                    {country.subregion}
                  </span>
                </p>
                <p className="details_countryText__bold">
                  Capital:{" "}
                  <span className="details_countryText">{country.capital}</span>
                </p>
              </div>
              <div className="details_countryInfo2">
                <p className="details_countryText__bold">
                  Top Level Domain:{" "}
                  <span className="details_countryText">
                    {country.topLevelDomain}
                  </span>
                </p>
                <p className="details_countryText__bold">
                  Currencies:{" "}
                  <span className="details_countryText">
                    {formatCurrencies(country.currencies)}
                  </span>
                </p>
                <p className="details_countryText__bold">
                  Languages:{" "}
                  <span className="details_countryText">
                    {formatLanguages(country.languages)}
                  </span>
                </p>
              </div>
              <BorderButton borderCodes={country.borders} />
            </div>
          </div>
        )
      )}
    </Container>
  );
}
