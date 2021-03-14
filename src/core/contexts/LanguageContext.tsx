import React, { useMemo, useState } from "react";

import { Language } from "../../environment";
import { createSafeContext } from "../../utils/helper";
import { defaultLanguage } from "../i18next";

interface LanguagesContext {
  currentLanguage: Language;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<Language>>;
}

const LanguagesContext = createSafeContext<LanguagesContext>();

export const useLanguagesContext = LanguagesContext.hook;

export const LanguagesContextProvider: React.FC = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);

  const value = useMemo(() => ({ currentLanguage, setCurrentLanguage }), [currentLanguage]);

  return <LanguagesContext.Provider value={value}>{children}</LanguagesContext.Provider>;
};
