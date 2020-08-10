import React from "react";
import { Link } from "react-router-dom";

import { Category } from "../../../core/common";
import { LoadableModel, isFailed, isLoaded, isLoading } from "../../../core/common/model";
import { useHeadlinesPerCategory } from "../../../core/hooks";
import i18n, { defaultLanguage } from "../../../core/i18next";
import { TopHeadlinesArticle } from "../../../core/top-headlines";
import { isAllowedLanguage, useDeepTranslation } from "../../../utils/helper";
import { ArticlesNotFound } from "../../common/ArticlesNotFound";
import { Loader } from "../../common/Loader";
import { ViewTemplate } from "../../common/ViewTemplate";

export const CategoriesView = () => {
  const categories: Category[] = [
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const { t } = useDeepTranslation("CategoriesView");

  const language = isAllowedLanguage(i18n.language) ? i18n.language : defaultLanguage;

  const entertainmentArticles = useHeadlinesPerCategory(language, "entertainment");
  const generalArticles = useHeadlinesPerCategory(language, "general");
  const healthArticles = useHeadlinesPerCategory(language, "health");
  const scienceArticles = useHeadlinesPerCategory(language, "science");
  const sportsArticles = useHeadlinesPerCategory(language, "sports");
  const technologyArticles = useHeadlinesPerCategory(language, "technology");

  const articlesPerCategory: Record<Category, LoadableModel<readonly TopHeadlinesArticle[]>> = {
    entertainment: entertainmentArticles,
    general: generalArticles,
    health: healthArticles,
    science: scienceArticles,
    sports: sportsArticles,
    technology: technologyArticles,
  } as const;

  return (
    <ViewTemplate title={`${t("title")} ${i18n.language.toUpperCase()}:`}>
      <ul className="Category__list">
        {categories.map((category, index) => {
          return (
            <li key={index} className="Category__item">
              {isFailed(articlesPerCategory[category]) && (
                <ArticlesNotFound
                  text={t(`error-message`, {
                    category: `${t(`${category}`)}`,
                  })}
                />
              )}
              {isLoaded(articlesPerCategory[category]) ? (
                <Link className="Category__link" to={`/category/${category}`}>
                  {t(category)}
                </Link>
              ) : (
                isLoading(articlesPerCategory[category]) && <Loader />
              )}
            </li>
          );
        })}
      </ul>
    </ViewTemplate>
  );
};
