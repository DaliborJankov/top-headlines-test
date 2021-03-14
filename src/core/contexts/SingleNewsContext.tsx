import React, { useMemo, useState } from "react";

import { createSafeContext } from "../../utils/helper";
import { TopHeadlinesArticle } from "../top-headlines";

interface SingleNewsContext {
  currentNews: TopHeadlinesArticle | null;
  setCurrentNews: React.Dispatch<React.SetStateAction<TopHeadlinesArticle | null>>;
}

const SingleNewsContext = createSafeContext<SingleNewsContext>();

export const useSingleNewsContext = SingleNewsContext.hook;

export const SingleNewsContextProvider: React.FC = ({ children }) => {
  const [currentNews, setCurrentNews] = useState<TopHeadlinesArticle | null>(null);

  const value = useMemo(() => ({ currentNews, setCurrentNews }), [currentNews]);

  return <SingleNewsContext.Provider value={value}>{children}</SingleNewsContext.Provider>;
};
