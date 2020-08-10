import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import { LoadableModel } from "./common/model";
import * as topHeadlinesArticles from "./top-headlines";

export interface AppState {
  topHeadlinesArticles: LoadableModel<
    readonly topHeadlinesArticles.TopHeadlinesArticle[]
  >;
}

const createRootReducer = () => {
  const combinedReducers = combineReducers({
    topHeadlinesArticles: topHeadlinesArticles.topHeadlinesReducer,
  });

  return combinedReducers;
};

const createRootEpic = () => {
  const combinedEpics = combineEpics(topHeadlinesArticles.epics);

  return combinedEpics;
};

const makeStore = () => {
  const rootReducer = createRootReducer();
  const rootEpic = createRootEpic();
  const epicMiddleware = createEpicMiddleware();
  const reduxLogger = createLogger();

  const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware, reduxLogger)
  );

  epicMiddleware.run(rootEpic);

  return store;
};

export const store = makeStore();
