import Loading from "react-loading";
import "./index.scss";

export const LoadingOverlay = () => {
  return (
    <div className="loading-container">
      <Loading type="bubbles" color="#111517" className="loading-icon" />
    </div>
  );
};
