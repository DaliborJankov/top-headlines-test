import React from "react";
import { useHistory } from "react-router-dom";

import { useDeepTranslation } from "../../../utils/helper";

import "./GoBack.scss";

export const GoBack = () => {
  const { t } = useDeepTranslation("GoBack");
  const history = useHistory();

  return (
    <div className="GoBack">
      <button onClick={() => history.goBack()} className="GoBack__button">
        <span className="GoBack__icon" />
        {t("back_to_list")}
      </button>
    </div>
  );
};
