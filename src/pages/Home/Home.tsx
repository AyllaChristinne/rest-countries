import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCountries } from "../../services/getAllCountries";
import CountryCard from "../../components/CountryCard/CountryCard";
import SortOptions from "../../components/SortOptions/SortOptions";
import { CountryType } from "../../types";
import { LoadingOverlay } from "../../components/LoadingOverlay/LoadingOverlay";
import "./Home.scss";
import Container from "../../components/Container/Container";
import { useAppContext } from "../../context/appContext";
import { NotFound } from "../../components/NotFound/NotFound";

function Home() {
  const { isError, isLoading, setIsLoading, countries, setCountries } =
    useAppContext();

  const getCountries = useCallback(async () => {
    const c = await getAllCountries();
    setCountries(c);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <Container>
      <SortOptions />
      {isLoading ? (
        <LoadingOverlay />
      ) : isError ? (
        <NotFound />
      ) : (
        <div className="countries-cards">
          {countries &&
            countries.map((country: CountryType) => {
              return (
                <Link
                  to={`${country.name}`}
                  key={country.name}
                  state={{ name: country.name }}
                >
                  <CountryCard
                    flag={country.flag}
                    name={country.name}
                    pop={country.population}
                    region={country.region}
                    capital={country.capital}
                  />
                </Link>
              );
            })}
        </div>
      )}
    </Container>
  );
}

export default Home;
