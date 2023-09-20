import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCountries } from "../../services/getAllCountries";
import CountryCard from "../../components/CountryCard/CountryCard";
import SortOptions from "../../components/SortOptions/SortOptions";
import { CountryType, CustomResponseType } from "../../types";
import { LoadingOverlay } from "../../components/LoadingOverlay/LoadingOverlay";
import Container from "../../components/Container/Container";
import { useAppContext } from "../../context/appContext";
import { NotFound } from "../../components/NotFound/NotFound";
import "./Home.scss";
import { Pagination } from "../../components/Pagination";

const COUNTRIES_PER_PAGE = 20;

function Home() {
  const {
    isError,
    setIsError,
    isLoading,
    setIsLoading,
    countries,
    setCountries,
    currentPage,
    pageNumbers,
    setPageNumbers,
  } = useAppContext();
  const [currentCountries, setCurrentCountries] = useState<Array<CountryType>>(
    []
  );

  const handlePagination = useCallback(() => {
    if (countries && countries.length > COUNTRIES_PER_PAGE) {
      const indexOfLastPost = currentPage * COUNTRIES_PER_PAGE;
      const indexOfFirstPost = indexOfLastPost - COUNTRIES_PER_PAGE;
      const pages = [];

      setCurrentCountries(countries?.slice(indexOfFirstPost, indexOfLastPost));

      for (
        let i = 1;
        i <= Math.ceil(countries.length / COUNTRIES_PER_PAGE);
        i++
      ) {
        pages.push(i);
      }
      setPageNumbers(pages);
    }
  }, [countries, pageNumbers, currentPage]);

  const getCountries = useCallback(async () => {
    const response: CustomResponseType = await getAllCountries();
    if (response.success) {
      setCountries(response.data);
    } else {
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    console.log("---- render ----");
    setIsLoading(true);
    getCountries();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log("---- render ----");
    handlePagination();
  }, [countries, currentPage]);

  return (
    <Container>
      <SortOptions />
      <Pagination />
      {isLoading ? (
        <LoadingOverlay />
      ) : isError ? (
        <NotFound />
      ) : (
        <div className="countries-cards">
          {currentCountries &&
            currentCountries.map((country: CountryType) => {
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
      <Pagination />
    </Container>
  );
}

export default Home;
