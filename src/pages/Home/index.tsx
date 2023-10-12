import { useEffect, useState } from "react";
import { getAllCountries } from "../../services/countries";
import CountryCard from "../../components/CountryCard";
import SortOptions from "../../components/SortOptions";
import { CountryType, CustomResponseType } from "../../types";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import Container from "../../components/Container";
import { useAppContext } from "../../context/appContext";
import { NotFound } from "../../components/NotFound";
import { PaginationBar } from "../../components/PaginationBar";
import { resetPageNumbers } from "../../functions/resetPageNumbers";
import { setCountriesByPage } from "../../functions/setCountriesByPage";
import "./index.scss";

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
    filteredCountries,
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
      {isLoading ? (
        <LoadingOverlay />
      ) : isError ? (
        <NotFound />
      ) : (
        <>
          {pageNumbers.length > 1 && (
            <PaginationBar setIsFadeOut={setIsFadeOut} />
          )}
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
          {pageNumbers.length > 1 && (
            <PaginationBar setIsFadeOut={setIsFadeOut} scrollToTop />
          )}
        </>
      )}
    </Container>
  );
}

export default Home;
