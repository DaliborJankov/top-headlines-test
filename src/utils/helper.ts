import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

import { API_KEY, Language, ROOT_URL, allowedLanguages } from "../environment";

export const MAKE_URL = (urlPartial: string) => `${ROOT_URL}${urlPartial}${API_KEY}`;

export function useDeepTranslation(rootKey?: string) {
  const { t, ...restFromI18n } = useTranslation();

  const myT: TFunction = (...params: Parameters<TFunction>) => {
    const [firstParam, ...rest] = params;
    return t(rootKey ? `${rootKey}.${firstParam}` : firstParam, ...rest);
  };

  return {
    t: myT,
    ...restFromI18n,
  };
}

export const isAllowedLanguage = (language: string): language is Language => {
  return allowedLanguages.some(el => el === language);
};
