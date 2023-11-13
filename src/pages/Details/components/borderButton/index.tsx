import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "react-loading";
import { CountryType } from "../../../../types";
import { useAppContext } from "../../../../context/appContext";
import { getBorders } from "../../../../services/getBorders";
import "./index.scss";

type BorderType = {
  borderCodes: string[] | undefined;
};

export default function BorderButton({ borderCodes }: BorderType) {
  const [isLoadingBorders, setIsLoadingBorder] = useState<boolean>(true);
  const [borderCountries, setBorderCountries] = useState<Array<CountryType>>(
    []
  );
  const [hasNoBorders, setHasNoBorders] = useState<boolean>(false);
  const { setIsError } = useAppContext();

  async function fetchBorderCountries() {
    setIsLoadingBorder(true);
    if (!borderCodes) {
      setHasNoBorders(true);
    } else {
      const countries = await getBorders(borderCodes);
      setBorderCountries(countries);
      setIsError(false);
    }

    setIsLoadingBorder(false);
  }

  useEffect(() => {
    fetchBorderCountries();
  }, [borderCodes]);

  return (
    <div className="borders">
      <p className="borders_title">Border Countries:</p>
      {isLoadingBorders ? (
        <div className="bordersLoading_container">
          <Loading
            type="spin"
            color="var(--color-pagination--active)"
            width={24}
            height={24}
          />
        </div>
      ) : hasNoBorders ? (
        <span className="borders__none" data-testid="no-borders-message">
          This country has no borders.
        </span>
      ) : (
        <div className="borders_buttons">
          {borderCountries.map((country: CountryType) => (
            <Link
              to={`/${country.name.common}`}
              key={country.cca3}
              className="borders_button"
            >
              {country.name.common}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
