import React, { useEffect, useRef, useState } from "react";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

import { isFailed, isLoaded, isLoading } from "../../../core/common/model";
import { useLanguagesContext } from "../../../core/contexts/LanguageContext";
import { useHeadlines } from "../../../core/hooks/useHeadlines";
import { useDeepTranslation } from "../../../utils/helper";
import { ArticlesNotFound } from "../../common/ArticlesNotFound";
import { Loader } from "../../common/Loader";
import { NewsThumbnailList } from "../../common/NewsThumbnailList/NewsThumbnailList";
import { ViewTemplate } from "../../common/ViewTemplate";
import { SearchField } from "./partials/SearchField";

export const SearchView = () => {
  const { t } = useDeepTranslation();
  const [inputText, setInputText] = useState<string>("");
  const { currentLanguage } = useLanguagesContext();
  const onSearch$ = useRef(new Subject<string>());
  const [articles, articlesSubject$] = useHeadlines();

  const handleChange = (e: string) => {
    onSearch$.current.next(e);
  };

  useEffect(() => {
    articlesSubject$.current.next({ language: currentLanguage, query: inputText });
  }, [articlesSubject$, currentLanguage, inputText]);

  useEffect(() => {
    const subscription$ = onSearch$.current
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(value => setInputText(value.toLowerCase()));

    return () => {
      subscription$.unsubscribe();
    };
  }, []);

  return (
    <ViewTemplate
      title={t("SearchView.title", {
        language: t(`Language.${currentLanguage}`),
      })}
    >
      <SearchField {...{ handleChange }} />

      {isFailed(articles) && <ArticlesNotFound text={t(`SearchView.error_message`)} />}

      {isLoaded(articles) && (
        <>
          <NewsThumbnailList {...{ articles: articles.value }} />
          {articles.value.length === 0 && <ArticlesNotFound text={t("SearchView.no_items")} />}
        </>
      )}

      {isLoading(articles) && <Loader />}
    </ViewTemplate>
  );
};
