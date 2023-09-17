import React from "react";
import notFoundImg from "../../assets/img/notFound.png";
import "./NotFound.scss";
import { Link } from "react-router-dom";
import Container from "../Container/Container";

export const NotFound = () => {
  return (
    <Container>
      <img
        src={notFoundImg}
        alt="Imagem do número 404"
        aria-label="Imagem do número 404"
        className="notFound_image"
      />
      <div className="notFound_textContainer">
        <h1 className="notFound_text__big">Page not found!</h1>
        <p className="notFound_text">
          Don&apos;t worry. You can find plenty of other things on our{" "}
          <Link to="/" className="notFound_textLink">
            homepage
          </Link>
          .
        </p>
      </div>
    </Container>
  );
};
