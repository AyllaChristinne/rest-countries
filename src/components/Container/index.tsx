import { ReactNode } from "react";
import "./index.scss";

interface IContainer {
  children: ReactNode;
}

const Container = ({ children }: IContainer) => (
  <div className="container">
    <div className="grid">{children}</div>
  </div>
);

export default Container;
