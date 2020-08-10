import React, { createContext, useState } from "react";

import { TopHeadlinesArticle } from "../top-headlines";

interface SingleNewsInitalContext {
  currentNews: TopHeadlinesArticle | null;
  setCurrentNews: React.Dispatch<
    React.SetStateAction<TopHeadlinesArticle | null>
  >;
}

const singleNewsInitialContext: SingleNewsInitalContext = {
  currentNews: null,
  setCurrentNews: (): void => {},
};

export const SingleNewsContext = createContext<SingleNewsInitalContext>(
  singleNewsInitialContext
);

export const SingleNewsContextProvider: React.FC = ({ children }) => {
  const [currentNews, setCurrentNews] = useState<TopHeadlinesArticle | null>(
    null
  );

  return (
    <SingleNewsContext.Provider value={{ currentNews, setCurrentNews }}>
      {children}
    </SingleNewsContext.Provider>
  );
};
