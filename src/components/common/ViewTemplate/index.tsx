import classNames from "classnames";
import React from "react";

import "./ViewTemplate.scss";

interface ViewTemplateProps {
  title: string;
  className?: string;
}

export const ViewTemplate: React.FC<ViewTemplateProps> = ({
  title,
  className,
  children,
}) => {
  return (
    <div className={classNames("View", className)}>
      <div className="View__body">
        <header className="View__header">
          <h1 className="View__title">{title}</h1>
        </header>
        {children}
      </div>
    </div>
  );
};
