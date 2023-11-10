import Loading from "react-loading";
import "./index.scss";

export const LoadingOverlay = () => {
  return (
    <div className="loading_container">
      <Loading
        type="bubbles"
        color="var(--color-pagination--active)"
        className="loading_icon"
      />
    </div>
  );
};
