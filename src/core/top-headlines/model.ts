import { Language } from "../../environment";
import { MAKE_URL } from "../../utils/helper";
import { Category } from "../common";
import { LoadableModel } from "../common/model";

export interface TopHeadlinesQueries {
  language: Language;
  category?: Category;
  query?: string;
}

const urlPartial = (language: Language, category?: Category, query?: string) =>
  `/v2/top-headlines?country=${language}${category ? `&category=${category}` : ""}${
    query ? `&q=${query}` : ""
  }`;

export const GET_TOP_HEADLINES_URL = (language: Language, category?: Category, query?: string) =>
  MAKE_URL(urlPartial(language, category, query));

export interface TopHeadlinesArticle {
  source: {
    id: number | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface TopHeadlinesState {
  readonly topHeadlinesArticles: LoadableModel<TopHeadlinesArticle[]>;
}
