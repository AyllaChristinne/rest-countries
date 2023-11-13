import cn from "classnames";
import "./index.scss";

type AttributionType = {
  classNames?: string;
};

export const Attribution = ({ classNames }: AttributionType) => {
  return (
    <footer
      className={cn("attribution_container", {
        [`${classNames}`]: classNames,
      })}
    >
      <span className="attribution_text">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io/"
          target="_blank"
          rel="noreferrer"
          className="attribution_link"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a
          href="https://www.frontendmentor.io/profile/AyllaChristinne"
          target="_blank"
          rel="noreferrer"
          className="attribution_link"
        >
          Aylla Christinne
        </a>
      </span>
    </footer>
  );
};
