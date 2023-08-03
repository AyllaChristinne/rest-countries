import Loading from "react-loading";
import "./LoadingOverlay.css";

export const LoadingOverlay = () => {
  return(
    <div className="loading-container">
      <Loading type="bubbles" color="#111517" className="loading-icon" /> 
    </div>
  )
}