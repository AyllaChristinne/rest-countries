import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "react-loading";
import { CountryType } from "../../types";
import { useAppContext } from "../../context/appContext";
import { getBorders } from "../../services/countries";
import "./index.scss";

type BorderType = {
  borderCodes: string[];
};

export default function BorderButton({ borderCodes }: BorderType) {
  const [isLoadingBorders, setIsLoadingBorder] = useState<boolean>(true);
  const [borderCountries, setBorderCountries] = useState([]);
  const [hasNoBorders, setHasNoBorders] = useState<boolean>(false);
  const { setIsError } = useAppContext();

  async function fetchBorderCountries() {
    if (borderCodes) {
      const countries = await getBorders(borderCodes);
      setBorderCountries(countries);
      setIsError(false);
    } else {
      setHasNoBorders(true);
    }
    setIsLoadingBorder(false);
  }

  useEffect(() => {
    setIsLoadingBorder(true);
    fetchBorderCountries();

    return () => {
      setHasNoBorders(false);
    };
  }, []);

  return (
    <div className="borders">
      <p className="borders_title">Border Countries:</p>
      {isLoadingBorders ? (
        <div className="bordersLoading_container">
          <Loading
            type="spin"
            color="#111517"
            className="bordersLoading_icon"
          />
        </div>
      ) : hasNoBorders ? (
        <span className="borders__none">This country has no borders.</span>
      ) : (
        <div className="borders_buttons">
          {borderCountries.map((country: CountryType) => (
            <Link
              to={`/${country.name}`}
              key={country.alpha3Code}
              className="borders_button"
            >
              {country.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
