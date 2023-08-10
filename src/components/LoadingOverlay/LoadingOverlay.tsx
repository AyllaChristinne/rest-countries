import Loading from "react-loading";
import "./LoadingOverlay.scss";

export const LoadingOverlay = () => {
  return (
    <div className="loading-container">
      <Loading type="bubbles" color="#111517" className="loading-icon" />
    </div>
  );
};
