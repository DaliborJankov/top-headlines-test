import classNames from "classnames";
import React from "react";

import "./Loader.scss";

interface LoaderProps {
  show?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ show = true }) => {
  return (
    <div
      className={classNames(
        "Loader",
        `Loader${show ? "--visible" : "--hidden"}`
      )}
    >
      <span className="Loader__bounce Loader__bounce--1" />
      <span className="Loader__bounce Loader__bounce--2" />
      <span className="Loader__bounce Loader__bounce--3" />
    </div>
  );
};
