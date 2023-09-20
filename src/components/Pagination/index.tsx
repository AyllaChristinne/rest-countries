import cn from "classnames";
import "./index.scss";
import { ArrowRightIcon } from "../../assets/icons/ArrowRight";
import { ArrowLeftIcon } from "../../assets/icons/ArrowLeft";
import { useAppContext } from "../../context/appContext";

export const Pagination = () => {
  const { pageNumbers, currentPage, setCurrentPage } = useAppContext();
  const isFirstPage = currentPage === 1 ? true : false;
  const isLastPage = currentPage === 13 ? true : false;
  console.log(pageNumbers);

  return pageNumbers.length > 0 ? (
    <div className="pagination_container">
      <button
        className="pagination_button pagination_button__arrow"
        onClick={() => {
          if (!isFirstPage) {
            setCurrentPage(currentPage - 1);
          }
        }}
        disabled={isFirstPage}
      >
        <ArrowLeftIcon classNames="pagination_buttonIcon" />
      </button>
      {pageNumbers.map((number) => {
        return (
          <button
            key={number}
            className={cn("pagination_button pagination_button__number", {
              ["active"]: number === currentPage,
            })}
            onClick={() => {
              setCurrentPage(number);
            }}
          >
            {number}
          </button>
        );
      })}
      <button
        className="pagination_button pagination_button__arrow"
        onClick={() => {
          if (!isLastPage) {
            setCurrentPage(currentPage + 1);
          }
        }}
        disabled={isLastPage}
      >
        <ArrowRightIcon classNames="pagination_buttonIcon" />
      </button>
    </div>
  ) : null;
};
