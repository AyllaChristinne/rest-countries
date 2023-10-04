import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BorderButton from "../../components/BorderButton";
import { CountryType } from "../../types";
import { formatPopulation } from "../../functions/formatPopulation";
import { getCurrencies } from "../../functions/getCurrencies";
import { getLanguages } from "../../functions/getLanguages";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { BackIcon } from "../../assets/icons/BackIcon";
import Container from "../../components/Container";
import { useAppContext } from "../../context/appContext";
import { NotFound } from "../../components/NotFound";
import { getCountryByFullName } from "../../services/getCountryByFullName";
import "./index.scss";

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
              src={country[0].flag}
              alt={`Bandeira de ${country[0].name}`}
              aria-label={`Bandeira de ${country[0].name}`}
              className="details_countryImg"
            />
            <div className="details_countryInfos">
              <h1 className="details_countryName">{country[0].name}</h1>

              <div className="details_countryInfo1">
                <p className="details_countryText__bold">
                  Native Name:{" "}
                  <span className="details_countryText">
                    {country[0].nativeName}
                  </span>
                </p>
                <p className="details_countryText__bold">
                  Population:{" "}
                  <span className="details_countryText">
                    {formatPopulation(country[0].population)}
                  </span>
                </p>
                <p className="details_countryText__bold">
                  Region:{" "}
                  <span className="details_countryText">
                    {country[0].region}
                  </span>
                </p>
                <p className="details_countryText__bold">
                  Sub Region:{" "}
                  <span className="details_countryText">
                    {country[0].subregion}
                  </span>
                </p>
                <p className="details_countryText__bold">
                  Capital:{" "}
                  <span className="details_countryText">
                    {country[0].capital}
                  </span>
                </p>
              </div>
              <div className="details_countryInfo2">
                <p className="details_countryText__bold">
                  Top Level Domain:{" "}
                  <span className="details_countryText">
                    {country[0].topLevelDomain}
                  </span>
                </p>
                <p className="details_countryText__bold">
                  Currencies:{" "}
                  <span className="details_countryText">
                    {getCurrencies(country[0].currencies)}
                  </span>
                </p>
                <p className="details_countryText__bold">
                  Languages:{" "}
                  <span className="details_countryText">
                    {getLanguages(country[0].languages)}
                  </span>
                </p>
              </div>
              <BorderButton borderCodes={country[0].borders} />
            </div>
          </div>
        )
      )}
    </Container>
  );
}
