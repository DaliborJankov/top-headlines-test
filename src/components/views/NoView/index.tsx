import React from "react";

import { useDeepTranslation } from "../../../utils/helper";
import { GoBack } from "../../common/GoBack";
import { ViewTemplate } from "../../common/ViewTemplate";

export const NoView = () => {
  const { t } = useDeepTranslation("NoView");

  return (
    <ViewTemplate title={t("title")}>
      <GoBack />
    </ViewTemplate>
  );
};
