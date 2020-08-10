import React, { useEffect, useState } from "react";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

import { isFailed, isLoaded, isLoading } from "../../../core/common/model";
import { useHeadlinesPerQuery } from "../../../core/hooks";
import i18n, { defaultLanguage } from "../../../core/i18next";
import { isAllowedLanguage, useDeepTranslation } from "../../../utils/helper";
import { ArticlesNotFound } from "../../common/ArticlesNotFound";
import { Loader } from "../../common/Loader";
import { NewsThumbnailList } from "../../common/NewsThumbnailList/NewsThumbnailList";
import { ViewTemplate } from "../../common/ViewTemplate";
import { SearchField } from "./partials/SearchField";

export const SearchView = () => {
  const language = isAllowedLanguage(i18n.language) ? i18n.language : defaultLanguage;
  const [onSearch$] = useState(() => new Subject<string>());
  const [inputText, setInputText] = useState<string>("");
  const articles = useHeadlinesPerQuery(language, inputText);
  const { t } = useDeepTranslation();

  const handleChange = (e: string) => {
    onSearch$.next(e);
  };

  useEffect(() => {
    const subscription$ = onSearch$
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(value => setInputText(value.toLowerCase()));

    return () => {
      subscription$.unsubscribe();
    };
  }, [setInputText, onSearch$]);

  return (
    <ViewTemplate title={`${t("SearchView.title")} ${t(`Language.${i18n.language}`)}:`}>
      <SearchField {...{ handleChange }} />
      {isFailed(articles) && <ArticlesNotFound text={t(`SearchView.error-message`)} />}
      {isLoaded(articles) && (
        <>
          <NewsThumbnailList {...{ articles: articles.value }} />
          {articles.value.length === 0 && <ArticlesNotFound text={t("SearchView.no-items")} />}
        </>
      )}
      {isLoading(articles) && <Loader />}
    </ViewTemplate>
  );
};
