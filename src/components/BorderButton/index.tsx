import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoadingOverlay } from "../LoadingOverlay";
import { getBorders } from "../../services/getBorders";
import "./index.scss";
import { CountryType } from "../../types";
import { useAppContext } from "../../context/appContext";

export type BorderType = {
  borderCodes: string[];
};

export default function BorderButton({ borderCodes }: BorderType) {
  const [borderCountries, setBorderCountries] = useState([]);
  const [hasNoBorders, setHasNoBorders] = useState<boolean>(false);
  const { isLoading, setIsLoading, setIsError } = useAppContext();

  async function fetchBorderCountries() {
    if (borderCodes) {
      const countries = await getBorders(borderCodes);
      setBorderCountries(countries);
      setIsError(false);
    } else {
      setHasNoBorders(true);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchBorderCountries();

    return () => {
      setHasNoBorders(false);
    };
  }, []);

  return (
    <div className="borders">
      <p className="borders_title">Border Countries:</p>
      {isLoading ? (
        <LoadingOverlay />
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
