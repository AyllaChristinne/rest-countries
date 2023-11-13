import { useEffect, useState } from "react";
import { getAllCountries } from "../../services/getAllCountries";
import CountryCard from "./components/countryCard";
import SortOptions from "./components/sortOptions";
import { CountryType } from "../../types";
import { LoadingOverlay } from "../../components/loadingOverlay";
import Container from "../../components/container";
import { useAppContext } from "../../context/appContext";
import { NotFound } from "../../components/notFound";
import { PaginationBar } from "./components/paginationBar";
import { resetPageNumbers } from "../../functions/resetPageNumbers";
import { setCountriesByPage } from "../../functions/setCountriesByPage";
import { Attribution } from "../../components/attribution";
import "./index.scss";
import { CustomResponseType } from "../../services/types";

function Home() {
  const [isFadeOut, setIsFadeOut] = useState(false);
  const {
    isError,
    setIsError,
    isLoading,
    setIsLoading,
    setCountries,
    currentCountries,
    setCurrentCountries,
    pageNumbers,
    setPageNumbers,
    currentPage,
  } = useAppContext();

  const getCountries = async () => {
    setIsLoading(true);
    const response: CustomResponseType = await getAllCountries();
    if (response.success) {
      setCountries(response.data);
      resetPageNumbers(response.data, setPageNumbers);
      setCountriesByPage(response.data, currentPage, setCurrentCountries);
      setIsError(false);
    } else {
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <Container>
      <SortOptions />
      {isLoading && <LoadingOverlay />}
      {isError ? (
        <NotFound />
      ) : (
        <>
          {pageNumbers.length > 1 && (
            <PaginationBar setIsFadeOut={setIsFadeOut} />
          )}
          <div
            className={`countries_cards ${
              isFadeOut ? "fade__out" : "fade__in"
            }`}
          >
            {currentCountries &&
              currentCountries.map((country: CountryType) => {
                return (
                  <CountryCard
                    key={country.name.common}
                    flag={country.flags.svg}
                    altFlag={
                      country.flags.alt || `Bandeira de ${country.name.common}`
                    }
                    name={country.name.common}
                    pop={country.population}
                    region={country.region}
                    capital={country.capital}
                  />
                );
              })}
          </div>
          {pageNumbers.length > 1 && (
            <PaginationBar setIsFadeOut={setIsFadeOut} scrollToTop />
          )}
        </>
      )}
      <Attribution classNames="home_attribution" />
    </Container>
  );
}

export default Home;
