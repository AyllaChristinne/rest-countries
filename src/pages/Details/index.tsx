import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { CountryType } from "../../types";
import { getCountryByFullName } from "../../services/countries";
import { formatPopulation } from "../../functions/formatPopulation";
import { formatCurrencies } from "../../functions/formatCurrencies";
import { formatLanguages } from "../../functions/formatLanguages";
import BorderButton from "../../components/borderButton";
import { LoadingOverlay } from "../../components/loadingOverlay";
import Container from "../../components/container";
import { NotFound } from "../../components/notFound";
import { Attribution } from "../../components/attribution";
import { BackIcon } from "../../components/icons/BackIcon";
import { formatCapitals } from "../../functions/formatCapitals";
import "./index.scss";

export default function Details() {
  const [country, setCountry] = useState<CountryType | null>(null);
  const { isError, setIsError, isLoading } = useAppContext();
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
      setCountry(null);
    }
  }, []);

  useEffect(() => {
    getCountryInfo();
  }, [location.pathname]);

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
              src={country.flags.svg}
              alt={`Bandeira de ${country.name.common}`}
              aria-label={`Bandeira de ${country.name.common}`}
              className="details_countryImg"
            />
            <div className="details_countryInfos">
              <h1 className="details_countryName">{country.name.common}</h1>

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
                  <span className="details_countryText">
                    {formatCapitals(country.capital)}
                  </span>
                </p>
              </div>
              <div className="details_countryInfo2">
                <p className="details_countryText__bold">
                  Timezones:{" "}
                  <span className="details_countryText">
                    {country.timezones}
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
      <Attribution classNames="details_attribution" />
    </Container>
  );
}
