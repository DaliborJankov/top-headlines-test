import { useEffect, useState } from "react";

import { Language } from "../../environment";
import { LoadableModel, failed, loaded, loading } from "../common/model";
import { TopHeadlinesArticle, TopHeadlinesQueries, getTopHeadlinesApi } from "../top-headlines";

function useHeadlinesMaker({ language, category, query }: TopHeadlinesQueries) {
  const [articlesPerCategory, setArticlesPerCategory] = useState<
    LoadableModel<readonly TopHeadlinesArticle[]>
  >(loading([]));

  useEffect(() => {
    const articles$ = getTopHeadlinesApi(language, category, query).subscribe(
      value => setArticlesPerCategory(loaded(value)),
      error => setArticlesPerCategory(failed(error))
    );

    return () => {
      articles$.unsubscribe();
    };
  }, [language, category, query]);

  return articlesPerCategory;
}

export function useHeadlinesPerQuery(language: Language, query: string) {
  return useHeadlinesMaker({ language, query });
}
