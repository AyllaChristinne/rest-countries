import React from "react";
import { CountryCardProps } from "../../types";
import { formatPopulation } from "../../functions/formatPopulation";
import "./index.scss";
import { Link } from "react-router-dom";

const CountryCard: React.FC<CountryCardProps> = ({
  flag,
  name,
  pop,
  region,
  capital,
}) => {
  return (
    <Link to={name} state={{ name: name }}>
      <div className="card">
        <img src={flag} alt={`Flag of ${name}`} className="card_image" />
        <div className="card_info">
          <p className="card_title">{name}</p>
          <p className="card_pop">
            Population:{" "}
            <span className="card_info__regular">{formatPopulation(pop)}</span>
          </p>
          <p className="card_region">
            Region: <span className="card_info__regular">{region}</span>
          </p>
          <p className="card_capital">
            Capital: <span className="card_info__regular">{capital}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
