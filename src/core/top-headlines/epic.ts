import { Action } from "redux";
import { ActionsObservable, combineEpics, ofType } from "redux-observable";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import {
  ActionTypes,
  GetTopHeadlines,
  TopHeadlinesArticle,
  getTopHeadlinesApi,
  setTopHeadlines
} from "./";

const getTopHeadlinesEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType<Action, GetTopHeadlines>(ActionTypes.GetTopHeadlines),
    switchMap(({ payload }) =>
      getTopHeadlinesApi(
        payload.language,
        payload.category,
        payload.query
      ).pipe(
        map((articles: readonly TopHeadlinesArticle[]) =>
          setTopHeadlines(articles)
        ),
        catchError((error) => of(setTopHeadlines(error)))
      )
    )
  );

export const epics = combineEpics(getTopHeadlinesEpic);
