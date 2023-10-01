import { useEffect, useState } from "react";
import { getAllCountries } from "../../services/getAllCountries";
import CountryCard from "../../components/CountryCard/CountryCard";
import SortOptions from "../../components/SortOptions/SortOptions";
import { CountryType, CustomResponseType } from "../../types";
import { LoadingOverlay } from "../../components/LoadingOverlay/LoadingOverlay";
import Container from "../../components/Container/Container";
import { useAppContext } from "../../context/appContext";
import { NotFound } from "../../components/NotFound/NotFound";
import "./Home.scss";
import { PaginationBar } from "../../components/PaginationBar";

function Home() {
  const [isFadeOut, setIsFadeOut] = useState(false);
  const {
    countries,
    isError,
    setIsError,
    isLoading,
    setIsLoading,
    setCountries,
    currentCountries,
    pageNumbers,
    setPageNumbers,
  } = useAppContext();

  const getCountries = async () => {
    setIsLoading(true);
    const response: CustomResponseType = await getAllCountries();
    if (response.success) {
      setCountries(response.data);
      setIsError(false);
    } else {
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getCountries();
  }, []);

  console.log("pageNumbers", pageNumbers);
  console.log("currentCountries", currentCountries);

  return (
    <Container>
      <SortOptions />
      {isLoading ? (
        <LoadingOverlay />
      ) : isError ? (
        <NotFound />
      ) : (
        <>
          <PaginationBar setIsFadeOut={setIsFadeOut} />
          <div
            className={`countries-cards ${isFadeOut ? "fade-out" : "fade-in"}`}
          >
            {currentCountries &&
              currentCountries.map((country: CountryType) => {
                return (
                  <CountryCard
                    key={country.name}
                    flag={country.flag}
                    name={country.name}
                    pop={country.population}
                    region={country.region}
                    capital={country.capital}
                  />
                );
              })}
          </div>
          <PaginationBar setIsFadeOut={setIsFadeOut} scrollToTop />
        </>
      )}
    </Container>
  );
}

export default Home;
