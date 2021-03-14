import React from "react";
import { useParams } from "react-router-dom";

import { Category } from "../../../core/common";
import { isFailed, isLoaded, isLoading } from "../../../core/common/model";
import { useHeadlinesPerCategory } from "../../../core/hooks";
import i18n, { defaultLanguage } from "../../../core/i18next";
import { isAllowedLanguage, useDeepTranslation } from "../../../utils/helper";
import { ArticlesNotFound } from "../../common/ArticlesNotFound";
import { Loader } from "../../common/Loader";
import { NewsThumbnailList } from "../../common/NewsThumbnailList/NewsThumbnailList";
import { ViewTemplate } from "../../common/ViewTemplate";

interface RouteParams {
  category: Category;
}

export const CategorySingleView = () => {
  const { category } = useParams<RouteParams>();
  const { t } = useDeepTranslation();

  const language = isAllowedLanguage(i18n.language) ? i18n.language : defaultLanguage;

  const articles = useHeadlinesPerCategory(language, category);

  return (
    <ViewTemplate
      title={`${t(`CategorySingleView.title`, {
        category: `${t(`CategoriesView.${category}`)}`,
      })} ${t(`Language.${i18n.language}`)}:`}
    >
      {isFailed(articles) && (
        <ArticlesNotFound
          text={t(`CategoriesView.error-message`, {
            category: `${t(`CategoriesView.${category}`)}`,
          })}
        />
      )}
      {isLoaded(articles) ? (
        <NewsThumbnailList {...{ articles: articles.value }} />
      ) : (
        isLoading(articles) && <Loader />
      )}
    </ViewTemplate>
  );
};
