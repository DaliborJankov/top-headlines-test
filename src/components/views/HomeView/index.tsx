import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "../../../core";
import { isFailed, isLoaded, isLoading } from "../../../core/common/model";
import { useLanguagesContext } from "../../../core/contexts/LanguageContext";
import { useDeepTranslation } from "../../../core/hooks/useDeepTranslation";
import { getTopHeadlines } from "../../../core/top-headlines";
import { ArticlesNotFound } from "../../common/ArticlesNotFound";
import { Loader } from "../../common/Loader";
import { NewsThumbnailList } from "../../common/NewsThumbnailList/NewsThumbnailList";
import { ViewTemplate } from "../../common/ViewTemplate";

export const HomeView = () => {
  const { t } = useDeepTranslation("HomeView");
  const dispatch = useDispatch();
  const { currentLanguage } = useLanguagesContext();
  const articles = useSelector((state: AppState) => state.topHeadlinesArticles);

  useEffect(() => {
    dispatch(getTopHeadlines({ language: currentLanguage }));
  }, [currentLanguage, dispatch]);

  return (
    <ViewTemplate
      title={t("title", {
        language: currentLanguage.toUpperCase(),
      })}
    >
      {isFailed(articles) && <ArticlesNotFound text={t("no_items")} />}

      {isLoaded(articles) && <NewsThumbnailList articles={articles.value} />}

      {isLoading(articles) && <Loader />}
    </ViewTemplate>
  );
};
