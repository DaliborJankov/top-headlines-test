import { Action } from "redux";
import { AjaxError } from "rxjs/ajax";

import { Language } from "../../environment";
import { Category } from "../common";
import { TopHeadlinesArticle } from "./";

export enum ActionTypes {
  GetTopHeadlines = "topHeadlines/get",
  SetTopHeadlines = "topHeadlines/set",
}

export interface GetTopHeadlines extends Action {
  type: ActionTypes.GetTopHeadlines;
  payload: {
    language: Language;
    category?: Category;
    query?: string;
  };
}

export const getTopHeadlines = (
  payload: GetTopHeadlines["payload"]
): GetTopHeadlines => {
  return {
    type: ActionTypes.GetTopHeadlines,
    payload: payload,
  };
};

export interface SetTopHeadlines extends Action {
  type: ActionTypes.SetTopHeadlines;
  payload: readonly TopHeadlinesArticle[] | AjaxError;
}

export const setTopHeadlines = (
  articles: SetTopHeadlines["payload"]
): SetTopHeadlines => {
  return {
    type: ActionTypes.SetTopHeadlines,
    payload: articles,
  };
};

export type Actions = GetTopHeadlines | SetTopHeadlines;
