import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Category } from "../../../core/common";
import { isFailed, isLoaded, isLoading } from "../../../core/common/model";
import { useLanguagesContext } from "../../../core/contexts/LanguageContext";
import { useHeadlines } from "../../../core/hooks/useHeadlines";
import { useDeepTranslation } from "../../../utils/helper";
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
  const [articles, articlesSubject$] = useHeadlines();
  const { currentLanguage } = useLanguagesContext();

  useEffect(() => {
    articlesSubject$.current.next({ language: currentLanguage, category });
  }, [articlesSubject$, category, currentLanguage]);

  return (
    <ViewTemplate
      title={t("CategorySingleView.title", {
        category: t(`CategoriesView.${category}`),
        language: t(`Language.${currentLanguage}`),
      })}
    >
      {isFailed(articles) && (
        <ArticlesNotFound
          text={t("CategoriesView.error-message", {
            category: t(`CategoriesView.${category}`),
          })}
        />
      )}

      {isLoaded(articles) && <NewsThumbnailList {...{ articles: articles.value }} />}

      {isLoading(articles) && <Loader />}
    </ViewTemplate>
  );
};
