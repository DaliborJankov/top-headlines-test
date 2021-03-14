import classNames from "classnames";
import React from "react";

import { TopHeadlinesArticle } from "../../../core/top-headlines";
import { NewsThumbnail } from "../NewsThumbnail";

import "./NewsThumbnailList.scss";

interface NewsThumbnailListProps {
  articles: readonly TopHeadlinesArticle[];
  className?: string;
}

export const NewsThumbnailList: React.FC<NewsThumbnailListProps> = ({ articles, className }) => {
  return (
    <ul className={classNames("News__list", className)}>
      {articles.map((article, index: number) => {
        return (
          <li key={index} className="News__item">
            <NewsThumbnail {...{ article, index }} />
          </li>
        );
      })}
    </ul>
  );
};
