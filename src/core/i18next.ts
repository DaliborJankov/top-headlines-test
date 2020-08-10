import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { Language } from "../environment";
import translationGb from "../translations/gb.json";
import translationUs from "../translations/us.json";
import { isAllowedLanguage } from "../utils/helper";

export const defaultLanguage: Language = isAllowedLanguage(
  document.documentElement.lang
)
  ? document.documentElement.lang
  : "gb";

i18n.use(initReactI18next).init({
  lng: defaultLanguage,
  fallbackLng: "gb",
  defaultNS: "translations",
  debug: true,
  ns: ["translations"],
  resources: {
    gb: {
      translations: translationGb,
    },
    us: {
      translations: translationUs,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
