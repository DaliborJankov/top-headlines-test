import React, { useEffect } from "react";

import { Category } from "../../../core/common";
import { LoadableModel, isFailed, isLoaded, isLoading } from "../../../core/common/model";
import { useLanguagesContext } from "../../../core/contexts/LanguageContext";
import { useHeadlines } from "../../../core/hooks/useHeadlines";
import { TopHeadlinesArticle } from "../../../core/top-headlines";
import { useDeepTranslation } from "../../../utils/helper";
import { ArticlesNotFound } from "../../common/ArticlesNotFound";
import { Loader } from "../../common/Loader";
import { ViewTemplate } from "../../common/ViewTemplate";
import { CategorySection } from "./partial/CategorySection";

export const CategoriesView = () => {
  const { t } = useDeepTranslation("CategoriesView");
  const { currentLanguage } = useLanguagesContext();
  const [entertainmentArticles, entertainmentSubject$] = useHeadlines();
  const [generalArticles, generalSubject$] = useHeadlines();
  const [healthArticles, healthSubject$] = useHeadlines();
  const [scienceArticles, scienceSubject$] = useHeadlines();
  const [sportsArticles, sportsSubject$] = useHeadlines();
  const [technologyArticles, technologySubject$] = useHeadlines();

  useEffect(() => {
    entertainmentSubject$.current.next({ language: currentLanguage, category: "entertainment" });
  }, [entertainmentSubject$, currentLanguage]);

  useEffect(() => {
    generalSubject$.current.next({ language: currentLanguage, category: "general" });
  }, [generalSubject$, currentLanguage]);

  useEffect(() => {
    healthSubject$.current.next({ language: currentLanguage, category: "health" });
  }, [healthSubject$, currentLanguage]);

  useEffect(() => {
    scienceSubject$.current.next({ language: currentLanguage, category: "science" });
  }, [scienceSubject$, currentLanguage]);

  useEffect(() => {
    sportsSubject$.current.next({ language: currentLanguage, category: "sports" });
  }, [sportsSubject$, currentLanguage]);

  useEffect(() => {
    technologySubject$.current.next({ language: currentLanguage, category: "technology" });
  }, [technologySubject$, currentLanguage]);

  const categories: Category[] = [
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const articlesPerCategory: Record<Category, LoadableModel<readonly TopHeadlinesArticle[]>> = {
    entertainment: entertainmentArticles,
    general: generalArticles,
    health: healthArticles,
    science: scienceArticles,
    sports: sportsArticles,
    technology: technologyArticles,
  } as const;

  const getCategorySection = (
    category: Category,
    articles: LoadableModel<readonly TopHeadlinesArticle[]>
  ) => {
    return (
      <>
        {isFailed(articles) && (
          <ArticlesNotFound
            text={t("error_message", {
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
    <ViewTemplate
      title={t("title", {
        language: currentLanguage.toUpperCase(),
      })}
    >
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
