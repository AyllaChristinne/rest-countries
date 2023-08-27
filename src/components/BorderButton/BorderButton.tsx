import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoadingOverlay } from "../LoadingOverlay/LoadingOverlay";
import { getBordersInfo } from "../../services";
import "./BorderButton.scss";
import { CountryType } from "../../types";

export type BorderType = {
  borderCodes: string[];
};

export default function BorderButton({ borderCodes }: BorderType) {
  const [borderCountries, setBorderCountries] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasNoBorders, setHasNoBorders] = useState<boolean>(false);

  async function fetchBorderCountries() {
    if (borderCodes) {
      const countries = await getBordersInfo(borderCodes);
      setBorderCountries(countries);
    } else {
      setHasNoBorders(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchBorderCountries();

    return () => {
      setHasNoBorders(false);
    };
  }, []);

  return (
    <div className="country-borders">
      <p className="country-borders-title">Border Countries:</p>
      {loading ? (
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
