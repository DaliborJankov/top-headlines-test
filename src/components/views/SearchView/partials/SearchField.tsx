import React from "react";

import { useDeepTranslation } from "../../../../core/hooks/useDeepTranslation";

import "./SearchField.scss";

interface SearchFieldProps {
  handleChange: (e: string) => void;
}

export const SearchField: React.FC<SearchFieldProps> = ({ handleChange }) => {
  const { t } = useDeepTranslation("SearchView");

  return (
    <div className="SearchField">
      <input
        onChange={e => handleChange(e.target.value)}
        type="text"
        className="SearchField__input"
        placeholder={t("search_term")}
      />
    </div>
  );
};
