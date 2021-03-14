import React from "react";

import { Category } from "../../../core/common";
import { LoadableModel, isFailed, isLoaded, isLoading } from "../../../core/common/model";
import { useHeadlinesPerCategory } from "../../../core/hooks";
import i18n, { defaultLanguage } from "../../../core/i18next";
import { TopHeadlinesArticle } from "../../../core/top-headlines";
import { isAllowedLanguage, useDeepTranslation } from "../../../utils/helper";
import { ArticlesNotFound } from "../../common/ArticlesNotFound";
import { Loader } from "../../common/Loader";
import { ViewTemplate } from "../../common/ViewTemplate";
import { CategorySection } from "./partial/CategorySection";

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

  const articlesPerCategory: Record<Category, LoadableModel<readonly TopHeadlinesArticle[]>> = {
    entertainment: useHeadlinesPerCategory(language, "entertainment"),
    general: useHeadlinesPerCategory(language, "general"),
    health: useHeadlinesPerCategory(language, "health"),
    science: useHeadlinesPerCategory(language, "science"),
    sports: useHeadlinesPerCategory(language, "sports"),
    technology: useHeadlinesPerCategory(language, "technology"),
  } as const;

  const getCategorySection = (
    category: Category,
    articles: LoadableModel<readonly TopHeadlinesArticle[]>
  ) => {
    return (
      <>
        {isFailed(articles) && (
          <ArticlesNotFound
            text={t("error-message", {
              category: t(category),
            })}
          />
        )}
        {isLoaded(articles) ? (
          <CategorySection
            {...{
              category,
              articles: articles.value.slice(0, 5),
            }}
          />
        ) : (
          isLoading(articles) && <Loader />
        )}
      </>
    );
  };

  return (
    <ViewTemplate title={`${t("title")} ${i18n.language.toUpperCase()}:`}>
      <ul className="Category__list">
        {categories.map((category, index) => {
          return (
            <li key={index} className="Category__item">
              {getCategorySection(category, articlesPerCategory[category])}
            </li>
          );
        })}
      </ul>
    </ViewTemplate>
  );
};
