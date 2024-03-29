import classNames from "classnames";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Category } from "../../../../core/common";
import { useDeepTranslation } from "../../../../core/hooks/useDeepTranslation";
import { TopHeadlinesArticle } from "../../../../core/top-headlines";
import { NewsThumbnail } from "../../../common/NewsThumbnail";
import { NewsThumbnailList } from "../../../common/NewsThumbnailList/NewsThumbnailList";
import { Slider } from "../../../common/Slider";

import "./CategorySection.scss";

interface CategorySectionProps {
  category: Category;
  articles: readonly TopHeadlinesArticle[];
}

export const CategorySection: React.FC<CategorySectionProps> = ({ category, articles }) => {
  const { t } = useDeepTranslation("CategoriesView");
  const [categoryExpanded, setCategoryExpanded] = useState(false);

  return (
    <div className="Category__single">
      <div className="Category__info">
        <Link className="Category__link" to={`/category/${category}`}>
          {t(category)}
        </Link>

        <button
          onClick={() => setCategoryExpanded(!categoryExpanded)}
          className="Category__expand-button"
        >
          <span
            className={classNames(
              "Category__expand-icon",
              categoryExpanded && "Category__expand-icon--expanded"
            )}
          />
        </button>
      </div>

      {categoryExpanded ? (
        <NewsThumbnailList {...{ articles }} />
      ) : (
        <Slider
          responsive={{
            768: 2,
            1280: 3,
          }}
        >
          {articles.map((article, index) => (
            <NewsThumbnail key={index} {...{ article, index }} />
          ))}
        </Slider>
      )}
    </div>
  );
};
