import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { useLanguagesContext } from "../core/contexts/LanguageContext";
import { SingleNewsContextProvider } from "../core/contexts/SingleNewsContext";
import { getTopHeadlines } from "../core/top-headlines";
import { routes } from "../router";
import { AppHeader } from "./common/AppHeader";

const App = () => {
  const dispatch = useDispatch();
  const { currentLanguage } = useLanguagesContext();

  useEffect(() => {
    dispatch(getTopHeadlines({ language: currentLanguage }));
  }, [currentLanguage, dispatch]);

  return (
    <>
      <AppHeader />
      <main className="AppMain">
        <SingleNewsContextProvider>
          <Switch>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} component={route.component} exact />
            ))}
          </Switch>
        </SingleNewsContextProvider>
      </main>
    </>
  );
};

export default App;
