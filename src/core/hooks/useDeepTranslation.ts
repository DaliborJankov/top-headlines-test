import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

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
