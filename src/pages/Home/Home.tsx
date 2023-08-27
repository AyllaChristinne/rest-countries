import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCountries } from "../../services";
import CountryCard from "../../components/CountryCard/CountryCard";
import SortOptions from "../../components/SortOptions/SortOptions";
import { CountryType } from "../../types";
import { LoadingOverlay } from "../../components/LoadingOverlay/LoadingOverlay";
import "./Home.scss";
import Container from "../../components/Container/Container";

function Home() {
  const [countries, setCountries] = useState<Array<CountryType>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getCountries = useCallback(async () => {
    const c = await getAllCountries();
    setCountries(c);
    setLoading(false);
  }, []);

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <Container>
      {loading ? (
        <LoadingOverlay />
      ) : (
        <>
          <SortOptions setCountries={setCountries} setLoading={setLoading} />
          <div className="countries-cards">
            {countries.map((country: CountryType) => {
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
        </>
      )}
    </Container>
  );
}

export default Home;
