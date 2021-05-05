import { useEffect, useRef, useState } from "react";
import { Subject, of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";

import { LoadableModel, defaultModel, failed, loaded, loading } from "../common/model";
import { TopHeadlinesArticle, TopHeadlinesQueries, getTopHeadlinesApi } from "../top-headlines";

export function useHeadlines() {
  const [articles, setArticles] = useState<LoadableModel<readonly TopHeadlinesArticle[]>>(
    defaultModel([])
  );
  const articlesSubject$ = useRef(new Subject<TopHeadlinesQueries>());

  useEffect(() => {
    const subscription = articlesSubject$.current
      .pipe(
        tap(() => setArticles(loading([]))),
        switchMap(({ language, category, query }) =>
          getTopHeadlinesApi(language, category, query).pipe(
            map(loaded),
            catchError(err => of(failed(err)))
          )
        )
      )
      .subscribe(setArticles);

    return () => subscription.unsubscribe();
  }, []);

  return [articles, articlesSubject$] as const;
}
