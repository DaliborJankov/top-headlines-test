import React from "react";
import { useSelector } from "react-redux";

import { AppState } from "../../../core";
import { isFailed, isLoaded, isLoading } from "../../../core/common/model";
import i18n from "../../../core/i18next";
import { useDeepTranslation } from "../../../utils/helper";
import { ArticlesNotFound } from "../../common/ArticlesNotFound";
import { Loader } from "../../common/Loader";
import { NewsThumbnailList } from "../../common/NewsThumbnailList/NewsThumbnailList";
import { ViewTemplate } from "../../common/ViewTemplate";

export const HomeView = () => {
  const articles = useSelector((state: AppState) => state.topHeadlinesArticles);
  const { t } = useDeepTranslation();

  return (
    <ViewTemplate title={`${t("HomeView.title")} ${t(`Language.${i18n.language}`)}:`}>
      {isFailed(articles) && <ArticlesNotFound text={t("HomeView.no-items")} />}

      {isLoaded(articles) && <NewsThumbnailList articles={articles.value} />}

      {isLoading(articles) && <Loader />}
    </ViewTemplate>
  );
};
