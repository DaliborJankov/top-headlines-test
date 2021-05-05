import { createContext, useContext } from "react";

import { API_KEY, Language, ROOT_URL, allowedLanguages } from "../environment";

export const MAKE_URL = (urlPartial: string) => `${ROOT_URL}${urlPartial}${API_KEY}`;

export const isAllowedLanguage = (language: string): language is Language => {
  return allowedLanguages.some(el => el === language);
};

export function createSafeContext<T>(defaultValue?: T) {
  const context = createContext<T | undefined>(defaultValue);

  const useSafeContext = () => {
    const value = useContext(context);
    if (!value) {
      throw new Error("useContext must be inside a Provider with a value");
    }

    return value;
  };

  return {
    hook: useSafeContext,
    Provider: context.Provider,
  } as const;
}
