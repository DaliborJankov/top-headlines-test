import classNames from "classnames";
import i18next from "i18next";
import React, { useCallback, useContext } from "react";
import { useLocation } from "react-router-dom";

import { LanguagesContext } from "../../../../core/contexts/LanguageContext";
import { Language, allowedLanguages } from "../../../../environment";

import "./Languages.scss";

export const Languages = () => {
  const { currentLanguage, setCurrentLanguage } = useContext(LanguagesContext);
  const location = useLocation();
  const isLangButtonDisabled =
    location.pathname.startsWith("/news/") || location.pathname.startsWith("/category/news");

  const setLanguage = useCallback(
    (language: Language) => {
      if (language === currentLanguage) {
        return;
      }
      i18next.changeLanguage(language);
      document.documentElement.lang = language;
      setCurrentLanguage(language);
    },
    [currentLanguage, setCurrentLanguage]
  );

  return (
    <div className="Languages">
      <ul className="Languages__list">
        {allowedLanguages.map((language, index) => {
          return (
            <li key={index} className="Languages__item">
              <button
                disabled={isLangButtonDisabled}
                onClick={() => setLanguage(language)}
                className={classNames(
                  "Languages__button",
                  language === currentLanguage && "Languages__button--active"
                )}
              >
                {language}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
