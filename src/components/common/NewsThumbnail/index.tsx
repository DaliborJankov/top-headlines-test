import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { SingleNewsContext } from "../../../core/contexts/SingleNewsContext";
import { TopHeadlinesArticle } from "../../../core/top-headlines";
import { useDeepTranslation } from "../../../utils/helper";

import "./NewsThumbnail.scss";

export interface NewsThumbnailProps {
  article: TopHeadlinesArticle;
  index: number;
}

export const NewsThumbnail: React.FC<NewsThumbnailProps> = ({ article, index }) => {
  const { setCurrentNews } = useContext(SingleNewsContext);
  const { t } = useDeepTranslation("NewsThumbnail");

  return (
    <article className="NewsThumbnail">
      <header className="NewsThumbnail__header">
        <h2 className="NewsThumbnail__title">{article.title}</h2>
      </header>
      <figure className="NewsThumbnail__figure">
        <img src={article.urlToImage} alt={article.title} className="NewsThumbnail__image" />
      </figure>
      <p className="NewsThumbnail__text">{article.description}</p>
      <div className="NewsThumbnail__action">
        <Link
          onClick={() => setCurrentNews(article)}
          className="NewsThumbnail__link"
          to={`news/${index + 1}`}
        >
          {t("more")}
          <span className="NewsThumbnail__icon" />
        </Link>
      </div>
    </article>
  );
};
