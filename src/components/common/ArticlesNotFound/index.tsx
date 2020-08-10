import React from "react";

interface ArticlesNotFoundProps {
  text: string;
}

export const ArticlesNotFound: React.FC<ArticlesNotFoundProps> = ({ text }) => {
  return (
    <div className="ArticlesNotFound">
      <p className="ArticlesNotFound__text">{text}</p>
    </div>
  );
};
