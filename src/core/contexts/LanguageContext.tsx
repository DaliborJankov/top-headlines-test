import React, { createContext, useState } from "react";

import { Language } from "../../environment";
import { defaultLanguage } from "../i18next";

interface LanguagesInitalContext {
  currentLanguage: Language;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<Language>>;
}

const languagesInitialContext: LanguagesInitalContext = {
  currentLanguage: defaultLanguage,
  setCurrentLanguage: (): void => {},
};

export const LanguagesContext = createContext<LanguagesInitalContext>(
  languagesInitialContext
);

export const LanguagesContextProvider: React.FC = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    defaultLanguage
  );

  return (
    <LanguagesContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
      {children}
    </LanguagesContext.Provider>
  );
};
