/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

const ErrorContext = React.createContext({
  isError: false,
  handleApiError: (error: Error) => {},
  resetError: () => {},
});

export const useError = () => {
  return useContext(ErrorContext);
};

export const ErrorProvider = ({ children }: IProps) => {
  const [isError, setIsError] = useState(false);

  const handleApiError = (error: Error) => {
    console.error("API error:", error);
    setIsError(true);
  };

  const resetError = () => {
    setIsError(false);
  };

  return (
    <ErrorContext.Provider value={{ isError, handleApiError, resetError }}>
      {children}
    </ErrorContext.Provider>
  );
};
