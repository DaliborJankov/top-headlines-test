import React, { useContext } from "react";

import { SingleNewsContext } from "../../../core/contexts/SingleNewsContext";
import { useDeepTranslation } from "../../../utils/helper";
import { GoBack } from "../../common/GoBack";
import { ViewTemplate } from "../../common/ViewTemplate";

import "./SingleNewsView.scss";

export const SingleNewsView = () => {
  /**
   * Ideally, I would pass here unique ID via router params, get that ID via routers useParams() hook.
   * With that ID, I would call API to retrieve for that specific news (example: /v2/top-headlines/${ID})
   * Unfortunately, current API doesn't supports this, so if the user refreshes the page or shares news link to someone,
   * the news data is lost
   *
   * I could potentialy use news title,ulrToImage or content (what suites best in the situation) as router param/query,
   * where I would have to find the wanted news in news list, but relying on this could be error prone,
   * since there could be multiple news with same title
   */
  const { currentNews } = useContext(SingleNewsContext);
  const { t } = useDeepTranslation("SingleNewsView");

  return (
    <ViewTemplate title={currentNews?.title ? currentNews.title : t("no-news-title")}>
      {currentNews && (
        <>
          <figure className="SingleNewsView__figure">
            <img
              className="SingleNewsView__image"
              src={currentNews.urlToImage}
              alt={currentNews.title}
            />
          </figure>
          <p className="SingleNewsView__content">{currentNews.content}</p>
        </>
      )}

      <GoBack />
    </ViewTemplate>
  );
};
