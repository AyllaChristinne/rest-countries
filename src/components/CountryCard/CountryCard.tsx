import React from "react";
import { CountryCardProps } from "../../types";
import { formatPopulation } from "../../functions/formatPopulation";
import "./CountryCard.scss";

const CountryCard: React.FC<CountryCardProps> = ({
  flag,
  name,
  pop,
  region,
  capital,
}) => {
  return (
    <div className="country-card">
      <img src={flag} alt="country flag" />
      <div className="country-info">
        <p className="country-name">{name}</p>
        <p className="country-pop">
          Population: <span>{formatPopulation(pop)}</span>
        </p>
        <p className="country-region">
          Region: <span>{region}</span>
        </p>
        <p className="country-capital">
          Capital: <span>{capital}</span>
        </p>
      </div>
    </div>
  );
};

export default CountryCard;
