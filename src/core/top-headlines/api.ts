import { AjaxResponse, ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";

import { Language } from "../../environment";
import { Category } from "../common";
import { GET_TOP_HEADLINES_URL } from "./";
import { TopHeadlinesArticle } from "./model";

export const getTopHeadlinesApi = (
  language: Language,
  category?: Category,
  query?: string
) => {
  return ajax({
    method: "GET",
    url: GET_TOP_HEADLINES_URL(language, category, query),
  }).pipe(
    map<AjaxResponse, readonly TopHeadlinesArticle[]>(
      (serverResult) => serverResult.response.articles
    )
  );
};
