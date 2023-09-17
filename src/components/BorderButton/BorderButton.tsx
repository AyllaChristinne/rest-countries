import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoadingOverlay } from "../LoadingOverlay/LoadingOverlay";
import { getBorders } from "../../services/getBorders";
import "./BorderButton.scss";
import { CountryType } from "../../types";
import { useAppContext } from "../../context/appContext";

export type BorderType = {
  borderCodes: string[];
};

export default function BorderButton({ borderCodes }: BorderType) {
  const [borderCountries, setBorderCountries] = useState([]);
  const [hasNoBorders, setHasNoBorders] = useState<boolean>(false);
  const { isLoading, setIsLoading } = useAppContext();

  async function fetchBorderCountries() {
    if (borderCodes) {
      const countries = await getBorders(borderCodes);
      setBorderCountries(countries);
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
    <div className="country-borders">
      <p className="country-borders-title">Border Countries:</p>
      {isLoading ? (
        <LoadingOverlay />
      ) : hasNoBorders ? (
        <span className="country-borders-none">
          This country has no borders.
        </span>
      ) : (
        <div className="country-borders-buttons">
          {borderCountries.map((country: CountryType) => (
            <Link
              to={`/${country.name}`}
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
